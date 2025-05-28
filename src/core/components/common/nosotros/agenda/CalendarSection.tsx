import { useEffect, useState } from 'react';
import CalendarioGrid from './CalendarioGrid';
import CalendarioHeader from './CalendarioHeader';
import { EVENTOS_INICIALES, MESES } from './constants';
import PanelEventos from './PanelEventos';
import type { DiaCalendario, Evento } from './types';

const CalendarSection = () => {
	// Estados principales
	const [mesActual, setMesActual] = useState<number>(new Date().getMonth()); // 0..11
	const [anioActual, setAnioActual] = useState<number>(new Date().getFullYear());
	const [busqueda, setBusqueda] = useState<string>('');
	const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null);
	const [eventosFiltrados, setEventosFiltrados] = useState<Evento[]>([]);
	const [rangoAnios, setRangoAnios] = useState<number[]>([]);

	useEffect(() => {
		const anioBase = new Date().getFullYear();
		const arr: number[] = [];
		for (let i = anioBase - 5; i <= anioBase + 5; i++) {
			arr.push(i);
		}
		setRangoAnios(arr);
	}, []);

	useEffect(() => {
		if (busqueda.trim() === '') {
			const filtrados = EVENTOS_INICIALES.filter((evento) => {
				const fechaEvento = new Date(evento.fecha);
				return fechaEvento.getMonth() === mesActual && fechaEvento.getFullYear() === anioActual;
			});
			setEventosFiltrados(filtrados);
		} else {
			const filtrados = EVENTOS_INICIALES.filter((evento) => {
				const texto = (evento.titulo + evento.descripcion).toLowerCase();
				return texto.includes(busqueda.toLowerCase());
			});
			setEventosFiltrados(filtrados);
		}
		setEventoSeleccionado(null);
	}, [mesActual, anioActual, busqueda]);

	const cambiarMes = (delta: number): void => {
		let nuevoMes = mesActual + delta;
		let nuevoAnio = anioActual;
		if (nuevoMes < 0) {
			nuevoMes = 11;
			nuevoAnio--;
		} else if (nuevoMes > 11) {
			nuevoMes = 0;
			nuevoAnio++;
		}
		setMesActual(nuevoMes);
		setAnioActual(nuevoAnio);
	};

	const obtenerDiasDelCalendario = (): DiaCalendario[] => {
		const dias: DiaCalendario[] = [];
		const primerDiaMes = new Date(anioActual, mesActual, 1);
		const ultimoDiaMes = new Date(anioActual, mesActual + 1, 0);
		let inicioDia = primerDiaMes.getDay() - 1;
		if (inicioDia === -1) inicioDia = 6;
		const totalDiasMes = ultimoDiaMes.getDate();

		// Días del mes anterior
		for (let i = 0; i < inicioDia; i++) {
			const fecha = new Date(anioActual, mesActual, -inicioDia + i + 1);
			dias.push({
				fecha,
				esMesActual: false,
				eventos: obtenerEventosPorFecha(fecha),
			});
		}
		// Días del mes actual
		for (let dia = 1; dia <= totalDiasMes; dia++) {
			const fecha = new Date(anioActual, mesActual, dia);
			dias.push({
				fecha,
				esMesActual: true,
				eventos: obtenerEventosPorFecha(fecha),
			});
		}
		// Rellenar los días restantes del mes siguiente hasta completar 42 celdas
		const diasRestantes = 42 - dias.length;
		for (let i = 1; i <= diasRestantes; i++) {
			const fecha = new Date(anioActual, mesActual + 1, i);
			dias.push({
				fecha,
				esMesActual: false,
				eventos: obtenerEventosPorFecha(fecha),
			});
		}
		return dias;
	};

	const obtenerEventosPorFecha = (fecha: Date): Evento[] => {
		return EVENTOS_INICIALES.filter((evento) => {
			const f = new Date(evento.fecha);
			return (
				f.getDate() === fecha.getDate() &&
				f.getMonth() === fecha.getMonth() &&
				f.getFullYear() === fecha.getFullYear()
			);
		});
	};

	const esFechaHoy = (fecha: Date): boolean => {
		const hoy = new Date();
		return (
			fecha.getDate() === hoy.getDate() &&
			fecha.getMonth() === hoy.getMonth() &&
			fecha.getFullYear() === hoy.getFullYear()
		);
	};

	const seleccionarEvento = (idEvento: string): void => {
		const evento = EVENTOS_INICIALES.find((e) => e.id === idEvento);
		if (evento) {
			setEventoSeleccionado(evento);
		}
	};

	const diasCalendario = obtenerDiasDelCalendario();

	return (
		<div className='max-w-[1200px] mx-auto '>
			<div className='bg-gradient-to-br from-white to-blue-50 rounded-lg shadow border border-blue-100 overflow-hidden'>
				{/* Cabecera */}
				<CalendarioHeader
					mesActual={mesActual}
					anioActual={anioActual}
					rangoAnios={rangoAnios}
					onChangeMes={setMesActual}
					onChangeAnio={setAnioActual}
					busqueda={busqueda}
					onChangeBusqueda={setBusqueda}
				/>

				{/* Grid principal: calendario y panel de eventos */}
				<div className='grid grid-cols-1 md:grid-cols-[1fr_450px]'>
					<CalendarioGrid
						mesActual={mesActual}
						anioActual={anioActual}
						diasCalendario={diasCalendario}
						cambiarMes={cambiarMes}
						seleccionarEvento={seleccionarEvento}
						esFechaHoy={esFechaHoy}
					/>

					{/* Panel de eventos */}
					<div className='border-l border-blue-100 p-4 bg-white max-h-[720px] overflow-y-auto'>
						<div className='flex items-center gap-2 mb-4'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='20'
								height='20'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='text-blue-500'
								viewBox='0 0 24 24'>
								<path d='M2 12V2h10v10H2z'></path>
								<path d='M12 22V12h10v10H12z'></path>
								<path d='M2 22V12h10v10H2z'></path>
								<path d='M12 2h4v4'></path>
								<path d='M22 12V2H12'></path>
							</svg>
							<h3 className='text-lg font-bold uppercase bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
								Eventos para {MESES[mesActual]}
							</h3>
						</div>
						<PanelEventos
							eventoSeleccionado={eventoSeleccionado}
							eventosFiltrados={eventosFiltrados}
							seleccionarEvento={seleccionarEvento}
							mesActual={mesActual}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CalendarSection;

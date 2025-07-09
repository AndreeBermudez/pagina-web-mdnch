import { useEffect, useState } from 'react';
import { HiViewGrid } from 'react-icons/hi';
import CalendarioGrid from './CalendarioGrid';
import CalendarioHeader from './CalendarioHeader';
import PanelEventos from './PanelEventos';
import type { Evento } from './types';
import type { DiaCalendario } from './types';

const CalendarSection = () => {
	const [mesActual, setMesActual] = useState(new Date().getMonth());
	const [anioActual, setAnioActual] = useState(new Date().getFullYear());
	const [busqueda, setBusqueda] = useState('');
	const [rangoAnios, setRangoAnios] = useState<number[]>([]);
	const [diaSeleccionado, setDiaSeleccionado] = useState<Date | null>(null);
	const [eventos, setEventos] = useState<Evento[]>([]);
	const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null);

	useEffect(() => {
		const cargarEventos = async () => {
			try {
				const res = await fetch('http://localhost:8080/api/authentication/agenda');
				const result = await res.json();
				setEventos(result.data); 

			} catch (err) {
				console.error('Error al cargar eventos:', err);
			}
		};
		cargarEventos();
	}, []);

	useEffect(() => {
		const anioBase = new Date().getFullYear();
		setRangoAnios(Array.from({ length: 11 }, (_, i) => anioBase - 5 + i));
	}, []);

	const cambiarMes = (delta: number) => {
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


	const obtenerDiasDelCalendario = (): { fecha: Date; esMesActual: boolean }[] => {
		const dias: DiaCalendario[] = [];
		const primerDiaMes = new Date(anioActual, mesActual, 1);
		const ultimoDiaMes = new Date(anioActual, mesActual + 1, 0);
		let inicioDia = primerDiaMes.getDay() - 1;
		if (inicioDia === -1) inicioDia = 6;

		for (let i = 0; i < inicioDia; i++) {
			dias.push({ fecha: new Date(anioActual, mesActual, -inicioDia + i + 1), esMesActual: false });
		}
		for (let dia = 1; dia <= ultimoDiaMes.getDate(); dia++) {
			dias.push({ fecha: new Date(anioActual, mesActual, dia), esMesActual: true });
		}
		const diasRestantes = 42 - dias.length;
		for (let i = 1; i <= diasRestantes; i++) {
			dias.push({ fecha: new Date(anioActual, mesActual + 1, i), esMesActual: false });
		}
		return dias;
	};

	const esFechaHoy = (fecha: Date): boolean => {
		const hoy = new Date();
		return (
			fecha.getDate() === hoy.getDate() &&
			fecha.getMonth() === hoy.getMonth() &&
			fecha.getFullYear() === hoy.getFullYear()
		);
	};

	const filtrarEventosPorFecha = (fecha: Date) => {
		const fechaStr = fecha.toISOString().split('T')[0];
		return eventos.filter((ev) => ev.fecha === fechaStr && ev.titulo.toLowerCase().includes(busqueda.toLowerCase()));
	};

	const diasCalendario = obtenerDiasDelCalendario();
	const eventosDelDia = diaSeleccionado ? filtrarEventosPorFecha(diaSeleccionado) : [];

	return (
		<div className='max-w-[1200px] mx-auto'>
			<div className='bg-gradient-to-br from-white to-blue-50 rounded-lg shadow border border-blue-100 overflow-hidden'>
				<CalendarioHeader
					mesActual={mesActual}
					anioActual={anioActual}
					rangoAnios={rangoAnios}
					onChangeMes={setMesActual}
					onChangeAnio={setAnioActual}
					busqueda={busqueda}
					onChangeBusqueda={setBusqueda}
				/>

				<div className='grid grid-cols-1 md:grid-cols-[1fr_450px]'>
					<CalendarioGrid
						mesActual={mesActual}
						anioActual={anioActual}
						diasCalendario={diasCalendario}
						cambiarMes={cambiarMes}
						esFechaHoy={esFechaHoy}
						diaSeleccionado={diaSeleccionado}
						onDiaClick={setDiaSeleccionado}
						eventos={eventos}
					/>

					<div className='border-l border-blue-100 p-4 bg-white max-h-[720px] overflow-y-auto'>
						<div className='flex items-center gap-2 mb-4'>
							<HiViewGrid className='w-5 h-5 text-blue-500' />
							<h3 className='text-lg font-bold uppercase bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>
								Agenda para el {diaSeleccionado?.toLocaleDateString('es-PE') ?? 'día'}
							</h3>
						</div>
						<PanelEventos
							eventoSeleccionado={eventoSeleccionado}
							eventosFiltrados={eventosDelDia}
							seleccionarEvento={(id) => setEventoSeleccionado(eventos.find(e => e.id === id) || null)}
							mesActual={mesActual}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CalendarSection;

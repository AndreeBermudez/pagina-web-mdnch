import { useEffect, useState } from 'react';
import { HiViewGrid } from 'react-icons/hi';
import { useAgendaList } from '../../../../../../features/administrador/agenda-admin/hooks/useAgendaQuery';
import type { AgendaResponse } from '../../../../../../features/administrador/agenda-admin/schemas/agenda.schema';
import CalendarioGrid from './CalendarioGrid';
import CalendarioHeader from './CalendarioHeader';
import PanelEventos from './PanelEventos';
import type { DiaCalendario } from './types';

const CalendarSection = () => {
	const [mesActual, setMesActual] = useState(new Date().getMonth());
	const [anioActual, setAnioActual] = useState(new Date().getFullYear());
	const [busqueda, setBusqueda] = useState('');
	const [rangoAnios, setRangoAnios] = useState<number[]>([]);
	const [diaSeleccionado, setDiaSeleccionado] = useState<Date | null>(null);
	const [eventoSeleccionado, setEventoSeleccionado] = useState<AgendaResponse | null>(null);
	const { data: eventos = [] } = useAgendaList();

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

	// Función para obtener eventos próximos (desde hoy en adelante)
	const obtenerEventosProximos = () => {
		const hoy = new Date();
		hoy.setHours(0, 0, 0, 0);
		
		return eventos
			.filter((evento) => {
				const fechaEvento = new Date(evento.fecha);
				return fechaEvento >= hoy && evento.titulo.toLowerCase().includes(busqueda.toLowerCase());
			})
			.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
			.slice(0, 10); // Mostrar máximo 10 eventos próximos
	};

	const diasCalendario = obtenerDiasDelCalendario();
	const eventosDelDia = diaSeleccionado ? filtrarEventosPorFecha(diaSeleccionado) : [];
	const eventosProximos = obtenerEventosProximos();

	return (
		<div className='max-w-[1200px] mx-auto'>
			<div className='overflow-hidden border border-blue-100 rounded-lg shadow bg-gradient-to-br from-white to-blue-50'>
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
							<h3 className='text-lg font-bold text-transparent uppercase bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text'>
								{diaSeleccionado 
									? `Agenda para el ${diaSeleccionado.toLocaleDateString('es-PE')}`
									: 'Próximos Eventos'
								}
							</h3>
						</div>
						<PanelEventos
							eventoSeleccionado={eventoSeleccionado}
							eventosFiltrados={eventosDelDia}
							eventosProximos={eventosProximos}
							diaSeleccionado={diaSeleccionado}
							seleccionarEvento={(id) => setEventoSeleccionado(eventos.find(e => e.agendaId === id) || null)}
							mesActual={mesActual}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CalendarSection;

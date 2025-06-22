import { HiViewGrid } from 'react-icons/hi';
import EventoCard from './EventoCard';
import EventoDetalle from './EventoDetalle';
import { type Evento } from './types';

interface PanelEventosProps {
	eventoSeleccionado: Evento | null;
	eventosFiltrados: Evento[];
	seleccionarEvento: (id: string) => void;
	mesActual: number;
}

const PanelEventos = ({ eventoSeleccionado, eventosFiltrados, seleccionarEvento }: PanelEventosProps) => {
	if (eventoSeleccionado) {
		return <EventoDetalle evento={eventoSeleccionado} />;
	}
  // Si eventos filtrados está vacío muestra este mensaje
	if (eventosFiltrados.length === 0) {
		return (
			<div className='text-center text-gray-500 p-8 bg-blue-50 rounded'>
				<HiViewGrid className='mx-auto mb-2 w-10 h-10 text-blue-300' />
				<p>No hay eventos para mostrar</p>
				<p className='text-sm'>¡Añade nuevos eventos para verlos aquí!</p>
			</div>
		);
	}
  // Si hay eventos filtrados, los muestra en tarjetas
	return (
		<div className='space-y-4'>
			{eventosFiltrados.map((evento, index) => (
				<EventoCard key={evento.id} evento={evento} index={index} onSelect={seleccionarEvento} />
			))}
		</div>
	);
};

export default PanelEventos;

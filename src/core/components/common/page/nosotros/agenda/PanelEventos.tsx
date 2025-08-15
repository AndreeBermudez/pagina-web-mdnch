import { HiViewGrid } from 'react-icons/hi';

import type { AgendaResponse } from '../../../../../../features/administrador/agenda-admin/schemas/agenda.schema';
import AgendaCard from './AgendaCard';

interface PanelEventosProps {
	eventoSeleccionado: AgendaResponse | null;
	eventosFiltrados: AgendaResponse[];
	seleccionarEvento: (id: number) => void;
	mesActual: number;
}

const PanelEventos = ({ eventosFiltrados, seleccionarEvento }: PanelEventosProps) => {

  // Si eventos filtrados está vacío muestra este mensaje
	if (eventosFiltrados.length === 0) {
		return (
			<div className='p-8 text-center text-gray-500 rounded bg-blue-50'>
				<HiViewGrid className='w-10 h-10 mx-auto mb-2 text-blue-300' />
				<p>No hay eventos para mostrar</p>
				<p className='text-sm'>¡Añade nuevos eventos para verlos aquí!</p>
			</div>
		);
	}
  // Si hay eventos filtrados, los muestra en tarjetas
	return (
		<div className='space-y-4'>
			{eventosFiltrados.map((evento, index) => (
				<AgendaCard key={evento.agendaId} evento={evento} index={index} onSelect={seleccionarEvento} />
			))}
		</div>
	);
};

export default PanelEventos;

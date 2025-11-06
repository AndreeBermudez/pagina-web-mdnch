import { HiViewGrid } from 'react-icons/hi';

import type { AgendaResponse } from '../../../../../../features/administrador/agenda-admin/schemas/agenda.schema';
import AgendaCard from './AgendaCard';

interface PanelEventosProps {
	eventoSeleccionado: AgendaResponse | null;
	eventosFiltrados: AgendaResponse[];
	eventosProximos: AgendaResponse[];
	diaSeleccionado: Date | null;
	seleccionarEvento: (id: number) => void;
	mesActual: number;
}

const PanelEventos = ({ eventosFiltrados, eventosProximos, diaSeleccionado, seleccionarEvento }: PanelEventosProps) => {

	// Si NO hay día seleccionado, mostrar eventos próximos
	if (!diaSeleccionado) {
		if (eventosProximos.length === 0) {
			return (
				<div className='p-8 text-center text-gray-500 rounded bg-blue-50'>
					<HiViewGrid className='w-10 h-10 mx-auto mb-2 text-blue-300' />
					<p className='font-semibold'>No hay eventos próximos programados</p>
					<p className='text-sm'>¡Los eventos futuros aparecerán aquí!</p>
				</div>
			);
		}
		return (
			<div className='space-y-4'>
				<div className='mb-3 text-sm text-gray-600'>
					Mostrando {eventosProximos.length} evento{eventosProximos.length !== 1 ? 's' : ''} próximo{eventosProximos.length !== 1 ? 's' : ''}
				</div>
				{eventosProximos.map((evento, index) => (
					<AgendaCard key={evento.agendaId} evento={evento} index={index} onSelect={seleccionarEvento} />
				))}
			</div>
		);
	}

	// Si HAY día seleccionado, mostrar eventos de ese día
	if (eventosFiltrados.length === 0) {
		return (
			<div className='p-8 text-center text-gray-500 rounded bg-blue-50'>
				<HiViewGrid className='w-10 h-10 mx-auto mb-2 text-blue-300' />
				<p>No hay eventos para este día</p>
				<p className='text-sm'>Selecciona otro día en el calendario</p>
			</div>
		);
	}

	return (
		<div className='space-y-4'>
			{eventosFiltrados.map((evento, index) => (
				<AgendaCard key={evento.agendaId} evento={evento} index={index} onSelect={seleccionarEvento} />
			))}
		</div>
	);
};

export default PanelEventos;

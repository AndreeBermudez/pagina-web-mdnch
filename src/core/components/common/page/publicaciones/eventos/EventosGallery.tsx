import { useState } from 'react';
import { useEventosQuery } from '../../../../../../features/administrador/eventos-admin/hooks/useEventosQuery';
import type { EventoResponse } from '../../../../../../features/administrador/eventos-admin/schemas/evento.schema';
import { useModal } from '../../../../../hooks/useModal';
import { CalendarEvent } from '../../home/eventos/CalendarEvent';
import EventoModal from './EventoModal';

const EventosGallery = () => {
	const [selectedEvento, setSelectedEvento] = useState<EventoResponse | null>(null);
	const { isModalOpen, handleModal } = useModal();
	const { eventos  } = useEventosQuery();

	const handleEventoClick = (evento: EventoResponse) => {
		setSelectedEvento(evento);
		handleModal()
	};

	const handleCloseModal = () => {
		handleModal()
		setSelectedEvento(null);
	};

	return (
		<div>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{eventos?.map((evento, index) => (
					<CalendarEvent key={index} evento={evento} onClick={() => handleEventoClick(evento)} />
				))}
			</div>

			<EventoModal isOpen={isModalOpen} onClose={handleCloseModal} evento={selectedEvento} />
		</div>
	);
};

export default EventosGallery;

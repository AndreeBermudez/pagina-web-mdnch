import { useEffect, useState } from 'react';
import { CalendarEvent } from '../../home/eventos/CalendarEvent';
import EventoModal from './EventoModal';
import { initialEvento, type Evento } from '../../../../../services/eventos/evento.interface';
import { useEventos } from '../../../../../../features/administrador/eventos-admin/hooks/useEventos';

const EventosGallery = () => {
	const [selectedEvento, setSelectedEvento] = useState<Evento>(initialEvento);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { eventos, refreshEventos } = useEventos();

	useEffect(() => {
		refreshEventos();
	}, [refreshEventos]);

	const handleEventoClick = (evento: Evento) => {
		setSelectedEvento(evento);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedEvento(initialEvento);
	};

	return (
		<div>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{eventos.map((evento, index) => (
					<CalendarEvent key={index} evento={evento} onClick={() => handleEventoClick(evento)} />
				))}
			</div>

			<EventoModal isOpen={isModalOpen} onClose={handleCloseModal} evento={selectedEvento} />
		</div>
	);
};

export default EventosGallery;

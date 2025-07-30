import { CalendarEvent } from './CalendarEvent';
import { EventHeader } from './EventHeader';
import { useEffect } from 'react';
import { useEventosHome } from '../../../../../../features/administrador/eventos-admin/hooks/useEventosHome';

export const SectionEvent = () => {
	const { eventos, refreshEventos } = useEventosHome();

	useEffect(() => {
		refreshEventos();
	}, [refreshEventos]);

	return (
		<section className='bg-gradient-to-b from-[#3c6fe5] to-[#0a2158] py-16'>
			<div className='container-municipalidad'>
				<div className='w-full p-6 bg-gray-100 shadow-2xl rounded-2xl'>
					<EventHeader />
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{eventos && eventos.length > 0 ? (
							eventos.map((evento) => (
								<CalendarEvent
									key={evento.eventoId}
									evento={evento}
									onClick={() => console.log(`Evento: ${evento.titulo}`)}
								/>
							))
						) : (
							<div className='text-center text-gray-500 col-span-full'>No hay eventos disponibles.</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

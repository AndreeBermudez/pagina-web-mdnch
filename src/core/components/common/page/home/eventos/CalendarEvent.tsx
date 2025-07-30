import { Clock, MapPin } from 'lucide-react';
import { returnDay, returnMonth } from '../../../../../utils/formatDate';
import type { Evento } from '../../../../../services/eventos/evento.interface';

interface CalendarEventProps {
	evento: Evento
	onClick?: () => void;
}

export const CalendarEvent = ({
	evento,
	onClick,
}: CalendarEventProps) => {
	return (
		<div
			className='flex flex-col h-full overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg'
			onClick={onClick}>
			<div className='relative h-48 overflow-hidden group'>
				<img
					src={evento.direccionImagen}
					alt={evento.titulo}
					className='absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
					loading='lazy'
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.onerror = null;
						target.src = '/placeholder-image.jpg';
					}}
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
				<span className='absolute z-10 px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full top-4 left-4'>
					{evento.categoria}
				</span>
			</div>
			<div className='flex flex-col flex-grow p-6'>
				<div className='flex items-center gap-4 mb-4'>
					<div className='bg-blue-50 rounded-xl p-3 text-center min-w-[60px] shadow-sm'>
						<span className='block text-xl font-bold text-blue-700'>{returnDay(evento.fecha)}</span>
						<span className='text-sm text-blue-600'>{returnMonth(evento.fecha)}</span>
					</div>
					<div>
						<h3 className='text-lg font-semibold text-gray-900 transition-colors duration-300 hover:text-blue-600'>
							{evento.titulo}
						</h3>
						<div className='mt-1 text-sm text-gray-500'>
							<div className='flex items-center gap-1'>
								<Clock className='w-4 h-4' /> <span>{evento.hora}</span>
							</div>
							<div className='flex items-center gap-1 mt-1'>
								<MapPin className='w-4 h-4' /> <span>{evento.ubicacion}</span>
							</div>
						</div>
					</div>
				</div>
				<div className='pt-4 mt-auto'>
					<div className='block text-center py-2.5 text-white bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors font-medium'>
						Ver detalles
					</div>
				</div>
			</div>
		</div>
	);
};

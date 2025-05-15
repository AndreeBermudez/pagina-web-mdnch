import { Clock, MapPin } from 'lucide-react';

interface CalendarEventProps {
	date: string;
	month: string;
	title: string;
	time: string;
	location: string;
	category: string;
	image: string;
}

export const CalendarEvent = ({ date, month, title, time, location, category, image }: CalendarEventProps) => {
	return (
		<div className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full'>
			<div className='h-48 relative overflow-hidden group'>
				<img
					src={image}
					alt={title}
					className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
					loading='lazy'
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.onerror = null;
						target.src = '/placeholder-image.jpg';
					}}
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
				<span className='absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm z-10 font-medium'>
					{category}
				</span>
			</div>
			<div className='p-6 flex flex-col flex-grow'>
				<div className='flex items-center gap-4 mb-4'>
					<div className='bg-blue-50 rounded-xl p-3 text-center min-w-[60px] shadow-sm'>
						<span className='text-xl font-bold text-blue-700 block'>{date}</span>
						<span className='text-blue-600 text-sm'>{month}</span>
					</div>
					<div>
						<h3 className='font-semibold text-gray-900 text-lg transition-colors duration-300 hover:text-blue-600'>
							{title}
						</h3>
						<div className='text-gray-500 text-sm mt-1'>
							<div className='flex items-center gap-1'>
								<Clock className='w-4 h-4' /> <span>{time}</span>
							</div>
							<div className='flex items-center gap-1 mt-1'>
								<MapPin className='w-4 h-4' /> <span>{location}</span>
							</div>
						</div>
					</div>
				</div>
				<div className='mt-auto pt-4'>
					<a
						href='#'
						className='block text-center py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium'>
						Ver detalles
					</a>
				</div>
			</div>
		</div>
	);
};

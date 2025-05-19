import { CalendarClock } from 'lucide-react';

interface NewsCardProps {
	category: string;
	title: string;
	description: string;
	date: string;
	image: string;
}

export const NewsCard = ({ category, title, description, date, image }: NewsCardProps) => {
	return (
		<div className='bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg'>
			<div className='h-48 relative overflow-hidden'>
				<div className='absolute top-3 left-3 z-10'>
					<span className='bg-blue-600 text-white px-4 py-1 rounded-full text-xs'>{category}</span>
				</div>
				<img
					src={image}
					alt='Imagen de la noticia'
					className='h-full w-full object-cover transition-transform duration-500 hover:scale-110'
				/>
			</div>

			<div className='p-6'>
				<div className='flex gap-3 items-center text-gray-500 mb-2'>
					<CalendarClock size={16} />
					<span className='text-sm block'>{date}</span>
				</div>
				<h3 className='text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 hover:text-blue-600'>
					{title}
				</h3>
				<p className='text-gray-600 text-sm mb-3'>{description}</p>
			</div>
		</div>
	);
};

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
		<div className='overflow-hidden transition-all duration-300 bg-white shadow-sm rounded-xl hover:shadow-lg'>
			<div className='relative h-48 overflow-hidden'>
				<div className='absolute z-10 top-3 left-3'>
					<span className='px-4 py-1 text-xs text-white bg-blue-600 rounded-full'>{category}</span>
				</div>
				<img
					src={image}
					alt='Imagen de la noticia'
					className='object-cover w-full h-full transition-transform duration-500 hover:scale-110'
				/>
			</div>

			<div className='p-6'>
				<div className='flex items-center gap-3 mb-2 text-gray-500'>
					<CalendarClock size={16} />
					<span className='block text-sm'>{date}</span>
				</div>
				<h3 className='mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-600'>
					{title}
				</h3>
				<div className='mb-3 text-sm text-gray-600'>
					<div dangerouslySetInnerHTML={{ __html: description }} />
				</div>
			</div>
		</div>
	);
};

import { CalendarClock } from 'lucide-react';

interface MainNewsProps {
	category: string;
	title: string;
	description: string;
	date: string;
	image: string;
}

export const MainNews = ({ category, title, description, date, image }: MainNewsProps) => {
	return (
		<div className='relative text-white rounded-xl p-8 overflow-hidden transition-all duration-300 hover:shadow-xl group'>
			<div className='absolute inset-0'>
				<img
					src={image}
					alt='Noticia destacada'
					className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/80 to-black/40'></div>
			</div>
			<div className='relative z-10'>
				<span className='bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors'>
					{category}
				</span>
				<h2 className='text-3xl font-bold mt-4 mb-2 transition-colors group-hover:text-blue-200'>{title}</h2>
				<p className='text-gray-300 mb-4'>{description}</p>
				<div className='flex items-center text-gray-400 gap-1'>
					<CalendarClock size={16} /> {date}
				</div>
			</div>
		</div>
	);
};

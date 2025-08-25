import { ExternalLink, ImageOff, Pencil, X } from 'lucide-react';
import { formatDate } from '../../../../core/utils/formatDate';

interface CardPageProps {
	title: string;
	path: string;
	date: string;
	image?: string;
	menus?: string[];
	onEdit?: () => void;
	onDelete?: () => void;
}
export const CardPage = ({ title, path, date, image, menus, onEdit, onDelete }: CardPageProps) => {
	return (
		<div className='flex flex-col overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-lg'>
			<div className='relative flex items-center justify-center bg-gray-100 h-36 sm:h-40 md:h-44 group'>
				{image ? (
					<img
						src={image}
						alt={title}
						className='object-cover w-full h-full transition-transform duration-500 shadow-md group-hover:scale-105'
					/>
				) : (
					<span className='flex flex-col items-center text-gray-400'>
						<ImageOff className='w-10 h-10 mb-2' />
						<span className='text-xs'>Sin imagen</span>
					</span>
				)}
				{onDelete && (
					<button
						onClick={onDelete}
						className='absolute p-2 text-red-600 transition-colors rounded-full shadow top-2 left-2 bg-white/80 hover:bg-red-600 hover:text-white'
						title='Eliminar'>
						<X className='w-4 h-4' />
					</button>
				)
				}
				{onEdit && (
					<button
						onClick={onEdit}
						className='absolute p-2 text-blue-600 transition-colors rounded-full shadow top-2 right-2 bg-white/80 hover:bg-blue-600 hover:text-white'
						title='Editar'>
						<Pencil className='w-4 h-4' />
					</button>
				)}
			</div>
			<div className='flex flex-col gap-2 px-5 py-4'>
				<h3 className='text-lg font-bold text-gray-900'>{title}</h3>
				<span className='text-sm text-gray-500'>{path}</span>
				{menus && menus.length > 0 && (
					<div className='flex flex-wrap gap-2 mt-2'>
						{menus.map((menu, idx) => (
							<span
								key={idx}
								className='px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100 rounded-full bg-blue-50'>
								{menu}
							</span>
						))}
					</div>
				)}
				<div className='flex items-center justify-between mt-4'>
					<span className='text-xs text-gray-500'>{formatDate(date)}</span>
					<a
						href={path}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-1 font-semibold text-blue-600 transition-colors hover:text-blue-700'
						title='Ver página'>
						<ExternalLink className='w-5 h-5' />
						<span className='text-xs font-semibold'>Ver</span>
					</a>
				</div>
			</div>
		</div>
	);
};

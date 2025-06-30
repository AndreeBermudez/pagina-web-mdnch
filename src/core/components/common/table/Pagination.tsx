import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
	currentPage: number;
	totalItems: number;
	itemsPerPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const Pagination = ({
	currentPage,
	itemsPerPage,
	totalItems,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	return (
		<div className='px-6 py-4 border-t border-gray-200'>
			<div className='flex items-center justify-between'>
				<div className='text-sm text-gray-700'>
					Mostrando{' '}
					<span className='font-medium'>{Math.min(currentPage * itemsPerPage, totalItems)}</span>
					{' '}de{' '}
					<span className='font-medium'>{totalItems}</span>
					{' '}resultados
				</div>
				<div className='flex items-center space-x-2'>
					<button
						className='px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50'
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}>
						<ChevronLeft className='h-4 w-4' />
					</button>
					<button
						className='px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50'
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}>
						<ChevronRight className='h-4 w-4' />
					</button>
				</div>
			</div>
		</div>
	);
};

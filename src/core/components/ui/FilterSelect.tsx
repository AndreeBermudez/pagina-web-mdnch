// FilterSelect.tsx actualizado
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/cn';

interface FilterSelectProps {
	label?: string;
	value: string;
	options: string[];
	onChange: (value: string) => void;
	width?: string;
	placeholder?: string;
	className?: string;
}

const FilterSelect = ({
	label,
	value,
	options,
	onChange,
	width = 'w-64',
	placeholder = 'Seleccionar...',
	className = '',
}: FilterSelectProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={cn('relative', width)}>
			<div
				className={cn('flex items-center justify-between px-4 py-2 transition-colors border border-slate-300 rounded-lg cursor-pointer hover:border-slate-400 focus-within:border-blue-500', className)}
				onClick={() => setIsOpen(!isOpen)}>
				<span className='text-sm font-medium truncate text-slate-600'>
					{label}: <span className='text-slate-900'>{value || placeholder}</span>
				</span>
				<ChevronDown
					className={`ml-2 w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</div>

			{isOpen && (
				<div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg border-slate-200'>
					{options.map((option) => (
						<div
							key={option}
							className='px-4 py-2 text-sm truncate cursor-pointer hover:bg-gray-100'
							onClick={() => {
								onChange(option);
								setIsOpen(false);
							}}>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FilterSelect;

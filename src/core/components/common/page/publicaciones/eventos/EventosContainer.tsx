import { Search } from 'lucide-react';
import { useRef, useState } from 'react';
import FilterSelect from '../../../../ui/FilterSelect';
import EventosGallery from './EventosGallery';

const EventosContainer = () => {
	const [category, setCategory] = useState('Cultural');
	const [date, setDate] = useState('');
	const dataInputRef = useRef<HTMLInputElement>(null);

	const handleCategoryChange = (newCategory: string) => {
		setCategory(newCategory);
	};

	const handleDataContainer = () => {
		dataInputRef.current?.showPicker?.();
	};

	return (
		<section className='p-6 bg-white border shadow-sm rounded-xl border-slate-200'>
			{/* Header */}
			<div className='flex items-center gap-4 mb-6'>
				{/* Search - Flexible */}
				<div className='flex items-center flex-1 min-w-0 px-4 py-2 transition-colors border rounded-lg border-slate-300 focus-within:border-blue-500 bg-slate-50/50'>
					<Search className='flex-shrink-0 w-4 h-4 mr-3 text-slate-500' />
					<input
						type='text'
						placeholder='Buscar eventos...'
						className='w-full bg-transparent border-0 outline-none text-slate-900 placeholder:text-slate-500'
					/>
				</div>

				{/* Date */}
				<div className='relative w-64'>
					<div
						className='flex items-center px-4 py-2 transition-colors border rounded-lg border-slate-300 focus-within:border-blue-500 bg-slate-50/50 hover:bg-slate-100/50'
						onClick={handleDataContainer}>
						<span className='mr-3 text-sm font-medium cursor-default text-slate-600'>Fecha:</span>
						<input
							type='date'
							ref={dataInputRef}
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className='flex-1 bg-transparent border-0 outline-none cursor-pointer text-slate-900'
						/>
					</div>
				</div>

				{/* Category */}
				<FilterSelect
					label='Categoría'
					value={category}
					options={['Cultural', 'Deportivo', 'Educativo', 'Social']}
					onChange={handleCategoryChange}
          			className='bg-slate-50/50 hover:bg-slate-100/50'
					width='w-52'
					placeholder='Seleccionar categoría'
				/>
			</div>
			{/* Content */}
			<EventosGallery />
		</section>
	);
};

export default EventosContainer;

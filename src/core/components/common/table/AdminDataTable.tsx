import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type PaginationState,
	type Row,
	type SortingState,
} from '@tanstack/react-table';
import {
	AlertCircle,
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Plus,
	Search,
	type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export interface TableAction<T> {
	icon: LucideIcon;
	label: string;
	onClick: (item: T) => void;
	variant?: 'edit' | 'delete' | 'default';
	disabled?: (item: T) => boolean;
}

interface AdminDataTableProps<T> {
	title: string;
	description: string;
	icon: LucideIcon;
	data: T[];
	columns: ColumnDef<T>[];
	actions?: TableAction<T>[];
	isLoading?: boolean;
	error?: Error | null;
	searchPlaceholder?: string;
	onNew?: () => void;
	newButtonText?: string;
	enablePagination?: boolean;
	initialPageSize?: number;
	pageSizeOptions?: number[];
	globalFilterFn?: (row: Row<T>, columnId: string, filterValue: string) => boolean;
}

export function AdminDataTable<T>({
	title,
	description,
	icon: Icon,
	data,
	columns,
	actions = [],
	isLoading = false,
	error = null,
	searchPlaceholder = 'Buscar...',
	onNew,
	newButtonText = 'Nuevo elemento',
	enablePagination = true,
	initialPageSize = 10,
	globalFilterFn,
}: AdminDataTableProps<T>) {
	// Estados de la tabla
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: initialPageSize,
	});

	// Columna de acciones
	const actionsColumn: ColumnDef<T> = useMemo(
		() => ({
			id: 'actions',
			header: 'Acciones',
			cell: ({ row }) => (
				<div className='flex items-center space-x-1'>
					{actions.map((action, index) => {
						const ActionIcon = action.icon;
						const isDisabled = action.disabled?.(row.original) || false;

						const getActionClasses = () => {
							const baseClasses = 'p-2 transition-colors rounded-lg text-slate-400';
							if (isDisabled) return `${baseClasses} opacity-50 cursor-not-allowed`;

							switch (action.variant) {
								case 'edit':
									return `${baseClasses} hover:text-emerald-600 hover:bg-emerald-50`;
								case 'delete':
									return `${baseClasses} hover:text-red-600 hover:bg-red-50`;
								default:
									return `${baseClasses} hover:text-blue-600 hover:bg-blue-50`;
							}
						};

						return (
							<button
								key={index}
								className={getActionClasses()}
								onClick={() => !isDisabled && action.onClick(row.original)}
								title={action.label}
								disabled={isDisabled}>
								<ActionIcon className='w-4 h-4' />
							</button>
						);
					})}
				</div>
			),
			enableSorting: false,
			enableColumnFilter: false,
		}),
		[actions]
	);

	// Configurar columnas
	const finalColumns = useMemo(() => {
		return actions.length > 0 ? [...columns, actionsColumn] : columns;
	}, [columns, actionsColumn, actions.length]);

	// Configurar tabla
	const table = useReactTable({
		data,
		columns: finalColumns,
		state: {
			sorting,
			columnFilters,
			globalFilter,
			pagination,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
		manualPagination: false,
		globalFilterFn: globalFilterFn || 'includesString',
	});

	// Obtener información de paginación
	const pageCount = table.getPageCount();
	const currentPage = pagination.pageIndex + 1;
	const totalItems = table.getFilteredRowModel().rows.length;
	const startItem = pagination.pageIndex * pagination.pageSize + 1;
	const endItem = Math.min(startItem + pagination.pageSize - 1, totalItems);

	return (
		<div className='px-2 space-y-6 '>
			{/* Header */}
			<div>
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-3'>
						<div className='p-2 rounded-lg bg-blue-50'>
							<Icon className='w-6 h-6 text-blue-700' />
						</div>
						<div>
							<h1 className='text-xl font-bold text-slate-900'>{title}</h1>
							<p className='text-slate-600'>{description}</p>
						</div>
					</div>
					{onNew && (
						<button
							className='flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800'
							onClick={onNew}>
							<Plus className='w-4 h-4' />
							<span className='hidden md:block'>{newButtonText}</span>
						</button>
					)}
				</div>

				{/* Search Bar */}
				<div className='my-6'>
					<div className='flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
						<div className='flex-1 max-w-md'>
							<div className='relative'>
								<Search className='absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400' />
								<input
									placeholder={searchPlaceholder}
									value={globalFilter ?? ''}
									onChange={(e) => setGlobalFilter(e.target.value)}
									className='w-full py-2 pl-10 pr-4 text-sm transition-colors border rounded-lg border-slate-300 outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
							</div>
						</div>
						<div className='flex items-center px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200'>
							<span className='font-medium text-slate-700'>
								{enablePagination ? `${startItem}-${endItem} de ${totalItems}` : totalItems}
							</span>
							<span className='ml-1 text-slate-500'>elementos</span>
						</div>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className='overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead className='border-b bg-slate-50 border-slate-200'>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											className='px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600'>
											{header.isPlaceholder ? null : (
												<div
													className={`flex items-center space-x-1 ${
														header.column.getCanSort() ? 'cursor-pointer select-none hover:text-slate-900' : ''
													}`}
													onClick={header.column.getToggleSortingHandler()}>
													<span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
													{header.column.getCanSort() && (
														<span className='text-slate-400'>
															{{
																asc: <ArrowUp className='w-3 h-3' />,
																desc: <ArrowDown className='w-3 h-3' />,
															}[header.column.getIsSorted() as string] ?? <ArrowUpDown className='w-3 h-3' />}
														</span>
													)}
												</div>
											)}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody className='divide-y divide-slate-200'>
							{/* Loading State */}
							{isLoading && (
								<tr>
									<td colSpan={finalColumns.length} className='py-16 text-center'>
										<div className='flex flex-col items-center space-y-3'>
											<div className='w-8 h-8 border-2 border-blue-600 rounded-full border-t-transparent animate-spin'></div>
											<p className='text-slate-600'>Cargando elementos...</p>
										</div>
									</td>
								</tr>
							)}

							{/* Error State */}
							{error && (
								<tr>
									<td colSpan={finalColumns.length} className='py-16 text-center'>
										<div className='flex flex-col items-center space-y-3'>
											<div className='p-3 rounded-full bg-red-50'>
												<AlertCircle className='w-6 h-6 text-red-600' />
											</div>
											<div>
												<p className='font-medium text-red-900'>Error al cargar los elementos</p>
												<p className='mt-1 text-sm text-red-600'>{error.message}</p>
											</div>
										</div>
									</td>
								</tr>
							)}

							{/* Empty State */}
							{!isLoading && !error && table.getRowModel().rows.length === 0 && (
								<tr>
									<td colSpan={finalColumns.length} className='py-16 text-center'>
										<div className='flex flex-col items-center space-y-3'>
											<div className='p-3 rounded-full bg-slate-100'>
												<Search className='w-6 h-6 text-slate-400' />
											</div>
											<div>
												<p className='font-medium text-slate-700'>No se encontraron elementos</p>
												<p className='mt-1 text-sm text-slate-500'>
													{globalFilter ? 'Intenta con otros términos de búsqueda' : 'Crea tu primer elemento'}
												</p>
											</div>
										</div>
									</td>
								</tr>
							)}

							{/* Data Rows */}
							{!isLoading &&
								!error &&
								table.getRowModel().rows.map((row) => (
									<tr key={row.id} className='transition-colors hover:bg-slate-50'>
										{row.getVisibleCells().map((cell) => (
											<td key={cell.id} className='px-6 py-3'>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</td>
										))}
									</tr>
								))}
						</tbody>
					</table>
				</div>

				{/* Paginación */}
				{enablePagination && (
					<div className='flex flex-col gap-4 px-6 py-4 border-t border-slate-200 bg-slate-50 sm:flex-row sm:items-center sm:justify-between'>
						{/* Información y selector de página */}
						<div className='flex items-center gap-4'>
							<div className='text-sm text-slate-700'>
								Mostrando <span className='font-medium'>{startItem}</span> a{' '}
								<span className='font-medium'>{endItem}</span> de <span className='font-medium'>{totalItems}</span>{' '}
								elementos
							</div>
						</div>

						{/* Controles de paginación */}
						<div className='flex items-center gap-2'>
							<button
								className={`px-3 py-2 rounded-lg text-sm font-medium ${
									table.getCanPreviousPage()
										? 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600'
										: 'bg-slate-100 text-slate-400 cursor-not-allowed'
								}`}
								onClick={() => table.setPageIndex(0)}
								disabled={!table.getCanPreviousPage()}
								title='Primera página'>
								<ChevronsLeft className='w-4 h-4' />
							</button>

							<button
								className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
									table.getCanPreviousPage()
										? 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600'
										: 'bg-slate-100 text-slate-400 cursor-not-allowed'
								}`}
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
								title='Página anterior'>
								<ChevronLeft className='w-4 h-4 mr-2' />
								<span>Anterior</span>
							</button>

							<div className='px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg'>{currentPage}</div>

							<button
								className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${
									table.getCanNextPage()
										? 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600'
										: 'bg-slate-100 text-slate-400 cursor-not-allowed'
								}`}
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
								title='Página siguiente'>
								<span>Siguiente</span>
								<ChevronRight className='w-4 h-4 ml-2' />
							</button>

							<button
								className={`px-3 py-2 rounded-lg text-sm font-medium ${
									table.getCanNextPage()
										? 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-600'
										: 'bg-slate-100 text-slate-400 cursor-not-allowed'
								}`}
								onClick={() => table.setPageIndex(pageCount - 1)}
								disabled={!table.getCanNextPage()}
								title='Última página'>
								<ChevronsRight className='w-4 h-4' />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

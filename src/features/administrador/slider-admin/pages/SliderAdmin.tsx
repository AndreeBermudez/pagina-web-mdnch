import { useMemo, useState } from 'react';
import { useModal } from '../../../../core/hooks/useModal';
import { Modal } from '../../../../core/components/common/modal/Modal';
import SliderForm from '../components/SliderForm';
import type { SliderResponse } from '../schemas/slider.schema';
import { useSliderMutations } from '../hooks/useSliderMutations';
import { useSliderQuery } from '../hooks/useSliderQuery';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import type { ColumnDef, Row } from '@tanstack/react-table';
import { formatDate } from '../../../../core/utils/formatDate';
import { Edit, FileText, Trash2 } from 'lucide-react';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';

export default function SliderAdmin() {
	const { isModalOpen, handleModal } = useModal();
	const { success, error } = useNotifications();
	const { sliders, isLoading, error: queryError } = useSliderQuery();
	const { eliminarSlider } = useSliderMutations();
	const [sliderEdit, setSliderEdit] = useState<SliderResponse | null>(null);

	const formatSliderTitle = (titulo: string[]) => {
		return titulo.filter(Boolean).join(' ');
	};

	const handleEdit = (slider: SliderResponse) => {
		setSliderEdit(slider);
		handleModal();
	};

	const handleNew = () => {
		setSliderEdit(null);
		handleModal();
	};

	const handleDelete = (slider: SliderResponse) => {
		if (window.confirm('¿Estás seguro de que deseas eliminar este slider?')) {
			eliminarSlider.mutate(parseInt(slider.bannerId), {
				onSuccess: () => {
					success('Slider eliminado exitosamente');
				},
				onError: () => {
					error('Error al eliminar el slider');
				},
			});
		}
	};

	const sliderGlobalFilter = (row: Row<SliderResponse>, columnId: string, filterValue: string) => {
		const searchValue = filterValue.toLowerCase();

		const fecha = formatDate(row.getValue('fechaCreacion'));
		if (fecha.toLowerCase().includes(searchValue)) return true;

		const titulo = formatSliderTitle(row.getValue('titulo'));
		if (titulo.toLowerCase().includes(searchValue)) return true;
		
		const descripcion = String(row.getValue('descripcion')) || '';
		if (descripcion.toLowerCase().includes(searchValue)) return true;
		
		return false;
	};

	const columns: ColumnDef<SliderResponse>[] = useMemo(
		() => [
			{
				accessorKey: 'fechaCreacion',
				header: 'Fecha',
				cell: ({ getValue }) => (
					<div className='text-sm font-medium text-slate-900 whitespace-nowrap'>
						{formatDate(getValue() as string)}
					</div>
				),
				filterFn: (row, columnId, filterValue) => {
					const fecha = formatDate(row.getValue(columnId) as string);
					return fecha.toLowerCase().includes(filterValue.toLowerCase());
				},
				enableColumnFilter: true,
			},
			{
				accessorKey: 'titulo',
				header: 'Título',
				cell: ({ getValue }) => (
					<div className='max-w-xs'>
						<p className='text-sm font-medium text-slate-900 line-clamp-2'>
							{formatSliderTitle(getValue() as string[])}
						</p>
					</div>
				),
				filterFn: (row, columnId, filterValue) => {
					const titulos = row.getValue(columnId) as string[];
					return formatSliderTitle(titulos).toLowerCase().includes(filterValue.toLowerCase());
				},
				enableSorting: false,
				enableColumnFilter: true,
			},
			{
				accessorKey: 'descripcion',
				header: 'Descripción',
				cell: ({ getValue }) => (
					<div className='max-w-xs'>
						<p className='text-sm text-slate-700 line-clamp-2'>{getValue() as string}</p>
					</div>
				),
				enableSorting: false,
				enableColumnFilter: true,
			},
			{
				accessorKey: 'direccionImagen',
				header: 'Imagen',
				cell: ({ getValue }) => (
					<div className='w-12 h-12 overflow-hidden rounded-lg bg-slate-100'>
						<img
							src={(getValue() as string) || '/placeholder.svg'}
							alt={`Imagen del slider`}
							className='object-cover w-full h-full'
						/>
					</div>
				),
				enableSorting: false,
			},
		],
		[]
	);

	const actions: TableAction<SliderResponse>[] = [
		{
			icon: Edit,
			label: 'Editar elemento',
			onClick: handleEdit,
			variant: 'edit',
		},
		{
			icon: Trash2,
			label: 'Eliminar elemento',
			onClick: handleDelete,
			variant: 'delete',
			disabled: () => eliminarSlider.isPending,
		},
	];

	return (
		<>
			<AdminDataTable
				title='Gestión de Slider'
				description='Administra las imágenes del carousel principal'
				icon={FileText}
				data={sliders || []}
				columns={columns}
				actions={actions}
				isLoading={isLoading}
				error={queryError}
				searchPlaceholder='Buscar por título, descripción...'
				onNew={handleNew}
				newButtonText='Nuevo elemento'
				enablePagination={true}
				initialPageSize={10}
				globalFilterFn={sliderGlobalFilter}
			/>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={handleModal} title={sliderEdit ? 'Editar Slider' : 'Nuevo Slider'}>
					<SliderForm handleModal={handleModal} sliderEditable={sliderEdit} />
				</Modal>
			)}
		</>
	);
}

import type { ColumnDef } from '@tanstack/react-table';
import { Edit, FileText, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import { useModal } from '../../../../core/hooks/useModal';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { formatDate } from '../../../../core/utils/formatDate';
import { useEventosQuery } from '../hooks/useEventosQuery';
import { useEventosMutations } from '../hooks/useEventosMutation';
import type { EventoResponse } from '../schemas/evento.schema';
import { EventosForm } from '../components/EventosForm';

export default function EventosAdmin() {
	const { isModalOpen, handleModal } = useModal();
	const { success, error } = useNotifications();
	const { eventos, isLoading, error: queryError } = useEventosQuery();
	const { eliminarEvento } = useEventosMutations();
	const [eventoEdit, setEventoEdit] = useState<EventoResponse | null>(null);

	const handleEdit = (slider: EventoResponse) => {
		setEventoEdit(slider);
		handleModal();
	};

	const handleNew = () => {
		setEventoEdit(null);
		handleModal();
	};

	const getCategoryColor = (categoria: string) => {
		const colors = {
			Anuncios: 'bg-blue-50 text-blue-700 border-blue-200',
			Eventos: 'bg-purple-50 text-purple-700 border-purple-200',
			Obras: 'bg-orange-50 text-orange-700 border-orange-200',
			Servicios: 'bg-emerald-50 text-emerald-700 border-emerald-200',
			Cultura: 'bg-pink-50 text-pink-700 border-pink-200',
			Deportes: 'bg-yellow-50 text-yellow-700 border-yellow-200',
			Salud: 'bg-teal-50 text-teal-700 border-teal-200',
			Educación: 'bg-indigo-50 text-indigo-700 border-indigo-200',
		};
		return colors[categoria as keyof typeof colors] || 'bg-slate-50 text-slate-700 border-slate-200';
	};

	const handleDelete = (evento: EventoResponse) => {
		if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
			eliminarEvento.mutate(evento.eventoId, {
				onSuccess: () => {
					success('Evento eliminado exitosamente');
				},
				onError: () => {
					error('Error al eliminar el evento');
				},
			});
		}
	};

	// const sliderGlobalFilter = (row: Row<NoticiaResponse>, columnId: string, filterValue: string) => {
	//     const searchValue = filterValue.toLowerCase();

	//     const fecha = formatDate(row.getValue('fechaCreacion'));
	//     if (fecha.toLowerCase().includes(searchValue)) return true;

	//     const titulo = formatSliderTitle(row.getValue('titulo'));
	//     if (titulo.toLowerCase().includes(searchValue)) return true;

	//     const descripcion = String(row.getValue('descripcion')) || '';
	//     if (descripcion.toLowerCase().includes(searchValue)) return true;

	//     return false;
	// };

	const columns: ColumnDef<EventoResponse>[] = useMemo(
		() => [
			{
				accessorKey: 'fecha',
				header: 'Fecha',
				cell: ({ getValue }) => (
					<div className='text-sm font-medium text-slate-900 whitespace-nowrap'>
						{formatDate(getValue() as string)}
					</div>
				),
				enableColumnFilter: true,
			},
			{
				accessorKey: 'titulo',
				header: 'Título',
				cell: ({ getValue }) => (
					<div className='max-w-xs'>
						<p className='text-sm font-medium text-slate-900 line-clamp-2'>{getValue() as string}</p>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'categoria',
				header: 'Categoría',
				cell: ({ getValue }) => (
					<div
						className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
							getValue() as string
						)}`}>
						<p className='text-sm text-slate-700 line-clamp-2'>{getValue() as string}</p>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'descripcion',
				header: 'Descripción',
				cell: ({ getValue }) => (
					<div className='max-w-xs'>
						<p className='text-sm font-medium text-slate-900 line-clamp-2'>{getValue() as string}</p>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'horaInicio',
				header: 'Hora Inicio',
				cell: ({ getValue }) => (
					<div className='text-sm font-medium text-slate-900 whitespace-nowrap'>{getValue() as string}</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'horaFin',
				header: 'Hora Fin',
				cell: ({ getValue }) => (
					<div className='text-sm font-medium text-slate-900 whitespace-nowrap'>{getValue() as string}</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'ubicacion',
				header: 'Ubicación',
				cell: ({ getValue }) => (
					<div className='max-w-xs'>
						<p className='text-sm font-medium text-slate-900 line-clamp-2'>{getValue() as string}</p>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'direccionImagen',
				header: 'Imagen',
				cell: ({ getValue }) => (
					<div className='w-12 h-12 overflow-hidden rounded-lg bg-slate-100'>
						<img
							src={(getValue() as string) || '/placeholder.svg'}
							alt={`Imagen del evento`}
							className='object-cover w-full h-full'
						/>
					</div>
				),
				enableSorting: false,
			},
		],
		[]
	);

	const actions: TableAction<EventoResponse>[] = [
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
			disabled: () => eliminarEvento.isPending,
		},
	];

	return (
		<>
			<AdminDataTable
				title='Gestión de Eventos'
				description='Administra los eventos municipales'
				icon={FileText}
				data={eventos || []}
				columns={columns}
				actions={actions}
				isLoading={isLoading}
				error={queryError}
				searchPlaceholder='Buscar...'
				onNew={handleNew}
				newButtonText='Nuevo Evento'
				enablePagination={true}
				initialPageSize={10}
				// globalFilterFn={sliderGlobalFilter}
			/>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={handleModal} title={eventoEdit ? 'Editar Evento' : 'Nuevo Evento'}>
					<EventosForm handleModal={handleModal} eventoEditable={eventoEdit} />
				</Modal>
			)}
		</>
	);
}

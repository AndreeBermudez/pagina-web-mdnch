import type { ColumnDef } from '@tanstack/react-table';
import { Edit, FileText, Trash2, ExternalLink } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useModal } from '../../../../core/hooks/useModal';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { formatDate } from '../../../../core/utils/formatDate';
import ServiciosForm from '../components/ServiciosForm';
import { useServiciosMutations } from '../hooks/useServiciosMutations';
import { useServiciosQuery } from '../hooks/useServiciosQuery';
import type { Servicio } from '../services/servicios.interface';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import ConfirmModal from '../components/ConfirmModal';

export default function ServiciosAdmin() {
	const { isModalOpen, handleModal } = useModal();
	const { success, error } = useNotifications();
	const { servicios, isLoading, error: queryError } = useServiciosQuery();
	const { eliminarServicio } = useServiciosMutations();
	const [servicioEdit, setServicioEdit] = useState<Servicio | null>(null);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [servicioToDelete, setServicioToDelete] = useState<Servicio | null>(null);

	const handleEdit = (servicio: Servicio) => {
		setServicioEdit(servicio);
		handleModal();
	};

	const handleNew = () => {
		setServicioEdit(null);
		handleModal();
	};

	const handleDeleteClick = (servicio: Servicio) => {
		setServicioToDelete(servicio);
		setShowConfirmModal(true);
	};

	const handleDeleteConfirm = () => {
		if (servicioToDelete) {
			eliminarServicio.mutate(servicioToDelete.serviciosMuniId, {
				onSuccess: () => {
					success('Servicio eliminado exitosamente');
					setShowConfirmModal(false);
					setServicioToDelete(null);
				},
				onError: () => {
					error('Error al eliminar el servicio');
				},
			});
		}
	};

	const columns: ColumnDef<Servicio>[] = useMemo(
		() => [
			{
				accessorKey: 'fechaCreacion',
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
						<p className='text-sm font-medium text-slate-900 line-clamp-2'>
							{getValue() as string}
						</p>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'descripcion',
				header: 'Descripción',
				cell: ({ getValue }) => (
					<div className='max-w-md'>
						<p className='text-sm text-slate-600 line-clamp-2'>
							{getValue() as string}
						</p>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'link',
				header: 'Enlace',
				cell: ({ getValue }) => {
					const link = getValue() as string;
					return (
						<div className='max-w-xs'>
							<a
								href={link}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 hover:underline'
							>
								<ExternalLink className='w-3 h-3' />
								<span className='truncate'>
									{link.length > 30 ? `${link.substring(0, 30)}...` : link}
								</span>
							</a>
						</div>
					);
				},
				enableSorting: false,
			},
		],
		[]
	);

	const actions: TableAction<Servicio>[] = [
		{
			icon: Edit,
			label: 'Editar servicio',
			onClick: handleEdit,
			variant: 'edit',
		},
		{
			icon: Trash2,
			label: 'Eliminar servicio',
			onClick: handleDeleteClick,
			variant: 'delete',
			disabled: () => eliminarServicio.isPending,
		},
	];

	return (
		<>
			<AdminDataTable
				title='Gestión de Servicios'
				description='Administra los servicios municipales del sistema'
				icon={FileText}
				data={servicios || []}
				columns={columns}
				actions={actions}
				isLoading={isLoading}
				error={queryError}
				searchPlaceholder='Buscar por título, descripción...'
				onNew={handleNew}
				newButtonText='Nuevo Servicio'
				enablePagination={true}
				initialPageSize={10}
			/>
			
			{isModalOpen && (
				<ServiciosForm 
					isOpen={isModalOpen} 
					onClose={handleModal} 
					onSave={handleModal}
					initialData={servicioEdit} 
				/>
			)}

			{showConfirmModal && servicioToDelete && (
				<ConfirmModal
					isOpen={showConfirmModal}
					onClose={() => {
						setShowConfirmModal(false);
						setServicioToDelete(null);
					}}
					onConfirm={handleDeleteConfirm}
					title="Eliminar Servicio"
					message={`¿Estás seguro de que deseas eliminar el servicio "${servicioToDelete.titulo}"?`}
				/>
			)}
		</>
	);
}

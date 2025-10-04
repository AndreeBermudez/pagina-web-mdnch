import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import { useModal } from '../../../../core/hooks/useModal';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { formatDate } from '../../../../core/utils/formatDate';
import { useTransparenciaMutation } from '../hooks/useTransparenciaMutation';
import { useTransparenciaQuery } from '../hooks/useTransparenciaQuery';
import type { TransparenciaResponse } from '../schemas/transparencia.schema';

export default function TransparenciaAdmin() {
	const { isModalOpen, handleModal } = useModal();
	const { success, error } = useNotifications();
	const { transparencias, isLoading, error: queryError } = useTransparenciaQuery();
	const { deleteTransparencia } = useTransparenciaMutation();
	const [transparenciaEdit, setTransparenciaEdit] = useState<TransparenciaResponse | null>(null);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<TransparenciaResponse | null>(null);

	const handleEdit = (transparencia: TransparenciaResponse) => {
		setTransparenciaEdit(transparencia);
		handleModal();
	};

	const handleNew = () => {
		setTransparenciaEdit(null);
		handleModal();
	};

	const openDeleteConfirm = (transparencia: TransparenciaResponse) => {
		setItemToDelete(transparencia);
		setShowConfirmDelete(true);
	};

	const closeDeleteConfirm = () => {
		setShowConfirmDelete(false);
		setItemToDelete(null);
	};

	const handleDelete = () => {
		if (itemToDelete) {
			deleteTransparencia.mutate(itemToDelete.transparenciaId, {
				onSuccess: () => {
					success('Registro de transparencia eliminado exitosamente');
					closeDeleteConfirm();
				},
				onError: () => {
					error('Error al eliminar el registro de transparencia');
					closeDeleteConfirm();
				},
			});
		}
	};

	const columns: ColumnDef<TransparenciaResponse>[] = useMemo(
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
				accessorKey: 'concepto',
				header: 'Concepto',
				cell: ({ getValue }) => (
					<div className='max-w-xs'>
						<p className='text-sm font-medium text-slate-900 line-clamp-2'>{getValue() as string}</p>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'responsable',
				header: 'Responsable',
				cell: ({ getValue }) => (
					<div className='max-w-xs'>
						<span className='inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200'>
							{getValue() as string}
						</span>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'linkDocumento',
				header: 'Documento',
				cell: ({ getValue }) => (
					<div className='max-w-xs'>
						<a
							href={getValue() as string}
							target='_blank'
							rel='noopener noreferrer'
							className='text-sm text-blue-600 underline hover:text-blue-800 line-clamp-2'>
							Ver documento
						</a>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'responsable',
				header: 'Responsable',
				cell: ({ getValue }) => (
					<span className='inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200'>
						{getValue() as string}
					</span>
				),
				enableSorting: false,
			},
		],
		[]
	);

	const actions: TableAction<Presupuesto>[] = [
		{
			icon: Edit,
			label: 'Editar presupuesto',
			onClick: handleEdit,
			variant: 'edit',
		},
		{
			icon: Trash2,
			label: 'Eliminar presupuesto',
			onClick: handleDelete,
			variant: 'delete',
			disabled: () => deletePresupuesto.isPending,
		},
	];

	return (
		<>
			<AdminDataTable
				title='Gestión de Presupuesto'
				description='Administra los documentos de presupuesto municipales'
				icon={DollarSign}
				data={presupuestos || []}
				columns={columns}
				actions={actions}
				isLoading={isLoading}
				error={queryError}
				searchPlaceholder='Buscar por título, tipo...'
				onNew={handleNew}
				newButtonText='Nuevo presupuesto'
				enablePagination={true}
				initialPageSize={10}
			/>
			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					onClose={handleModal}
					title={presupuestoEdit ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}>
					<PresupuestoForm handleModal={handleModal} presupuestoEditable={presupuestoEdit} />
				</Modal>
			)}
		</>
	);
}

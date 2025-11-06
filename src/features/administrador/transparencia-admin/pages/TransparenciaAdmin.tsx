import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Modal } from '../../../../core/components/common/modal/Modal';
import ConfirmModal from '../components/ConfirmModal';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import { useModal } from '../../../../core/hooks/useModal';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useTransparenciaMutation } from '../hooks/useTransparenciaMutation';
import { useTransparenciaQuery } from '../hooks/useTransparenciaQuery';
import { useTransparenciaByIdQuery } from '../hooks/useTransparenciaByIdQuery';
import type { TransparenciaResponse } from '../schemas/transparencia.schema';
import { AgregarConceptoModal } from '../components/AgregarConceptoModal';
import { EditarConceptoModal } from '../components/EditarConceptoModal';

export default function TransparenciaAdmin() {
	const { isModalOpen, handleModal } = useModal();
	const { success, error } = useNotifications();
	const { transparencias, isLoading, error: queryError } = useTransparenciaQuery();
	const { deleteTransparencia } = useTransparenciaMutation();
	const [selectedTransparenciaId, setSelectedTransparenciaId] = useState<number | null>(null);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [itemToDelete, setItemToDelete] = useState<TransparenciaResponse | null>(null);
	const [modalType, setModalType] = useState<'add' | 'edit'>('add');

	// Obtener detalles de la transparencia con períodos
	const { data: transparenciaDetalle, isLoading: isLoadingDetalle } = useTransparenciaByIdQuery(selectedTransparenciaId);

	const handleEdit = (transparencia: TransparenciaResponse) => {
		setSelectedTransparenciaId(transparencia.transparenciaId);
		setModalType('edit');
		handleModal();
	};

	const handleNew = () => {
		setSelectedTransparenciaId(null);
		setModalType('add');
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
				accessorKey: 'transparenciaId',
				header: 'ID',
				cell: ({ getValue }) => (
					<div className='text-sm font-medium text-slate-900 whitespace-nowrap'>
						#{getValue() as number}
					</div>
				),
				enableColumnFilter: false,
			},
			{
				accessorKey: 'concepto',
				header: 'Concepto',
				cell: ({ getValue }) => (
					<div className='max-w-md'>
						<p className='text-sm font-medium text-slate-900 line-clamp-2'>{getValue() as string}</p>
					</div>
				),
				enableSorting: false,
			},
			
		],
		[]
	);

	const actions: TableAction<TransparenciaResponse>[] = [
		{
			icon: Edit,
			label: 'Editar transparencia',
			onClick: handleEdit,
			variant: 'edit',
		},
		{
			icon: Trash2,
			label: 'Eliminar transparencia',
			onClick: openDeleteConfirm,
			variant: 'delete',
			disabled: () => deleteTransparencia.isPending,
		},
	];

	return (
		<>
			<AdminDataTable
				title='Gestión de Transparencia'
				description='Administra los registros de transparencia municipal'
				icon={FileText}
				data={transparencias || []}
				columns={columns}
				actions={actions}
				isLoading={isLoading}
				error={queryError}
				searchPlaceholder='Buscar por concepto...'
				onNew={handleNew}
				newButtonText='Nuevo registro'
				enablePagination={true}
				initialPageSize={10}
			/>
			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					onClose={handleModal}
					title={modalType === 'add' ? 'Nuevo Concepto' : 'Editar Concepto'}
					size={modalType === 'edit' ? 'xl' : 'sm'}
				>
					{modalType === 'add' ? (
						<AgregarConceptoModal handleModal={handleModal} />
					) : isLoadingDetalle ? (
						<div className='flex justify-center items-center h-48'>
							<p className='text-gray-500'>Cargando...</p>
						</div>
					) : transparenciaDetalle ? (
						<EditarConceptoModal handleModal={handleModal} transparencia={transparenciaDetalle} />
					) : (
						<div className='flex justify-center items-center h-48'>
							<p className='text-red-500'>Error al cargar los datos</p>
						</div>
					)}
				</Modal>
			)}
			{showConfirmDelete && (
				<ConfirmModal
					isOpen={showConfirmDelete}
					onClose={closeDeleteConfirm}
					onConfirm={handleDelete}
					title='Eliminar Registro'
					message='¿Estás seguro de que deseas eliminar este registro de transparencia? Esta acción no se puede deshacer.'
				/>
			)}
		</>
	);
}

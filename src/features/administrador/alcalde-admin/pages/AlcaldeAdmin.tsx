import type { ColumnDef } from '@tanstack/react-table';
import { Crown, Edit, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import { useModal } from '../../../../core/hooks/useModal';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { formatDate } from '../../../../core/utils/formatDate';
import { AlcaldeForm } from '../components/AlcaldeForm';
import { useAlcaldeMutations } from '../hooks/useAlcaldeMutations';
import { useAlcaldeQuery } from '../hooks/useAlcaldeQuery';
import type { Alcalde } from '../schemas/alcalde.schema';
import ConfirmModal from '../components/ConfirmModal';

export default function AlcaldeAdmin() {
	const { isModalOpen, handleModal } = useModal();
	const { success, error } = useNotifications();
	const { alcaldes, isLoading, error: queryError } = useAlcaldeQuery();
	const { deleteAlcalde } = useAlcaldeMutations();
	const [alcaldeEdit, setAlcaldeEdit] = useState<Alcalde | null>(null);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [alcaldeToDelete, setAlcaldeToDelete] = useState<Alcalde | null>(null);

	const handleEdit = (alcalde: Alcalde) => {
		setAlcaldeEdit(alcalde);
		handleModal();
	};

	const handleNew = () => {
		setAlcaldeEdit(null);
		handleModal();
	};

	const handleDelete = (alcalde: Alcalde) => {
		setAlcaldeToDelete(alcalde);
		setIsConfirmOpen(true);
	};

	const confirmDelete = () => {
		if (alcaldeToDelete) {
			deleteAlcalde.mutate(alcaldeToDelete.alcaldeId, {
				onSuccess: () => {
					success('Alcalde eliminado exitosamente');
				},
				onError: () => {
					error('Error al eliminar el alcalde');
				},
			});
		}
	};

	const columns: ColumnDef<Alcalde>[] = useMemo(
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
				accessorKey: 'nombre',
				header: 'Alcalde',
				cell: ({ row }) => (
					<div className='flex items-center space-x-3'>
						<div className='flex-shrink-0'>
							<img
								src={row.original.direccionImagen || '/placeholder.svg'}
								alt={`${row.original.nombre} ${row.original.apellido}`}
								className='object-cover w-10 h-10 rounded-full'
							/>
						</div>
						<div>
							<p className='text-sm font-medium text-slate-900'>
								{row.original.nombre} {row.original.apellido}
							</p>
						</div>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'periodo',
				header: 'Periodo',
				cell: ({ getValue }) => (
					<span className='inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200'>
						{getValue() as string}
					</span>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'aprobacionCiudadana',
				header: 'Aprobación',
				cell: ({ getValue }) => <div className='text-sm text-slate-600'>{getValue() as string}</div>,
				enableSorting: false,
			},
			{
				accessorKey: 'numeroObras',
				header: 'Obras',
				cell: ({ getValue }) => <div className='text-sm font-medium text-slate-900'>{getValue() as number}</div>,
				enableSorting: false,
			},
			{
				accessorKey: 'descripcion',
				header: 'Descripción',
				cell: ({ getValue }) => (
					<div className='max-w-xs'>
						<p className='text-sm text-slate-900 line-clamp-2'>{getValue() as string}</p>
					</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'presupuesto',
				header: 'Presupuesto',
				cell: ({ getValue }) => (
					<div className='text-sm font-medium text-slate-900'>${(getValue() as number).toLocaleString()}</div>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'atencionCiudadana',
				header: 'Atención',
				cell: ({ getValue }) => (
					<span className='inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200'>
						{getValue() as string}
					</span>
				),
				enableSorting: false,
			},
			{
				accessorKey: 'direccionImagen',
				header: 'Imagen',
				cell: ({ getValue, row }) => (
					<div className='w-12 h-12 overflow-hidden rounded-lg bg-slate-100'>
						<img
							src={(getValue() as string) || '/placeholder.svg'}
							alt={`${row.original.nombre} ${row.original.apellido}`}
							className='object-cover w-full h-full'
						/>
					</div>
				),
				enableSorting: false,
			},
		],
		[]
	);

	const actions: TableAction<Alcalde>[] = [
		{
			icon: Edit,
			label: 'Editar alcalde',
			onClick: handleEdit,
			variant: 'edit',
		},
		{
			icon: Trash2,
			label: 'Eliminar alcalde',
			onClick: handleDelete,
			variant: 'delete',
			disabled: () => deleteAlcalde.isPending,
		},
	];

	return (
		<>
			{isConfirmOpen && alcaldeToDelete && (
				<ConfirmModal
					isOpen={isConfirmOpen}
					onClose={() => setIsConfirmOpen(false)}
					onConfirm={confirmDelete}
					title="Eliminar registro"
					message={`¿Estás seguro de que deseas eliminar al alcalde ${alcaldeToDelete.nombre} ${alcaldeToDelete.apellido}? Esta acción no se puede deshacer.`}
					confirmText="Eliminar"
					cancelText="Cancelar"
				/>
			)}
			<AdminDataTable
				title='Gestión de Alcalde'
				description='Administra la información del alcalde municipal'
				icon={Crown}
				data={alcaldes || []}
				columns={columns}
				actions={actions}
				isLoading={isLoading}
				error={queryError}
				searchPlaceholder='Buscar por nombre, periodo...'
				onNew={handleNew}
				newButtonText='Nuevo alcalde'
				enablePagination={true}
				initialPageSize={10}
			/>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={handleModal} title={alcaldeEdit ? 'Editar Alcalde' : 'Nuevo Alcalde'}>
					<AlcaldeForm handleModal={handleModal} alcaldeEditable={alcaldeEdit} />
				</Modal>
			)}
		</>
	);
}

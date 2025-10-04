import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import { useModal } from '../../../../core/hooks/useModal';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { formatDate } from '../../../../core/utils/formatDate';
import { AlcaldeBannerForm } from '../components/AlcaldeBannerForm';
import ConfirmModal from '../components/ConfirmModal';
import { useAlcaldeBannerQuery } from '../hooks/useAlcaldeBannerQuery';
import { useAlcaldeBannerMutations } from '../hooks/useAlcaldeBannerMutations';
import type { AlcaldeBanner } from '../schemas/alcaldeBanner.schema';


export default function AlcaldeBannerAdmin() {
    const { isModalOpen, handleModal } = useModal();
    const { success, error } = useNotifications();
    const { alcaldesBanner, isLoading, error: queryError } = useAlcaldeBannerQuery();
    const { deleteAlcaldeBanner } = useAlcaldeBannerMutations();
    const [alcaldeBannerEdit, setAlcaldeBannerEdit] = useState<AlcaldeBanner | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [alcaldeBannerToDelete, setAlcaldeBannerToDelete] = useState<AlcaldeBanner | null>(null);

    const handleEdit = (alcaldeBanner: AlcaldeBanner) => {
        setAlcaldeBannerEdit(alcaldeBanner);
        handleModal();
    };

    const handleNew = () => {
        setAlcaldeBannerEdit(null);
        handleModal();
    };

    const handleDelete = (alcaldeBanner: AlcaldeBanner) => {
        setAlcaldeBannerToDelete(alcaldeBanner);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (alcaldeBannerToDelete) {
            deleteAlcaldeBanner.mutate(alcaldeBannerToDelete.alcaldeId, {
                onSuccess: () => {
                    success('Alcalde Banner eliminado exitosamente');
                    setIsConfirmOpen(false);
                    setAlcaldeBannerToDelete(null);
                },
                onError: () => {
                    error('Error al eliminar el alcalde banner');
                    setIsConfirmOpen(false);
                    setAlcaldeBannerToDelete(null);
                },
            });
        }
    };

    const columns: ColumnDef<AlcaldeBanner>[] = useMemo(
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
                header: 'Nombre Completo',
                cell: ({ row }) => (
                    <div className='max-w-xs'>
                        <p className='text-sm font-medium text-slate-900 line-clamp-2'>
                            {row.original.nombre} {row.original.apellido}
                        </p>
                    </div>
                ),
                enableSorting: false,
            },
            {
                accessorKey: 'tituloBannerPage',
                header: 'Título Banner',
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
                accessorKey: 'descripcionBannerPage',
                header: 'Descripción',
                cell: ({ getValue }) => (
                    <div className='max-w-xs'>
                        <p className='text-sm text-slate-700 line-clamp-2'>{getValue() as string}</p>
                    </div>
                ),
                enableSorting: false,
            },
            {
                accessorKey: 'direccionImagen',
                header: 'Imagen',
                cell: ({ getValue, row }) => (
                    <div className='w-12 h-12 overflow-hidden rounded-lg bg-slate-100'>
                        <img
                            src={(getValue() as string) }
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

    const actions: TableAction<AlcaldeBanner>[] = [
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
            disabled: () => deleteAlcaldeBanner.isPending,
        },
    ];



    return (
        <>
            <AdminDataTable
                title='Gestión de Alcalde Banner'
                description='Administra los banners del alcalde municipal'
                icon={User}
                data={alcaldesBanner || []}
                columns={columns}
                actions={actions}
                isLoading={isLoading}
                error={queryError ? new Error(queryError) : null}
                searchPlaceholder='Buscar por nombre, apellido, título...'
                onNew={handleNew}
                newButtonText='Nuevo Alcalde Banner'
                enablePagination={true}
                initialPageSize={10}
            />
            {isModalOpen && (
                <Modal 
                    isOpen={isModalOpen} 
                    onClose={handleModal} 
                    title={alcaldeBannerEdit ? 'Editar Alcalde Banner' : 'Nuevo Alcalde Banner'}
                >
                    <AlcaldeBannerForm handleModal={handleModal} alcaldeBannerEditable={alcaldeBannerEdit} />
                </Modal>
            )}
            {isConfirmOpen && alcaldeBannerToDelete && (
                <ConfirmModal
                    isOpen={isConfirmOpen}
                    onClose={() => {
                        setIsConfirmOpen(false);
                        setAlcaldeBannerToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                    title="Eliminar Alcalde Banner"
                    message={`¿Estás seguro de que deseas eliminar el banner de ${alcaldeBannerToDelete.nombre} ${alcaldeBannerToDelete.apellido}? Esta acción no se puede deshacer.`}
                    confirmText="Eliminar"
                    cancelText="Cancelar"
                />
            )}
        </>
    );
}

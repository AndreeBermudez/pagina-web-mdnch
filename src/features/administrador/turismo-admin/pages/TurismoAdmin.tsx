import type { ColumnDef } from '@tanstack/react-table';
import { Edit, MapPin, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import { useModal } from '../../../../core/hooks/useModal';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { formatDate } from '../../../../core/utils/formatDate';
import { TurismoForm } from '../components/TurismoForm';
import { useTurismoMutations } from '../hooks/useTurismoMutations';
import { useTurismoQuery } from '../hooks/useTurismoQuery';
import type { Turismo } from '../schemas/turismo.schema';

export default function TurismoAdmin() {
    const { isModalOpen, handleModal } = useModal();
    const { success, error } = useNotifications();
    const { turismo, isLoading, error: queryError } = useTurismoQuery();
    const { deleteTurismo } = useTurismoMutations();
    const [turismoEdit, setTurismoEdit] = useState<Turismo | null>(null);

    const handleEdit = (turismoItem: Turismo) => {
        setTurismoEdit(turismoItem);
        handleModal();
    };

    const handleNew = () => {
        setTurismoEdit(null);
        handleModal();
    };

    const handleDelete = (turismoItem: Turismo) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este elemento de turismo?')) {
            deleteTurismo.mutate(turismoItem.turismoId, {
                onSuccess: () => {
                    success('Elemento de turismo eliminado exitosamente');
                },
                onError: () => {
                    error('Error al eliminar el elemento de turismo');
                },
            });
        }
    };

    const columns: ColumnDef<Turismo>[] = useMemo(
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
                accessorKey: 'lugar',
                header: 'Lugar',
                cell: ({ getValue }) => (
                    <span className='inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200'>
                        {getValue() as string}
                    </span>
                ),
                enableSorting: false,
            },
            {
                accessorKey: 'ubicacion',
                header: 'Ubicación',
                cell: ({ getValue }) => (
                    <div className='max-w-xs'>
                        <p className='text-sm text-slate-600 line-clamp-2'>
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
                    <div className='max-w-xs'>
                        <p className='text-sm text-slate-900 line-clamp-2'>
                            {getValue() as string}
                        </p>
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
                            src={(getValue() as string) || '/placeholder.svg'}
                            alt={row.original.titulo}
                            className='object-cover w-full h-full'
                        />
                    </div>
                ),
                enableSorting: false,
            },
        ],
        []
    );

    const actions: TableAction<Turismo>[] = [
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
            disabled: () => deleteTurismo.isPending,
        },
    ];

    return (
        <>
            <AdminDataTable
                title='Gestión de Turismo'
                description='Administra los lugares turísticos municipales'
                icon={MapPin}
                data={turismo || []}
                columns={columns}
                actions={actions}
                isLoading={isLoading}
                error={queryError}
                searchPlaceholder='Buscar por título, lugar, ubicación...'
                onNew={handleNew}
                newButtonText='Nuevo elemento de turismo'
                enablePagination={true}
                initialPageSize={10}
            />
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleModal} title={turismoEdit ? 'Editar Elemento de Turismo' : 'Nuevo Elemento de Turismo'}>
                    <TurismoForm handleModal={handleModal} turismoEditable={turismoEdit} />
                </Modal>
            )}
        </>
    );
}
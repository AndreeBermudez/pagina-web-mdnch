import type { ColumnDef } from '@tanstack/react-table';
import { DollarSign, Edit, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import { useModal } from '../../../../core/hooks/useModal';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { formatDate } from '../../../../core/utils/formatDate';
import { PresupuestoForm } from '../components/PresupuestoForm';
import { usePresupuestoQuery } from '../hooks/usePresupuestoQuery';
import type { Presupuesto } from '../schemas/presupuesto.schema';
import { usePresupuestoMutation } from '../hooks/usePresupuestoMutation';
import ConfirmModal from '../components/ConfirmModal';

export default function PresupuestoAdmin() {
    const { isModalOpen, handleModal } = useModal();
    const { success, error } = useNotifications();
    const { presupuestos, isLoading, error: queryError } = usePresupuestoQuery();
    const { deletePresupuesto } = usePresupuestoMutation();
    const [presupuestoEdit, setPresupuestoEdit] = useState<Presupuesto | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [presupuestoToDelete, setPresupuestoToDelete] = useState<Presupuesto | null>(null);

    const handleEdit = (presupuesto: Presupuesto) => {
        setPresupuestoEdit(presupuesto);
        handleModal();
    };

    const handleNew = () => {
        setPresupuestoEdit(null);
        handleModal();
    };

    const getTipoColor = (tipo: string) => {
        const colors = {
            Anual: 'bg-blue-50 text-blue-700 border-blue-200',
            Trimestral: 'bg-purple-50 text-purple-700 border-purple-200',
            Mensual: 'bg-green-50 text-green-700 border-green-200',
            Extraordinario: 'bg-orange-50 text-orange-700 border-orange-200',
            Inversión: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            Operativo: 'bg-teal-50 text-teal-700 border-teal-200',
        };
        return colors[tipo as keyof typeof colors] || 'bg-slate-50 text-slate-700 border-slate-200';
    };

    const handleDelete = (presupuesto: Presupuesto) => {
        setPresupuestoToDelete(presupuesto);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (presupuestoToDelete) {
            deletePresupuesto.mutate(presupuestoToDelete.presupuestoId, {
                onSuccess: () => {
                    success('Presupuesto eliminado exitosamente');
                },
                onError: () => {
                    error('Error al eliminar el presupuesto');
                },
            });
        }
    };

    const columns: ColumnDef<Presupuesto>[] = useMemo(
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
                accessorKey: 'tipo',
                header: 'Tipo',
                cell: ({ getValue }) => (
                    <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getTipoColor(getValue() as string)}`}>
                        <p className='text-sm text-slate-700 line-clamp-2'>{getValue() as string}</p>
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
            {isConfirmOpen && presupuestoToDelete && (
                <ConfirmModal
                    isOpen={isConfirmOpen}
                    onClose={() => setIsConfirmOpen(false)}
                    onConfirm={confirmDelete}
                    title="Eliminar registro"
                    message={`¿Estás seguro de que deseas eliminar el presupuesto "${presupuestoToDelete.titulo}"?`}
                    confirmText="Eliminar"
                    cancelText="Cancelar"
                />
            )}
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
                <Modal isOpen={isModalOpen} onClose={handleModal} title={presupuestoEdit ? 'Editar Presupuesto' : 'Nuevo Presupuesto'}>
                    <PresupuestoForm handleModal={handleModal} presupuestoEditable={presupuestoEdit} />
                </Modal>
            )}
        </>
    );
}

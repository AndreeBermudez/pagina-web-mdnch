import type { ColumnDef } from '@tanstack/react-table';
import { Edit, FileText, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import { useModal } from '../../../../core/hooks/useModal';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { formatDate } from '../../../../core/utils/formatDate';
import { PduForm } from '../components/PduForm';
import { usePduMutations } from '../hooks/usePduMutations';
import { usePduQuery } from '../hooks/usePduQuery';
import type { Pdu } from '../schemas/pdu.schema';

export default function PduAdmin() {
    const { isModalOpen, handleModal } = useModal();
    const { success, error } = useNotifications();
    const { pdus, isLoading, error: queryError } = usePduQuery();
    const { eliminarPdu } = usePduMutations();
    const [pduEdit, setPduEdit] = useState<Pdu | null>(null);

    const handleEdit = (pdu: Pdu) => {
        setPduEdit(pdu);
        handleModal();
    };

    const handleNew = () => {
        setPduEdit(null);
        handleModal();
    };

    const handleDelete = (pdu: Pdu) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este PDU?')) {
            eliminarPdu.mutate(pdu.pduId, {
                onSuccess: () => {
                    success('PDU eliminado exitosamente');
                },
                onError: () => {
                    error('Error al eliminar el PDU');
                },
            });
        }
    };

    const columns: ColumnDef<Pdu>[] = useMemo(
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
                    <div className='max-w-xs'>
                        <p className='text-sm text-slate-900 line-clamp-2'>
                            {getValue() as string}
                        </p>
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

    const actions: TableAction<Pdu>[] = [
        {
            icon: Edit,
            label: 'Editar PDU',
            onClick: handleEdit,
            variant: 'edit',
        },
        {
            icon: Trash2,
            label: 'Eliminar PDU',
            onClick: handleDelete,
            variant: 'delete',
            disabled: () => eliminarPdu.isPending,
        },
    ];

    return (
        <>
            <AdminDataTable
                title='Gestión de PDU'
                description='Administra los documentos PDU municipales'
                icon={FileText}
                data={pdus || []}
                columns={columns}
                actions={actions}
                isLoading={isLoading}
                error={queryError}
                searchPlaceholder='Buscar por título, descripción...'
                onNew={handleNew}
                newButtonText='Nuevo PDU'
                enablePagination={true}
                initialPageSize={10}
            />
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleModal} title={pduEdit ? 'Editar PDU' : 'Nuevo PDU'}>
                    <PduForm handleModal={handleModal} pduEditable={pduEdit} />
                </Modal>
            )}
        </>
    );
}

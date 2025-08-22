import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import { useModal } from '../../../../core/hooks/useModal';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { formatDate } from '../../../../core/utils/formatDate';
import { FuncionarioForm } from '../components/FuncionarioForm';
import { useFuncionarioMutations } from '../hooks/useFuncionarioMutations';
import { useFuncionarioQuery } from '../hooks/useFuncionarioQuery';
import type { Funcionario } from '../schemas/funcionario.schema';

export default function FuncionariosAdmin() {
    const { isModalOpen, handleModal } = useModal();
    const { success, error } = useNotifications();
    const { funcionarios, isLoading, error: queryError } = useFuncionarioQuery();
    const { eliminarFuncionario } = useFuncionarioMutations();
    const [funcionarioEdit, setFuncionarioEdit] = useState<Funcionario | null>(null);

    const handleEdit = (funcionario: Funcionario) => {
        setFuncionarioEdit(funcionario);
        handleModal();
    };

    const handleNew = () => {
        setFuncionarioEdit(null);
        handleModal();
    };

    const handleDelete = (funcionario: Funcionario) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este funcionario?')) {
            eliminarFuncionario.mutate(funcionario.funcionarioId, {
                onSuccess: () => {
                    success('Funcionario eliminado exitosamente');
                },
                onError: () => {
                    error('Error al eliminar el funcionario');
                },
            });
        }
    };

    const columns: ColumnDef<Funcionario>[] = useMemo(
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
                header: 'Funcionario',
                cell: ({ row }) => (
                    <div className='flex items-center space-x-3'>
                        <div className='flex-shrink-0'>
                            {row.original.direccionImagen ? (
                                <img
                                    src={row.original.direccionImagen}
                                    alt={`${row.original.nombre} ${row.original.apellido}`}
                                    className='object-cover w-10 h-10 rounded-full'
                                />
                            ) : (
                                <div className='flex items-center justify-center w-10 h-10 text-sm font-medium rounded-full text-slate-600 bg-slate-200'>
                                    {row.original.nombre.charAt(0)}
                                    {row.original.apellido.charAt(0)}
                                </div>
                            )}
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
                accessorKey: 'cargo',
                header: 'Cargo',
                cell: ({ getValue }) => (
                    <span className='inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200'>
                        {getValue() as string}
                    </span>
                ),
                enableSorting: false,
            },
            {
                accessorKey: 'contacto',
                header: 'Contacto',
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
                accessorKey: 'direccionImagen',
                header: 'Imagen',
                cell: ({ getValue, row }) => (
                    <div className='w-12 h-12 overflow-hidden rounded-lg bg-slate-100'>
                        {getValue() ? (
                            <img
                                src={getValue() as string}
                                alt={`${row.original.nombre} ${row.original.apellido}`}
                                className='object-cover w-full h-full'
                            />
                        ) : (
                            <div className='flex items-center justify-center w-full h-full text-xs font-medium text-slate-600'>
                                NA
                            </div>
                        )}
                    </div>
                ),
                enableSorting: false,
            },
        ],
        []
    );

    const actions: TableAction<Funcionario>[] = [
        {
            icon: Edit,
            label: 'Editar funcionario',
            onClick: handleEdit,
            variant: 'edit',
        },
        {
            icon: Trash2,
            label: 'Eliminar funcionario',
            onClick: handleDelete,
            variant: 'delete',
            disabled: () => eliminarFuncionario.isPending,
        },
    ];

    return (
        <>
            <AdminDataTable
                title='Gestión de Funcionarios'
                description='Administra la información de los funcionarios municipales'
                icon={Users}
                data={funcionarios || []}
                columns={columns}
                actions={actions}
                isLoading={isLoading}
                error={queryError}
                searchPlaceholder='Buscar por nombre, apellido, cargo...'
                onNew={handleNew}
                newButtonText='Nuevo funcionario'
                enablePagination={true}
                initialPageSize={10}
            />
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleModal} title={funcionarioEdit ? 'Editar Funcionario' : 'Nuevo Funcionario'}>
                    <FuncionarioForm handleModal={handleModal} funcionarioEditable={funcionarioEdit} />
                </Modal>
            )}
        </>
    );
}
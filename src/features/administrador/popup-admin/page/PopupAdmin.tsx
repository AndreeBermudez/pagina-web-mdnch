import type { ColumnDef } from '@tanstack/react-table';
import { Edit, FileText, Trash2, Image } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import { useModal } from '../../../../core/hooks/useModal';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { PopupForm } from '../components/PopupForm';
import { usePopupMutations } from '../hooks/usePopupMutations';
import { usePopupQuery } from '../hooks/usePopupQuery';
import type { PopupResponse } from '../schemas/popup.schema';
import ConfirmModal from '../components/ConfirmModal';
import { Modal } from '../../../../core/components/common/modal/Modal';

export default function PopupAdmin() {
    const { isModalOpen, handleModal } = useModal();
    const { success, error: showError } = useNotifications();
    const { popups, isLoading, error: queryError } = usePopupQuery();
    const { eliminarPopup } = usePopupMutations();
    const [popupEdit, setPopupEdit] = useState<PopupResponse | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [popupToDelete, setPopupToDelete] = useState<PopupResponse | null>(null);

    const handleEdit = (popup: PopupResponse) => {
        setPopupEdit(popup);
        handleModal();
    };

    const handleNew = () => {
        setPopupEdit(null);
        handleModal();
    };

    const handleDelete = (popup: PopupResponse) => {
        setPopupToDelete(popup);
        setIsConfirmOpen(true);
    };
    
    const confirmDelete = () => {
        if (popupToDelete) {
            eliminarPopup.mutate(popupToDelete.popupId, {
                onSuccess: () => {
                    success('Popup eliminado exitosamente');
                    setIsConfirmOpen(false);
                    setPopupToDelete(null);
                },
                onError: (err: any) => {
                    console.error('Error al eliminar popup:', err);
                    showError('Error al eliminar el popup');
                },
            });
        }
    };

    const columns: ColumnDef<PopupResponse>[] = useMemo(
        () => [
            {
                accessorKey: 'popupId',
                header: 'ID',
                cell: ({ getValue }) => (
                    <div className='text-sm font-medium text-slate-900 whitespace-nowrap'>
                        #{getValue() as number}
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
                accessorKey: 'direccionImagen',
                header: 'Imagen',
                cell: ({ getValue }) => {
                    const imageUrl = getValue() as string;
                    return (
                        <div className='flex items-center space-x-2'>
                            <img 
                                src={imageUrl} 
                                alt="Popup" 
                                className='w-12 h-12 object-cover rounded-lg border border-slate-200'
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <div className='hidden items-center justify-center w-12 h-12 bg-slate-100 rounded-lg border border-slate-200'>
                                <Image className='w-6 h-6 text-slate-400' />
                            </div>
                        </div>
                    );
                },
                enableSorting: false,
            },
        ],
        []
    );

    const actions: TableAction<PopupResponse>[] = [
        {
            icon: Edit,
            label: 'Editar Popup',
            onClick: handleEdit,
            variant: 'edit',
        },
        {
            icon: Trash2,
            label: 'Eliminar Popup',
            onClick: handleDelete,
            variant: 'delete',
            disabled: () => eliminarPopup.isPending,
        },
    ];

    return (
        <>
            {isConfirmOpen && popupToDelete && (
                <ConfirmModal
                    isOpen={isConfirmOpen}
                    onClose={() => setIsConfirmOpen(false)}
                    onConfirm={confirmDelete}
                    title="Eliminar Popup"
                    message={`¿Estás seguro de que deseas eliminar el popup "${popupToDelete.titulo}"?`}
                    confirmText="Eliminar"
                    cancelText="Cancelar"
                />
            )}
            <AdminDataTable
                title='Gestión de Popups'
                description='Administra los popups de inicio del sistema'
                icon={FileText}
                data={popups || []}
                columns={columns}
                actions={actions}
                isLoading={isLoading}
                error={queryError}
                searchPlaceholder='Buscar por título...'
                onNew={handleNew}
                newButtonText='Nuevo Popup'
                enablePagination={true}
                initialPageSize={10}
            />
            {isModalOpen && (
                <Modal 
                    isOpen={isModalOpen} 
                    onClose={handleModal} 
                    title={popupEdit ? 'Editar Popup' : 'Nuevo Popup'}
                >
                    <PopupForm 
                        handleModal={handleModal} 
                        popupEditable={popupEdit} 
                    />
                </Modal>
            )}
        </>
    )
}

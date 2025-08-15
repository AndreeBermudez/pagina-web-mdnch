import { useMemo, useState } from "react";
import { useModal } from "../../../../core/hooks/useModal";
import { useNotifications } from "../../../../core/hooks/useNotifications";
import { useAgendaMutations } from "../hooks/useAgendaMutation";
import { useAgendaList } from "../hooks/useAgendaQuery";
import type { AgendaResponse } from "../schemas/agenda.schema";
import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../../../../core/utils/formatDate";
import { AdminDataTable, type TableAction } from "../../../../core/components/common/table/AdminDataTable";
import { Edit, FileText, Trash2 } from "lucide-react";
import { Modal } from "../../../../core/components/common/modal/Modal";
import { AgendaForm } from "../components/AgendaForm";

const AgendaAdmin = () => {
        const { isModalOpen, handleModal } = useModal();
        const { success, error } = useNotifications();
        const {data: agendas , isLoading, error: queryError} = useAgendaList();
        const { eliminarAgenda } = useAgendaMutations();
        const [agendaEditable, setAgendaEditable] = useState<AgendaResponse | null>(null);
    
        const handleEdit = (agenda: AgendaResponse) => {
            setAgendaEditable(agenda);
            handleModal();
        };
    
        const handleNew = () => {
            setAgendaEditable(null);
            handleModal();
        };
    
        const getCategoryColor = (categoria: string) => {
            const colors = {
                Anuncios: 'bg-blue-50 text-blue-700 border-blue-200',
                Eventos: 'bg-purple-50 text-purple-700 border-purple-200',
                Obras: 'bg-orange-50 text-orange-700 border-orange-200',
                Servicios: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                Cultura: 'bg-pink-50 text-pink-700 border-pink-200',
                Deportes: 'bg-yellow-50 text-yellow-700 border-yellow-200',
                Salud: 'bg-teal-50 text-teal-700 border-teal-200',
                Educación: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            };
            return colors[categoria as keyof typeof colors] || 'bg-slate-50 text-slate-700 border-slate-200';
        };
    
        const handleDelete = (agenda: AgendaResponse) => {
            if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
                eliminarAgenda.mutate(agenda.agendaId, {
                    onSuccess: () => {
                        success('Registro eliminado exitosamente');
                    },
                    onError: () => {
                        error('Error al eliminar el registro de la agenda');
                    },
                });
            }
        };

            const columns: ColumnDef<AgendaResponse>[] = useMemo(
                () => [
                    {
                        accessorKey: 'fecha',
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
                                <p className='text-sm font-medium text-slate-900 line-clamp-2'>{getValue() as string}</p>
                            </div>
                        ),
                        enableSorting: false,
                    },
                    {
                        accessorKey: 'categoria',
                        header: 'Categoría',
                        cell: ({ getValue }) => (
                            <div
                                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                                    getValue() as string
                                )}`}>
                                <p className='text-sm text-slate-700 line-clamp-2'>{getValue() as string}</p>
                            </div>
                        ),
                        enableSorting: false,
                    },
                    {
                        accessorKey: 'direccion',
                        header: 'Dirección',
                        cell: ({ getValue }) => (
                            <div className='max-w-xs'>
                                <p className='text-sm font-medium text-slate-900 line-clamp-2'>{getValue() as string}</p>
                            </div>
                        ),
                        enableSorting: false,
                    },
                    {
                        accessorKey: 'horaInicio',
                        header: 'Hora Inicio',
                        cell: ({ getValue }) => (
                            <div className='text-sm font-medium text-slate-900 whitespace-nowrap'>{getValue() as string}</div>
                        ),
                        enableSorting: false,
                    },
                    {
                        accessorKey: 'horaFin',
                        header: 'Hora Fin',
                        cell: ({ getValue }) => (
                            <div className='text-sm font-medium text-slate-900 whitespace-nowrap'>{getValue() as string}</div>
                        ),
                        enableSorting: false,
                    },
                ],
                []
            );
        
            const actions: TableAction<AgendaResponse>[] = [
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
                    disabled: () => eliminarAgenda.isPending,
                },
            ];
  return (
    		<>
			<AdminDataTable
				title='Gestión de Agenda del Alcalde'
				description='Administra los eventos y actividades del alcalde.'
				icon={FileText}
				data={agendas || []}
				columns={columns}
				actions={actions}
				isLoading={isLoading}
				error={queryError}
				searchPlaceholder='Buscar...'
				onNew={handleNew}
				newButtonText='Nuevo Registro'
				enablePagination={true}
				initialPageSize={10}
				// globalFilterFn={sliderGlobalFilter}
			/>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} onClose={handleModal} title={agendaEditable ? 'Editar Agenda' : 'Nueva Agenda'}>
					<AgendaForm handleModal={handleModal} agendaEditable={agendaEditable} />
				</Modal>
			)}
		</>
  )
}

export default AgendaAdmin
import type { ColumnDef } from '@tanstack/react-table';
import { ClipboardList, Edit, FileText, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AdminDataTable, type TableAction } from '../../../../core/components/common/table/AdminDataTable';
import { DocumentosForm } from '../components/DocumentosForm';
import { Modal } from '../../../../core/components/common/modal/Modal';
import { useModal } from '../../../../core/hooks/useModal';
import { NombramientoForm } from '../components/NombramientoForm';
import ConfirmModal from '../components/ConfirmModal';
import { useNombramientosQuery } from '../hooks/useNombramientoQueries';
import { useNombramientoMutations } from '../hooks/useNombramientoMutations';
import type { NombramientoResponse } from '../services/types';

type NombramientoRecord = NombramientoResponse;

export default function NombramientoAdmin() {
  const { isModalOpen, handleModal } = useModal();
  const [nombramientoEditable, setNombramientoEditable] = useState<NombramientoRecord | null>(null);
  const [documentosOpen, setDocumentosOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nombramientoToDelete, setNombramientoToDelete] = useState<NombramientoRecord | null>(null);
  const { data: nombramientos, isLoading } = useNombramientosQuery();
  const { eliminarNombramiento } = useNombramientoMutations();

  const handleDocuments = (record: NombramientoRecord) => {
    setNombramientoEditable(record);
    setDocumentosOpen(true);
  };

  const handleNew = () => {
    setNombramientoEditable(null);
    handleModal();
  };

  const handleEdit = (record: NombramientoRecord) => {
    setNombramientoEditable(record);
    handleModal();
  };

  const handleDelete = (record: NombramientoRecord) => {
    setNombramientoToDelete(record);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (nombramientoToDelete) {
      await eliminarNombramiento.mutateAsync(nombramientoToDelete.id);
      setNombramientoToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setNombramientoToDelete(null);
  };

  const columns: ColumnDef<NombramientoRecord>[] = useMemo(
    () => [
      {
        accessorKey: 'codigo',
        header: 'Codigo',
        cell: ({ getValue }) => (
          <span className='text-sm font-medium text-slate-900'>{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'nombramiento',
        header: 'Nombramiento',
        cell: ({ getValue }) => (
          <span className='text-sm text-slate-700 line-clamp-2'>{getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'area',
        header: 'Area',
        cell: ({ getValue }) => (
          <span className='inline-flex items-center px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full'>
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'vacantes',
        header: 'Vacantes',
        cell: ({ getValue }) => (
          <span className='text-sm font-semibold text-slate-900'>{getValue() as number}</span>
        ),
      },
      {
        accessorKey: 'documentos',
        header: 'Documentos',
        cell: ({ row }) => (
          <button
            type='button'
            onClick={() => handleDocuments(row.original)}
            aria-label={`Ver documentos de ${row.original.codigo}`}
            className='flex items-center justify-center w-10 h-10 text-blue-600 transition-colors rounded-lg hover:bg-blue-50'
          >
            <FileText className='w-4 h-4' />
          </button>
        ),
      },
    ],
    []
  );

  const actions: TableAction<NombramientoRecord>[] = [
    {
      icon: Edit,
      label: 'Editar nombramiento',
      variant: 'edit',
      onClick: handleEdit,
    },
    {
      icon: Trash2,
      label: 'Eliminar nombramiento',
      variant: 'delete',
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <AdminDataTable
        title='Gestion de Nombramientos'
        description='Administra los nombramientos del municipio'
        icon={ClipboardList}
        data={nombramientos || []}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        searchPlaceholder='Buscar por codigo, nombramiento o area'
        onNew={handleNew}
        newButtonText='Nuevo nombramiento'
        enablePagination
        initialPageSize={5}
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModal}
          title={nombramientoEditable ? 'Editar Nombramiento' : 'Nuevo Nombramiento'}
        >
          <NombramientoForm handleModal={handleModal} nombramientoEditable={nombramientoEditable} />
        </Modal>
      )}
      {documentosOpen && nombramientoEditable && (
        <Modal
          isOpen={documentosOpen}
          onClose={() => {
            setDocumentosOpen(false);
            setNombramientoEditable(null);
          }}
          title='Documentos del nombramiento'
          size='xl'
        >
          <DocumentosForm
            convocatoriaId={nombramientoEditable.id}
            codigoConvocatoria={nombramientoEditable.codigo}
            nombreConvocatoria={nombramientoEditable.nombramiento}
            area={nombramientoEditable.area}
            handleClose={() => {
              setDocumentosOpen(false);
              setNombramientoEditable(null);
            }}
          />
        </Modal>
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title='Confirmar Eliminación'
        message={`¿Estás seguro de eliminar el nombramiento ${nombramientoToDelete?.codigo}?`}
        confirmText='Eliminar'
        cancelText='Cancelar'
        type='error'
      />
    </>
  );
}

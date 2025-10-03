import type { ColumnDef } from "@tanstack/react-table";
import { ClipboardList, Edit, FileText, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminDataTable, type TableAction } from "../../../../core/components/common/table/AdminDataTable";
import { DocumentosForm } from "../components/DocumentosForm";
import { Modal } from "../../../../core/components/common/modal/Modal";
import { useModal } from "../../../../core/hooks/useModal";
import { ConvocatoriaForm } from "../components/ConvocatoriaForm";
import ConfirmModal from "../components/ConfirmModal";
import { useConvocatoriasQuery } from "../hooks/useConvocatoriaQueries";
import { useConvocatoriaMutations } from "../hooks/useConvocatoriaMutations";
import type { ConvocatoriaResponse } from "../services/types";

type ConvocatoriaRecord = ConvocatoriaResponse;

export default function ConvocatoriaAdmin() {
  const { isModalOpen, handleModal } = useModal();
  const [convocatoriaEditable, setConvocatoriaEditable] = useState<ConvocatoriaRecord | null>(null);
  const [documentosOpen, setDocumentosOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [convocatoriaToDelete, setConvocatoriaToDelete] = useState<ConvocatoriaRecord | null>(null);
  const { data: convocatorias, isLoading } = useConvocatoriasQuery();
  const {eliminarConvocatoria } = useConvocatoriaMutations();

  const handleDocuments = (record: ConvocatoriaRecord) => {
    setConvocatoriaEditable(record);
    setDocumentosOpen(true);
  };

  const handleNew = () => {
    setConvocatoriaEditable(null);
    handleModal();
  };

  const handleEdit = (record: ConvocatoriaRecord) => {
    setConvocatoriaEditable(record);
    handleModal();
  };

  const handleDelete = (record: ConvocatoriaRecord) => {
    setConvocatoriaToDelete(record);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (convocatoriaToDelete) {
      await eliminarConvocatoria.mutateAsync(convocatoriaToDelete.id);
      setConvocatoriaToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setConvocatoriaToDelete(null);
  };

  const columns: ColumnDef<ConvocatoriaRecord>[] = useMemo(
    () => [
      {
        accessorKey: "codigo",
        header: "Codigo",
        cell: ({ getValue }) => (
          <span className="text-sm font-medium text-slate-900">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: "convocatoria",
        header: "Convocatoria",
        cell: ({ getValue }) => (
          <span className="text-sm text-slate-700 line-clamp-2">{getValue() as string}</span>
        ),
      },
      {
        accessorKey: "area",
        header: "Area",
        cell: ({ getValue }) => (
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full">
            {getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "vacantes",
        header: "Vacantes",
        cell: ({ getValue }) => (
          <span className="text-sm font-semibold text-slate-900">{getValue() as number}</span>
        ),
      },
      {
        accessorKey: "documentos",
        header: "Documentos",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => handleDocuments(row.original)}
            aria-label={`Ver documentos de ${row.original.codigo}`}
            className="flex items-center justify-center w-10 h-10 text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
          >
            <FileText className="w-4 h-4" />
          </button>
        ),
      },
    ],
    []
  );

  const actions: TableAction<ConvocatoriaRecord>[] = [
    {
      icon: Edit,
      label: "Editar convocatoria",
      variant: "edit",
      onClick: handleEdit,
    },
    {
      icon: Trash2,
      label: "Eliminar convocatoria",
      variant: "delete",
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <AdminDataTable
        title="Gestion de Convocatorias CAS"
        description="Administra las convocatorias CAS del municipio"
        icon={ClipboardList}
        data={convocatorias || []}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        searchPlaceholder="Buscar por codigo, convocatoria o area"
        onNew={handleNew}
        newButtonText="Nueva convocatoria"
        enablePagination
        initialPageSize={5}
      />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModal}
          title={convocatoriaEditable ? "Editar Convocatoria" : "Nueva Convocatoria"}
        >
          <ConvocatoriaForm handleModal={handleModal} convocatoriaEditable={convocatoriaEditable} />
        </Modal>
      )}
      {documentosOpen && convocatoriaEditable && (
        <Modal
          isOpen={documentosOpen}
          onClose={() => {
            setDocumentosOpen(false);
            setConvocatoriaEditable(null);
          }}
          title="Documentos de la convocatoria"
          size="xl"
        >
          <DocumentosForm
            convocatoriaId={convocatoriaEditable.id}
            codigoConvocatoria={convocatoriaEditable.codigo}
            nombreConvocatoria={convocatoriaEditable.convocatoria}
            area={convocatoriaEditable.area}
            handleClose={() => {
              setDocumentosOpen(false);
              setConvocatoriaEditable(null);
            }}
          />
        </Modal>
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de eliminar la convocatoria ${convocatoriaToDelete?.codigo}?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="error"
      />
    </>
  );
}

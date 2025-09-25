import type { ColumnDef } from "@tanstack/react-table";
import { ClipboardList, Edit, FileText, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminDataTable, type TableAction } from "../../../../core/components/common/table/AdminDataTable";
import { DocumentosForm } from "../components/DocumentosForm";
import { Modal } from "../../../../core/components/common/modal/Modal";
import { useModal } from "../../../../core/hooks/useModal";
import { ConvocatoriaForm } from "../components/ConvocatoriaForm";

interface ConvocatoriaRecord {
  id: number;
  codigo: string;
  convocatoria: string;
  area: string;
  vacantes: number;
  documentos: string;
}

const mockConvocatorias: ConvocatoriaRecord[] = [
  {
    id: 1,
    codigo: "CAS-001-2025",
    convocatoria: "Especialista en Gestion Documental",
    area: "Secretaria General",
    vacantes: 2,
    documentos: "Bases_CAS_001_2025.pdf",
  },
  {
    id: 2,
    codigo: "CAS-002-2025",
    convocatoria: "Analista de Sistemas",
    area: "Tecnologias de la Informacion",
    vacantes: 1,
    documentos: "Bases_CAS_002_2025.pdf",
  },
  {
    id: 3,
    codigo: "CAS-003-2025",
    convocatoria: "Asistente Social",
    area: "Desarrollo Social",
    vacantes: 3,
    documentos: "Bases_CAS_003_2025.pdf",
  },
  {
    id: 4,
    codigo: "CAS-004-2025",
    convocatoria: "Inspector de Obras",
    area: "Infraestructura",
    vacantes: 2,
    documentos: "Bases_CAS_004_2025.pdf",
  },
  {
    id: 5,
    codigo: "CAS-005-2025",
    convocatoria: "Coordinador de Programas Juveniles",
    area: "Juventud y Deporte",
    vacantes: 1,
    documentos: "Bases_CAS_005_2025.pdf",
  },
];

export default function ConvocatoriaAdmin() {
  const { isModalOpen, handleModal } = useModal();
  const [convocatoriaEditable, setConvocatoriaEditable] = useState<ConvocatoriaRecord | null>(null);
  const [documentosOpen, setDocumentosOpen] = useState(false);

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
    console.log("Eliminar convocatoria", record.codigo);
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
        data={mockConvocatorias}
        columns={columns}
        actions={actions}
        isLoading={false}
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
    </>
  );
}

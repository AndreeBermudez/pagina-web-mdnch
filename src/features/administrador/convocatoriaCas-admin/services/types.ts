import type { DocumentoBase, DocumentoConfig, DocumentoTipo } from '../types/documento.types';

export interface ConvocatoriaBase {
  codigo: string;
  convocatoria: string;
  area: string;
  vacantes: number;
  postulacion?: string | null;
}

export interface ConvocatoriaPayload extends ConvocatoriaBase {
  documentos?: Array<{
    tipo: DocumentoTipo;
    archivo: File;
  }>;
}

export interface ConvocatoriaResponse extends ConvocatoriaBase {
  id: number;
  estado: boolean;
  responsable: string;
  fechaCreacion: string;
  fechaModificacion: string | null;
  documentos: DocumentoBase[];
}

export interface ConvocatoriaUpdatePayload extends Partial<ConvocatoriaBase> {
  estado?: boolean;
}

export type ConvocatoriaDocumentosConfigPayload = DocumentoConfig[];
export type ConvocatoriaId = number | string;

// Re-export form values type for backwards compatibility
export type ConvocatoriaFormValues = ConvocatoriaBase;

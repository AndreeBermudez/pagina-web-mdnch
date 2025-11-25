import type { DocumentoBase, DocumentoConfig, DocumentoTipo } from '../types/documento.types';

export interface NombramientoBase {
  codigo: string;
  nombramiento: string;
  area: string;
  vacantes: number;
  postulacion?: string | null;
}

export interface NombramientoPayload extends NombramientoBase {
  documentos?: Array<{
    tipo: DocumentoTipo;
    archivo: File;
  }>;
}

export interface NombramientoResponse extends NombramientoBase {
  id: number;
  estado: boolean;
  responsable: string;
  fechaCreacion: string;
  fechaModificacion: string | null;
  documentos: DocumentoBase[];
}


export interface NombramientoUpdatePayload extends Partial<NombramientoBase> {
  estado?: boolean;
  bases?: File;
  anexos?: File;
  comunicado1?: File;
  comunicado2?: File;
  evaluacionCurricular?: File;
  evaluacionEntrevista?: File;
  absolucionReclamos?: File;
  resultadosFinales?: File;
  postulacion?: string; // Para enlaces de Google Forms
}

export type NombramientoDocumentosConfigPayload = DocumentoConfig[];
export type NombramientoId = number | string;

// Re-export form values type for backwards compatibility
export type NombramientoFormValues = NombramientoBase;

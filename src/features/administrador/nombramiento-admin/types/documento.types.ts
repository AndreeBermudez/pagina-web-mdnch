export type DocumentoTipo = 
  | 'BASES' 
  | 'ANEXOS' 
  | 'POSTULACION'
  | 'COMUNICADO1' 
  | 'COMUNICADO2'
  | 'EVAL_CURRICULAR'
  | 'EVAL_ENTREVISTA'
  | 'ABSOLUCION_RECLAMOS'
  | 'RESULTADOS_FINALES';

export type DocumentoCategoria = 'documento' | 'enlace' | 'comunicado' | 'evaluacion';

export interface DocumentoBase {
  tipo: DocumentoTipo;
  titulo: string;
  descripcion: string | null;
  habilitado: boolean;
  url: string | null;
  orden: number | null;
}

export interface DocumentoUI extends Omit<DocumentoBase, 'tipo'> {
  id: string;
   tipo: DocumentoTipo;
  categoria: DocumentoCategoria;
  archivo?: File | null;
  archivoNombre?: string;
  clave?: string;
}

export interface DocumentoConfig {
  tipo: DocumentoTipo;
  habilitado: boolean;
  url?: string | null;
}

export const DOCUMENTO_TIPOS: Record<DocumentoTipo, { categoria: DocumentoCategoria; titulo: string }> = {
  BASES: { categoria: 'documento', titulo: 'Bases' },
  ANEXOS: { categoria: 'documento', titulo: 'Anexos' },
  POSTULACION: { categoria: 'enlace', titulo: 'Postulación' },
  COMUNICADO1: { categoria: 'comunicado', titulo: 'Comunicado 1' },
  COMUNICADO2: { categoria: 'comunicado', titulo: 'Comunicado 2' },
  EVAL_CURRICULAR: { categoria: 'evaluacion', titulo: 'Evaluación Curricular' },
  EVAL_ENTREVISTA: { categoria: 'evaluacion', titulo: 'Evaluación de Entrevista' },
  ABSOLUCION_RECLAMOS: { categoria: 'evaluacion', titulo: 'Absolución de Reclamos' },
  RESULTADOS_FINALES: { categoria: 'evaluacion', titulo: 'Resultados Finales' }
};

export const mapTipoToUI = (tipo: DocumentoTipo): { categoria: DocumentoCategoria; titulo: string } => 
  DOCUMENTO_TIPOS[tipo] || { categoria: 'documento', titulo: tipo };

export const mapUIToTipo = (titulo: string): DocumentoTipo => {
  const entry = Object.entries(DOCUMENTO_TIPOS).find(([_, info]) => info.titulo === titulo);
  if (!entry) throw new Error(`Título de documento inválido: ${titulo}`);
  return entry[0] as DocumentoTipo;
};

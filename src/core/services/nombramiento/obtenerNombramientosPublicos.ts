import { axiosWithoutMultipart } from '../../api/axiosInstance';
import type { ResponseBase } from '../../types/response-base';
import { handleError } from '../../utils/handleError';

// Importar tipos del admin para reutilizar
import type { NombramientoResponse } from '../../../features/administrador/nombramiento-admin/services/types';
import type { DocumentoBase } from '../../../features/administrador/nombramiento-admin/types/documento.types';

export interface NombramientoPublico {
  id: number;
  codigo: string;
  nombramiento: string;
  area: string;
  vacantes: number;
  estado: boolean;
  documentos: DocumentoPublico[];
}

export interface DocumentoPublico {
  tipo: string;
  titulo: string;
  habilitado: boolean;
  url: string | null;
  categoria: string;
}

// Mapear categorías desde los tipos del admin
const mapearCategoria = (tipo: string): string => {
  switch (tipo) {
    case 'BASES':
    case 'ANEXOS':
      return 'documento';
    case 'POSTULACION':
      return 'enlace';
    case 'COMUNICADO1':
    case 'COMUNICADO2':
      return 'comunicado';
    case 'EVAL_CURRICULAR':
    case 'EVAL_ENTREVISTA':
    case 'ABSOLUCION_RECLAMOS':
    case 'RESULTADOS_FINALES':
      return 'evaluacion';
    default:
      return 'documento';
  }
};

// Mapear títulos desde los tipos del admin
const mapearTitulo = (tipo: string): string => {
  switch (tipo) {
    case 'BASES':
      return 'Bases';
    case 'ANEXOS':
      return 'Anexos';
    case 'POSTULACION':
      return 'Postulación';
    case 'COMUNICADO1':
      return 'Comunicado 1';
    case 'COMUNICADO2':
      return 'Comunicado 2';
    case 'EVAL_CURRICULAR':
      return 'Evaluación Curricular';
    case 'EVAL_ENTREVISTA':
      return 'Evaluación de Entrevista';
    case 'ABSOLUCION_RECLAMOS':
      return 'Absolución de Reclamos';
    case 'RESULTADOS_FINALES':
      return 'Resultados Finales';
    default:
      return tipo;
  }
};

// Transformar documento del admin a formato público
const transformarDocumento = (doc: DocumentoBase): DocumentoPublico => ({
  tipo: doc.tipo,
  titulo: mapearTitulo(doc.tipo),
  habilitado: doc.habilitado,
  url: doc.url,
  categoria: mapearCategoria(doc.tipo)
});

// Transformar nombramiento del admin a formato público
const transformarNombramiento = (n: NombramientoResponse): NombramientoPublico => ({
  id: n.id,
  codigo: n.codigo,
  nombramiento: n.nombramiento,
  area: n.area,
  vacantes: n.vacantes,
  estado: n.estado,
  documentos: n.documentos.map(transformarDocumento)
});

export const obtenerNombramientosPublicos = async (): Promise<NombramientoPublico[]> => {
  console.log('🔍 Obteniendo nombramientos públicos desde API...');
  try {
    const response = await axiosWithoutMultipart.get<ResponseBase<NombramientoResponse[]>>('nombramientos');

    if (!response || response.status !== 200) {
      throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
    }

    if (!response.data?.data) {
      throw new Error('Respuesta del servidor inválida');
    }

    const nombramientosPublicos = response.data.data
      .filter(n => n.estado)
      .map(transformarNombramiento)
      .map(n => ({
        ...n,
        documentos: n.documentos.filter(doc => doc.habilitado)
      }));

    console.log('✅ Nombramientos públicos procesados:', nombramientosPublicos);
    return nombramientosPublicos;
  } catch (error: unknown) {
    console.error('❌ Error al obtener nombramientos públicos:', error);
    return handleError(error);
  }
};

import { axiosWithoutMultipart } from '../../api/axiosInstance';
import type { ResponseBase } from '../../types/response-base';
import { handleError } from '../../utils/handleError';

// Importar tipos del admin para reutilizar
import type { ConvocatoriaResponse } from '../../../features/administrador/convocatoriaCas-admin/services/types';
import type { DocumentoBase } from '../../../features/administrador/convocatoriaCas-admin/types/documento.types';

export interface ConvocatoriaPublica {
  id: number;
  codigo: string;
  convocatoria: string;
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

// Transformar convocatoria del admin a formato público
const transformarConvocatoria = (conv: ConvocatoriaResponse): ConvocatoriaPublica => ({
  id: conv.id,
  codigo: conv.codigo,
  convocatoria: conv.convocatoria,
  area: conv.area,
  vacantes: conv.vacantes,
  estado: conv.estado,
  documentos: conv.documentos.map(transformarDocumento)
});

export const obtenerConvocatoriasPublicas = async (): Promise<ConvocatoriaPublica[]> => {
  console.log('🔍 Obteniendo convocatorias públicas desde API...');
  
  try {
    // Usar el mismo endpoint que el admin pero filtrar para vista pública
    const response = await axiosWithoutMultipart.get<ResponseBase<ConvocatoriaResponse[]>>('convocatorias');

    if (!response || response.status !== 200) {
      throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
    }

    if (!response.data?.data) {
      throw new Error('Respuesta del servidor inválida');
    }

    // Transformar y filtrar convocatorias
    const convocatoriasPublicas = response.data.data
      .filter(conv => conv.estado) // Solo convocatorias activas
      .map(transformarConvocatoria)
      .map(conv => ({
        ...conv,
        // Solo incluir documentos habilitados
        documentos: conv.documentos.filter(doc => doc.habilitado)
      }));

    console.log('✅ Convocatorias públicas procesadas:', convocatoriasPublicas);
    return convocatoriasPublicas;
    
  } catch (error: unknown) {
    console.error('❌ Error al obtener convocatorias públicas:', error);
    return handleError(error);
  }
};
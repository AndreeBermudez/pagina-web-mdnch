import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { ConvocatoriaId, ConvocatoriaResponse, ConvocatoriaUpdatePayload } from './types';

export const actualizarConvocatoria = async (
  id: ConvocatoriaId,
  data: ConvocatoriaUpdatePayload,
): Promise<ConvocatoriaResponse> => {
  try {
    const formData = new FormData();

    // Campos básicos
    if (data.codigo) formData.append('codigo', data.codigo);
    if (data.convocatoria) formData.append('convocatoria', data.convocatoria);
    if (data.area) formData.append('area', data.area);
    if (data.vacantes !== undefined) formData.append('vacantes', String(data.vacantes));

    // Documentos (solo si existen)
    if (data.bases) formData.append('bases', data.bases);
    if (data.anexos) formData.append('anexos', data.anexos);
    if (data.comunicado1) formData.append('comunicado1', data.comunicado1);
    if (data.comunicado2) formData.append('comunicado2', data.comunicado2);
    if (data.evaluacionCurricular) formData.append('evaluacionCurricular', data.evaluacionCurricular);
    if (data.evaluacionEntrevista) formData.append('evaluacionEntrevista', data.evaluacionEntrevista);
    if (data.absolucionReclamos) formData.append('absolucionReclamos', data.absolucionReclamos);
    if (data.resultadosFinales) formData.append('resultadosFinales', data.resultadosFinales);
    
    // Enlaces (como string)
    if (data.postulacion) formData.append('postulacion', data.postulacion);

    const response = await axiosInstance.patch<ResponseBase<ConvocatoriaResponse>>(
      `convocatorias/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (!response || response.status !== 200) {
      throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
    }
    if (!response.data) {
      throw new Error('Respuesta del servidor invalida');
    }

    return response.data.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { NombramientoUpdatePayload, NombramientoResponse, NombramientoId } from './types';

export const actualizarNombramiento = async (
  id: NombramientoId,
  data: NombramientoUpdatePayload
): Promise<NombramientoResponse> => {
  try {
    const response = await axiosInstance.patch<ResponseBase<NombramientoResponse>>(`nombramientos/${id}`, data);

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

import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { NombramientoPayload, NombramientoResponse } from './types';

export const crearNombramiento = async (data: NombramientoPayload): Promise<NombramientoResponse> => {
  try {
    const response = await axiosInstance.post<ResponseBase<NombramientoResponse>>('nombramientos', data);

    if (!response || (response.status !== 201 && response.status !== 200)) {
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

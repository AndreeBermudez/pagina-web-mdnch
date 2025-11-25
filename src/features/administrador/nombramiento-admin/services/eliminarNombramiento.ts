import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { NombramientoId } from './types';

export const eliminarNombramiento = async (id: NombramientoId): Promise<void> => {
  try {
    const response = await axiosInstance.delete<ResponseBase<void>>(`nombramientos/${id}`);

    if (!response || response.status !== 200) {
      throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
    }

    return;
  } catch (error: unknown) {
    return handleError(error);
  }
};

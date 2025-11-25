import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { NombramientoDocumentosConfigPayload, NombramientoResponse } from './types';

export const configurarDocumentosNombramiento = async (
  id: number,
  config: NombramientoDocumentosConfigPayload
): Promise<NombramientoResponse> => {
  try {
    const response = await axiosWithoutMultipart.patch<ResponseBase<NombramientoResponse>>(`nombramientos/${id}/documentos/config`, config);

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

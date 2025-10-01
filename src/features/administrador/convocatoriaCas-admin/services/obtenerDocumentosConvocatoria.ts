import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { ConvocatoriaResponse } from './types';

export type Documento = ConvocatoriaResponse['documentos'][number];

export const obtenerDocumentosConvocatoria = async (convocatoriaId: number): Promise<Documento[]> => {
  try {
    const response = await axiosInstance.get<ResponseBase<ConvocatoriaResponse>>(
      `convocatorias/${convocatoriaId}`
    );

    const convocatoria = response.data?.data;

    if (!convocatoria) {
      throw new Error('Respuesta del servidor invalida');
    }

    return convocatoria.documentos ?? [];
  } catch (error) {
    throw handleError(error);
  }
};

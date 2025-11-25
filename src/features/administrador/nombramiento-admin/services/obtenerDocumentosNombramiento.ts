import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { DocumentoBase } from '../types/documento.types';
import type { NombramientoResponse } from './types';

export const obtenerDocumentosNombramiento = async (id: number): Promise<DocumentoBase[]> => {
  try {
    const response = await axiosInstance.get<ResponseBase<NombramientoResponse>>(
      `nombramientos/${id}`
    );

    const nombramiento = response.data?.data;

    if (!nombramiento) {
      throw new Error('Respuesta del servidor invalida');
    }

    return nombramiento.documentos ?? [];
  } catch (error) {
    throw handleError(error);
  }
};

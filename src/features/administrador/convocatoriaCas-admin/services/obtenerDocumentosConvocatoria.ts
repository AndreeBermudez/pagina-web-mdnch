import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';

export interface Documento {
  tipo: string;
  titulo: string;
  descripcion: string;
  url: string | null;
  habilitado: boolean;
  orden: number;
}

export const obtenerDocumentosConvocatoria = async (convocatoriaId: number): Promise<Documento[]> => {
  try {
    const response = await axiosInstance.get<ResponseBase<Documento[]>>(
      `convocatorias/${convocatoriaId}/documentos`
    );

    return response.data.data;
  } catch (error) {
    throw handleError(error);
  }
};
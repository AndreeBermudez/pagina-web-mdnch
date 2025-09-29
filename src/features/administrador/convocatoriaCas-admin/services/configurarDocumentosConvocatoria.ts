
import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { ConvocatoriaResponse } from './types';
import { convocatoriaDocumentoConfigSchema } from '../schemas/convocatoria.schema';
import type { z } from 'zod';

interface DocumentoUploadResponse {
  url: string;
}

export const configurarDocumentosConvocatoria = async (
  convocatoriaId: number,
  documentos: Array<z.infer<typeof convocatoriaDocumentoConfigSchema>>,
  archivo?: File
): Promise<ConvocatoriaResponse> => {
  try {
    if (archivo) {
      const formData = new FormData();
      formData.append('file', archivo);
      
      // Si hay archivo, lo subimos primero
      const uploadResponse = await axiosInstance.post<ResponseBase<DocumentoUploadResponse>>(
        `convocatorias/${convocatoriaId}/documentos/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (!uploadResponse?.data?.data?.url) {
        throw new Error('Error al subir el archivo');
      }

      // Actualizamos la configuración con la URL del archivo
      documentos = documentos.map(doc => ({
        ...doc,
        url: uploadResponse.data.data.url
      }));
    }

    // Enviamos la configuración de documentos
    const configResponse = await axiosInstance.patch<ResponseBase<ConvocatoriaResponse>>(
      `convocatorias/${convocatoriaId}/documentos/config`,
      documentos,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!configResponse || configResponse.status !== 200) {
      throw new Error(`Error en la respuesta del servidor: ${configResponse?.status || 'Sin respuesta'}`);
    }

    if (!configResponse.data) {
      throw new Error('Respuesta del servidor inválida');
    }

    return configResponse.data.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};

import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { ConvocatoriaResponse } from './types';
import { convocatoriaDocumentoConfigSchema } from '../schemas/convocatoria.schema';
import type { z } from 'zod';

type DocumentoConfigSanitizado = {
  tipo: z.infer<typeof convocatoriaDocumentoConfigSchema>['tipo'];
  habilitado: boolean;
  url: string | null;
};

export const configurarDocumentosConvocatoria = async (
  convocatoriaId: number,
  documentos: Array<z.infer<typeof convocatoriaDocumentoConfigSchema>>,
): Promise<ConvocatoriaResponse> => {
  try {
    const documentosSanitizados: DocumentoConfigSanitizado[] = documentos.map(doc => ({
      tipo: doc.tipo,
      habilitado: Boolean(doc.habilitado),
      url: doc.url ?? null,
    }));

    const configResponse = await axiosInstance.patch<ResponseBase<ConvocatoriaResponse>>(
      `convocatorias/${convocatoriaId}/documentos/config`,
      documentosSanitizados,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!configResponse || configResponse.status !== 200) {
      throw new Error(
        `Error en la respuesta del servidor: ${configResponse?.status || 'Sin respuesta'}`,
      );
    }

    if (!configResponse.data) {
      throw new Error('Respuesta del servidor invalida');
    }

    return configResponse.data.data;
  } catch (error: unknown) {
    return handleError(error);
  }
};
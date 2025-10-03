import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { ConvocatoriaId } from './types';

export const eliminarConvocatoria = async (id: ConvocatoriaId): Promise<boolean> => {
	try {
		const response = await axiosInstance.delete<ResponseBase<void>>(`convocatorias/${id}`);

		if (!response || (response.status !== 200 && response.status !== 204)) {
			throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
		}

		if (response.status === 204) {
			return true;
		}

		if (response.data && 'success' in response.data) {
			return Boolean(response.data.success);
		}

		return true;
	} catch (error: unknown) {
		return handleError(error);
	}
};


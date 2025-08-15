import { axiosInstance } from '../../../../core/api/axiosInstance';
import { handleError } from '../../../../core/utils/handleError';
import type { PaginaResponse } from '../schemas/page.schema';
import type { ResponseBase } from '../../../../core/types/response-base';

export const getPageById = async (id: number): Promise<PaginaResponse> => {
	try {
		const response = await axiosInstance.get<ResponseBase<PaginaResponse>>(`pagina/${id}`);
		if (!response || response.status !== 200) {
			throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
		}
		if (!response.data) {
			throw new Error('Respuesta del servidor inválida');
		}
		return response.data.data;
	} catch (error: unknown) {
		return handleError(error);
	}
};

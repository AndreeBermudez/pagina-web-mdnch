import { axiosInstance } from '../../../../core/api/axiosInstance';
import { handleError } from '../../../../core/utils/handleError';
import type { PaginaRequest, PaginaResponse } from '../schemas/page.schema';
import type { ResponseBase } from '../../../../core/types/response-base';

export const createPage = async (data: PaginaRequest): Promise<PaginaResponse> => {
	try {
		const formData = new FormData();
		formData.append('titulo', data.titulo);
		formData.append('slug', data.slug);
		formData.append('contenido', data.contenido);
		if (data.imagen) formData.append('imagen', data.imagen);

		const response = await axiosInstance.post<ResponseBase<PaginaResponse>>('pagina', formData);
		if (!response || response.status !== 201) {
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

import { axiosInstance } from '../../../../core/api/axiosInstance';
import { handleError } from '../../../../core/utils/handleError';
import type { PaginaRequest, PaginaResponse } from '../schemas/page.schema';
import type { ResponseBase } from '../../../../core/types/response-base';

export const updatePage = async (id: number, data: Partial<PaginaRequest>): Promise<PaginaResponse> => {
	try {
		const formData = new FormData();
		if (data.titulo) formData.append('titulo', data.titulo);
		if (data.slug) formData.append('slug', data.slug);
		if (data.contenido) formData.append('contenido', data.contenido);
		if (data.imagen) formData.append('imagen', data.imagen);

		const response = await axiosInstance.patch<ResponseBase<PaginaResponse>>(`pagina/${id}`, formData);
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

import { axiosInstance } from '../../api/axiosInstance';
import type { NoticiaRequest, NoticiaResponse } from './noticia.interface';
import { handleError } from '../../utils/handleError';

export const actualizarNoticia = async (id: number, data: NoticiaRequest): Promise<NoticiaResponse> => {
	try {
		const response = await axiosInstance.put<NoticiaResponse>(`noticias/${id}`, data);
		console.log(response.data);
		if (!response || response.status !== 200) {
			throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
		}
		if (!response.data) {
			throw new Error('Respuesta del servidor inválida');
		}
		return response.data;
	} catch (error: unknown) {
		return handleError(error);
	}
};

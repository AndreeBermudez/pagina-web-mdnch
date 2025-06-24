import { axiosInstance } from '../../api/axiosInstance';
import type { NoticiaResponse } from './noticia.interface';
import { handleError } from '../../utils/handleError';

export const listarNoticias = async (): Promise<NoticiaResponse[]> => {
	try {
		const response = await axiosInstance.get<NoticiaResponse[]>('noticias');
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

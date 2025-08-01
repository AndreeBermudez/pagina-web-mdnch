import { axiosInstance } from '../../../../core/api/axiosInstance';
import { handleError } from '../../../../core/utils/handleError';
import type { NoticiaResponse } from '../schemas/noticia.schema';
import type { ResponseBase } from './noticia.interface';

export const listarNoticias = async (): Promise<NoticiaResponse[]> => {
	try {
		const response = await axiosInstance.get<ResponseBase<NoticiaResponse[]>>('noticias');
		console.log(response.data);
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

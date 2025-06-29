import { axiosInstance } from '../../api/axiosInstance';
import type { NoticiaRequest, NoticiaResponse, ResponseBase } from './noticia.interface';
import { handleError } from '../../utils/handleError';

export const actualizarNoticia = async (id: number, data: NoticiaRequest): Promise<NoticiaResponse> => {
	try {
		const formData = new FormData();
		formData.append('titulo', data.titulo);
		formData.append('categoria', data.categoria);
		formData.append('descripcion', data.descripcion);
		formData.append('fechaManual', data.fechaManual);
		formData.append('imagen', data.imagen);
		const response = await axiosInstance.put<ResponseBase<NoticiaResponse>>(`noticias/${id}`, formData);
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

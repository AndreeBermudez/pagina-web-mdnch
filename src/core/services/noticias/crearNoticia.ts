import { axiosInstance } from '../../api/axiosInstance';
import { handleError } from '../../utils/handleError';
import type { NoticiaRequest, Evento, ResponseBase } from './noticia.interface';

export const crearNoticia = async (data: NoticiaRequest): Promise<Evento> => {
	try {
		const formData = new FormData();
		formData.append('titulo', data.titulo);
		formData.append('categoria', data.categoria);
		formData.append('descripcion', data.descripcion);
		formData.append('fechaManual', data.fechaManual);
		formData.append('imagen', data.imagen);

		const response = await axiosInstance.post<ResponseBase<Evento>>('noticias/crear', formData);
		console.log(response.data);
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

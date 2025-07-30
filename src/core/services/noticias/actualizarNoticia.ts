import { axiosInstance } from '../../api/axiosInstance';
import type { NoticiaRequest, Evento, ResponseBase } from './noticia.interface';
import { handleError } from '../../utils/handleError';

export const actualizarNoticia = async (id: number, data: NoticiaRequest): Promise<Evento> => {
	try {
		const formData = new FormData();
		formData.append('titulo', data.titulo);
		formData.append('categoria', data.categoria);
		formData.append('descripcion', data.descripcion);
		formData.append('fechaManual', data.fechaManual);
		if (data.imagen) {
			formData.append('imagen', data.imagen);
		}

		const response = await axiosInstance.put<ResponseBase<Evento>>(`noticias/${id}`, formData);
		console.log(response.data);
		if (!response || response.status !== 200) {
			throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
			console.error('Error en la respuesta del servidor:', response);
		}
		if (!response.data) {
			throw new Error('Respuesta del servidor inválida');
			console.error('Respuesta del servidor inválida:', response.data);
		}
		return response.data.data;
	} catch (error: unknown) {
		return handleError(error);
	}
};

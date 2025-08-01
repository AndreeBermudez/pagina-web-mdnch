import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from './noticia.interface';
import { handleError } from '../../../../core/utils/handleError';
import type { NoticiaRequest, NoticiaResponse } from '../schemas/noticia.schema';

export const actualizarNoticia = async (id: number, data: Partial<NoticiaRequest>): Promise<NoticiaResponse> => {
	try {
		const formData = new FormData();
		if(data.titulo) formData.append('titulo', data.titulo);
		if(data.categoria) formData.append('categoria', data.categoria);
		if(data.descripcion) formData.append('descripcion', data.descripcion);
		if(data.fechaManual) formData.append('fechaManual', data.fechaManual);
		if (data.imagen) formData.append('imagen', data.imagen);

		const response = await axiosInstance.patch<ResponseBase<NoticiaResponse>>(`noticiasedit/${id}`, formData);
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

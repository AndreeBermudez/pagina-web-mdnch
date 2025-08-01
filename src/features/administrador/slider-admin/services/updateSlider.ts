import { axiosInstance } from '../../../../core/api/axiosInstance';
import { handleError } from '../../../../core/utils/handleError';
import type { ResponseBase } from '../../noticias-admin/services/noticia.interface';
import type { SliderRequest, SliderResponse } from '../schemas/slider.schema';

export const updateSlider = async (data: Partial<SliderRequest>, id: number): Promise<SliderResponse> => {
	try {
		const formData = new FormData();
		if (data.titulo) {
			formData.append('titulo[0]', data.titulo[0]);
			formData.append('titulo[1]', data.titulo[1]);
			formData.append('titulo[2]', data.titulo[2]);
		}
		if (data.descripcion) formData.append('descripcion', data.descripcion);
		if (data.direccionImagen) formData.append('direccionImagen', data.direccionImagen);
		if (data.activo) formData.append('activo', data.activo);

		const response = await axiosInstance.patch<ResponseBase<SliderResponse>>(`bannersedit/${id}`, formData);
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

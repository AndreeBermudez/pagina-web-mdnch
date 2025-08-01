import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import { handleError } from '../../../../core/utils/handleError';
import type { ResponseBase } from '../../noticias-admin/services/noticia.interface';
import type { SliderResponse } from '../schemas/slider.schema';

export const getSliders = async (): Promise<SliderResponse[]> => {
	try {
		const response = await axiosWithoutMultipart.get<ResponseBase<SliderResponse[]>>('banners');
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

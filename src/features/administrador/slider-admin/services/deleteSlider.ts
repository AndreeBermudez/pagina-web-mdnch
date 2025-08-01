import { axiosInstance } from '../../../../core/api/axiosInstance';
import { handleError } from '../../../../core/utils/handleError';
import type { ResponseBase } from '../../noticias-admin/services/noticia.interface';

export const deleteSlider = async (id: number): Promise<string> => {
	try {
		const response = await axiosInstance.delete<ResponseBase<null>>(`banners/${id}`);
		console.log(response.data);
		if (!response || response.status !== 200) {
			throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
		}
		if (!response.data) {
			throw new Error('Respuesta del servidor inválida');
		}
		return response.data.message;
	} catch (error: unknown) {
		return handleError(error);
	}
};

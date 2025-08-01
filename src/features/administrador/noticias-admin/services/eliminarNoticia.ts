import { axiosInstance } from '../../../../core/api/axiosInstance';
import { handleError } from '../../../../core/utils/handleError';
import type { ResponseBase } from './noticia.interface';

export const eliminarNoticia = async (id: number): Promise<boolean> => {
	try {
		const response = await axiosInstance.delete<ResponseBase<void>>(`noticias/${id}`);
		console.log(response.data);
		if (!response || response.status !== 200) {
			throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
		}
		if (response.data && response.data.success) {
			return true;
		}
		throw new Error('Error al eliminar la noticia');
	} catch (error: unknown) {
		return handleError(error);
	}
};

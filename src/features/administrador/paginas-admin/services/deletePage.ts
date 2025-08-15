import { axiosInstance } from '../../../../core/api/axiosInstance';
import { handleError } from '../../../../core/utils/handleError';
import type { ResponseBase } from '../../../../core/types/response-base';

export const deletePage = async (id: number): Promise<boolean> => {
	try {
		const response = await axiosInstance.delete<ResponseBase<null>>(`pagina/${id}`);
		if (!response || response.status !== 200) {
			throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
		}
		return true;
	} catch (error: unknown) {
		handleError(error);
		return false;
	}
};

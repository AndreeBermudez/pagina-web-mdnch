import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';

export const deleteMenu = async (id: number): Promise<boolean> => {
	try {
		const response = await axiosWithoutMultipart.delete<ResponseBase<null>>(`menu/${id}`);
		if (!response || response.status !== 200) {
			throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
		}
		return true;
	} catch (error: unknown) {
		handleError(error);
		return false;
	}
};

import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { MenuRequest, MenuResponse } from '../schemas/menu.schema';

export const createMenu = async (menu: MenuRequest): Promise<MenuResponse> => {
	try {
		const response = await axiosWithoutMultipart.post<ResponseBase<MenuResponse>>('menu', menu);
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

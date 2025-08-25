import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { ResponseBase } from '../../../../core/types/response-base';
import { handleError } from '../../../../core/utils/handleError';
import type { MenuResponse, MenuUpdate } from '../schemas/menu.schema';

export const updateMenu = async (id: number, menu: MenuUpdate): Promise<MenuResponse> => {
	try {
		const response = await axiosWithoutMultipart.patch<ResponseBase<MenuResponse>>(`menu/${id}`, menu);
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

import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { PopupResponse } from '../schemas/popup.schema';

interface ApiResponse {
	success: boolean;
	message: string;
	data: PopupResponse;
}

export const obtenerPopupPorId = async (id: number): Promise<PopupResponse | null> => {
	try {
		const response = await axiosWithoutMultipart.get<ApiResponse>(`popup/${id}`);
		if (response.data.success && response.data.data) {
			return response.data.data;
		} else {
			console.warn('API retornó success: false o data vacío:', response.data);
			return null;
		}
	} catch (error) {
		console.error('Error al obtener popup por ID:', error);
		return null;
	}
};

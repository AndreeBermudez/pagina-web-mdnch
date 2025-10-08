import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { PopupResponse } from '../schemas/popup.schema';

interface ApiResponse {
	success: boolean;
	message: string;
	data: PopupResponse[];
}

export const obtenerPopup = async (): Promise<PopupResponse[]> => {
	try {
		const response = await axiosWithoutMultipart.get<ApiResponse>('popups');
		if (response.data.success && Array.isArray(response.data.data)) {
			return response.data.data;
		} else {
			console.warn('API retornó success: false o data no es un array:', response.data);
			return [];
		}
	} catch (error) {
		console.error('Error al obtener popups:', error);
		return [];
	}
};

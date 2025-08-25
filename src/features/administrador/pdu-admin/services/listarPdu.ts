import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { Pdu } from '../schemas/pdu.schema';

interface ApiResponse {
	success: boolean;
	message: string;
	data: Pdu[];
}

export const listarPdu = async (): Promise<Pdu[]> => {
	try {
		const response = await axiosWithoutMultipart.get<ApiResponse>('pdu/listar');
		if (response.data.success && Array.isArray(response.data.data)) {
			return response.data.data;
		} else {
			console.warn('API retornó success: false o data no es un array:', response.data);
			return [];
		}
	} catch (error) {
		console.error('Error al listar PDUs:', error);
		return [];
	}
};

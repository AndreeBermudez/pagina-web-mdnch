import { axiosWithoutMultipart } from '../../../../../core/api/axiosInstance';
import type { TransparenciaResponse } from '../../schemas/transparencia.schema';

export const obtenerTransparencias = async (): Promise<TransparenciaResponse[]> => {
	try {
		const response = await axiosWithoutMultipart.get('transparencia/listar');
		if (Array.isArray(response.data)) {
			return response.data;
		}
		if (response.data && Array.isArray(response.data.data)) {
			return response.data.data;
		}
		return [];
	} catch (error) {
		console.error('Error al obtener transparencias:', error);
		return [];
	}
};

import { axiosWithoutMultipart } from '../../../../../core/api/axiosInstance';
import type { PeriodoResponse } from '../../schemas/transparencia.schema';

export const obtenerPeriodos = async (): Promise<PeriodoResponse[]> => {
	try {
		const response = await axiosWithoutMultipart.get('periodo/listar');
		if (Array.isArray(response.data)) {
			return response.data;
		}
		if (response.data && Array.isArray(response.data.data)) {
			return response.data.data;
		}
		return [];
	} catch (error) {
		console.error('Error al obtener períodos:', error);
		return [];
	}
};

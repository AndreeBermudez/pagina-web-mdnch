import { axiosWithoutMultipart } from '../../../../../core/api/axiosInstance';
import type { PeriodoResponse } from '../../schemas/transparencia.schema';

export const obtenerPeriodos = async (id?: number): Promise<PeriodoResponse[]> => {
	try {
		if (id) {
			// Si se proporciona un ID, obtener un periodo específico
			const response = await axiosWithoutMultipart.get(`periodo/${id}`);
			if (response.data) {
				return [response.data];
			}
			return [];
		} else {
			// Si no hay ID, obtener todos los periodos
			const response = await axiosWithoutMultipart.get('periodo/listar');
			if (Array.isArray(response.data)) {
				return response.data;
			}
			if (response.data && Array.isArray(response.data.data)) {
				return response.data.data;
			}
			return [];
		}
	} catch (error) {
		console.error('Error al obtener periodos:', error);
		return [];
	}
};

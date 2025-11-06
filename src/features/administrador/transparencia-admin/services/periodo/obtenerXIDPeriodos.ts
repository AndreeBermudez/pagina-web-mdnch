import { axiosWithoutMultipart } from '../../../../../core/api/axiosInstance';
import type { PeriodoResponse } from '../../schemas/transparencia.schema';

export const obtenerPeriodoPorId = async (id: number): Promise<PeriodoResponse | null> => {
	try {
		const response = await axiosWithoutMultipart.get(`periodo/${id}`);
		if (response.data) {
			return response.data.data || response.data;
		}
		return null;
	} catch (error) {
		console.error('Error al obtener período por ID:', error);
		return null;
	}
};

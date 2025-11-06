import { axiosWithoutMultipart } from '../../../../../core/api/axiosInstance';
import type { TransparenciaResponse } from '../../schemas/transparencia.schema';

export const obtenerTransparenciaPorId = async (id: number): Promise<TransparenciaResponse | null> => {
	try {
		const response = await axiosWithoutMultipart.get(`transparencia/${id}`);
		if (response.data) {
			return response.data.data || response.data;
		}
		return null;
	} catch (error) {
		console.error('Error al obtener transparencia por ID:', error);
		return null;
	}
};

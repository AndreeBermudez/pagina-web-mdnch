import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { Alcalde } from '../schemas/alcalde.schema';

export const obtenerAlcaldes = async (): Promise<Alcalde[]> => {
	try {
		const response = await axiosWithoutMultipart.get('alcaldes');
		return response.data.data || [];
	} catch (error) {
		console.error('Error al obtener alcaldes:', error);
		return [];
	}
};

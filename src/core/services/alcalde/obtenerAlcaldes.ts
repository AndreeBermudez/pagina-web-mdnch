import { axiosWithoutMultipart } from '../../api/axiosInstance';
import type { Alcalde } from './alcalde.interface';

export const obtenerAlcaldes = async (): Promise<Alcalde[]> => {
	try {
		const response = await axiosWithoutMultipart.get('alcaldes');
		return response.data.data || [];
	} catch (error) {
		console.error('Error al obtener alcaldes:', error);
		return [];
	}
};

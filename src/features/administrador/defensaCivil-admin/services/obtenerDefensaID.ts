import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { DefensaCivil } from './defensa.interface';

export const obtenerDefensaCivilPorId = async (defensaCivilId: number): Promise<DefensaCivil | null> => {
	try {
		const response = await axiosWithoutMultipart.get(`defensaCivil/${defensaCivilId}`);
		
		console.log('Defensa Civil obtenida exitosamente:', response.data);
		return response.data;
	} catch (error: any) {
		console.error('Error al obtener defensa civil por ID:', error);
		console.error('Detalles del error:', error.response?.data);
		return null;
	}
};
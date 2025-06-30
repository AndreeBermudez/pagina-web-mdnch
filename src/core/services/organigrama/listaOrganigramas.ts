import { axiosWithoutMultipart } from '../../api/axiosInstance';
import type { Organigrama } from './organigrama.interface';

export const listaOrganigramas = async (): Promise<Organigrama[]> => {
	try {
		const response = await axiosWithoutMultipart.get('organigrama');
		return response.data.data || [];
	} catch (error) {
		console.error('Error al obtener organigramas:', error);
		return [];
	}
};

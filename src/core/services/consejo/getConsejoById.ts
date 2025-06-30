import { axiosWithoutMultipart } from '../../api/axiosInstance';
import type { Consejo } from './consejo.interface';

export const getConsejoById = async (id: number): Promise<Consejo | null> => {
	try {
		const response = await axiosWithoutMultipart.get(`consejo-muni/${id}`);
		return response.data.data;
	} catch (error) {
		console.error('Error al obtener consejo:', error);
		return null;
	}
};

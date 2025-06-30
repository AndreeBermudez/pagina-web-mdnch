import { axiosWithoutMultipart } from '../../api/axiosInstance';
import type { Consejo } from './consejo.interface';

export const getAllConsejos = async (): Promise<Consejo[]> => {
	try {
		const response = await axiosWithoutMultipart.get('consejo-muni');
		return response.data.data || [];
	} catch (err) {
		console.error('Error al obtener todos los consejos:', err);
		return [];
	}
};

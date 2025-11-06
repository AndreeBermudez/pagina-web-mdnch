import { axiosWithoutMultipart } from '../../../../../core/api/axiosInstance';
import type { TransparenciaRequest } from '../../schemas/transparencia.schema';

export const crearTransparencia = async (data: TransparenciaRequest): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.post('transparencia/crear', data);
		return true;
	} catch (error) {
		console.error('Error al crear transparencia:', error);
		return false;
	}
};

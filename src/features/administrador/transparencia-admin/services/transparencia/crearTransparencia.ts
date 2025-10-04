import { axiosInstance, axiosWithoutMultipart } from '../../../../../core/api/axiosInstance';
import type { TransparenciaRequest } from '../../schemas/transparencia.schema';

export const crearTransparencia = async (data: FormData | TransparenciaRequest): Promise<boolean> => {
	try {
		if (data instanceof FormData) {
			await axiosInstance.post('transparencia/crear', data);
		} else {
			await axiosWithoutMultipart.post('transparencia/crear', data);
		}
		return true;
	} catch (error) {
		console.error('Error al crear transparencia:', error);
		return false;
	}
};

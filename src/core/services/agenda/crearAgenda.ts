import { axiosWithoutMultipart } from '../../api/axiosInstance';
import type { AgendaPayload } from './agenda.interface';

export const crearAgenda = async (data: AgendaPayload): Promise<boolean> => {
	try {
		await  axiosWithoutMultipart.post('agenda/registrar', data);
		return true;
	} catch (error) {
		console.error('Error al registrar agenda:', error);
		return false;
	}
};
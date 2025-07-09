import { axiosWithoutMultipart } from '../../api/axiosInstance';
import type { AgendaPayload } from './agenda.interface';

export const obtenerAgendas = async (): Promise<AgendaPayload[]> => {
	try {
		const response = await axiosWithoutMultipart.get('/agenda');
		return response.data.data; 
	} catch (error) {
		console.error('Error al obtener agendas:', error);
		return [];
	}
};

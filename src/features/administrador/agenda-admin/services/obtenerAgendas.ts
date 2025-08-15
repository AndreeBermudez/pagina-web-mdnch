import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { AgendaResponse } from '../schemas/agenda.schema';

export const obtenerAgendas = async (): Promise<AgendaResponse[]> => {
	try {
		const response = await axiosWithoutMultipart.get('/agenda');
		return response.data.data;
	} catch (error) {
		console.error('Error al obtener agendas:', error);
		return [];
	}
};

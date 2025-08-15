import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { AgendaRequest } from '../schemas/agenda.schema';

export const editarAgenda = async (id: number, data: Partial<AgendaRequest>): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.put(`agenda/${id}`, data);
		return true;
	} catch (error) {
		console.error('Error al editar agenda:', error);
		return false;
	}
};

import { axiosWithoutMultipart } from '../../api/axiosInstance';
import type { AgendaPayload } from './agenda.interface';

export const editarAgenda = async (
	id: number,
	data: Omit<AgendaPayload, 'agendaId' | 'fechaCreacion'>
): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.put(`agenda/${id}`, data);
		return true;
	} catch (error) {
		console.error('Error al editar agenda:', error);
		return false;
	}
};

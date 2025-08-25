import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { PduEditForm } from '../schemas/pdu.schema';

export const editarPdu = async (pduId: number, data: Partial<PduEditForm>): Promise<boolean> => {
	const formData = new FormData();
	if (data.titulo) formData.append('titulo', data.titulo);
	if (data.descripcion) formData.append('descripcion', data.descripcion);
	if (data.linkDocumento) formData.append('linkDocumento', data.linkDocumento);
	try {
		await axiosInstance.put(`pdu/${pduId}`, formData);
		return true;
	} catch (error) {
		console.error('Error al actualizar PDU:', error);
		return false;
	}
};

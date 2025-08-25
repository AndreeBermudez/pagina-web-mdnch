import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { PduRequest } from '../schemas/pdu.schema';

export const crearPdu = async (data: PduRequest): Promise<boolean> => {
	const formData = new FormData();
	formData.append('titulo', data.titulo);
	formData.append('descripcion', data.descripcion);
	if (data.linkDocumento) formData.append('linkDocumento', data.linkDocumento);
	try {
		await axiosInstance.post('pdu/crear', formData);
		return true;
	} catch (error) {
		console.error('Error al crear PDU:', error);
		return false;
	}
};

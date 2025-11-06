import { axiosWithoutMultipart } from '../../../../../core/api/axiosInstance';
import type { TransparenciaRequest } from '../../schemas/transparencia.schema';

export const editarTransparencia = async (
	id: number,
	data: Partial<TransparenciaRequest>
): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.put(`transparencia/${id}`, data);
		return true;
	} catch (error) {
		console.error('Error al editar transparencia:', error);
		return false;
	}
};

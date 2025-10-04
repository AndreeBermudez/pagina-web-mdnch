import { axiosInstance, axiosWithoutMultipart } from '../../../../../core/api/axiosInstance';
import type { TransparenciaRequest } from '../../schemas/transparencia.schema';

export const editarTransparencia = async (
	id: number,
	data: FormData | Partial<TransparenciaRequest>
): Promise<boolean> => {
	try {
		if (data instanceof FormData) {
			await axiosInstance.patch(`transparenciaedit/${id}`, data);
		} else {
			await axiosWithoutMultipart.patch(`transparenciaedit/${id}`, data);
		}
		return true;
	} catch (error) {
		console.error('Error al editar transparencia:', error);
		return false;
	}
};

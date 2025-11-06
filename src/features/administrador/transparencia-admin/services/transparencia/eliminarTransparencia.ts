import { axiosWithoutMultipart } from '../../../../../core/api/axiosInstance';

export const eliminarTransparencia = async (id: number): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.delete(`transparencia/${id}`);
		return true;
	} catch (error) {
		console.error('Error al eliminar transparencia:', error);
		return false;
	}
};

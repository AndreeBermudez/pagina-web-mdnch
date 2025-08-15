import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';

export const eliminarAgenda = async (id: number): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.delete(`agenda/${id}`);
		return true;
	} catch (error) {
		console.error('Error al eliminar agenda:', error);
		return false;
	}
};

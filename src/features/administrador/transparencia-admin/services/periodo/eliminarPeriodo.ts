import { axiosWithoutMultipart } from '../../../../../core/api/axiosInstance';

export const eliminarPeriodo = async (id: number): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.delete(`periodo/${id}`);
		return true;
	} catch (error) {
		console.error('Error al eliminar periodo:', error);
		return false;
	}
};

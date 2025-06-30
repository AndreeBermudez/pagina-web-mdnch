import { axiosWithoutMultipart } from '../../api/axiosInstance';

export const eliminarAlcalde = async (id: number): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.delete(`alcaldes/${id}`);
		return true;
	} catch (error) {
		console.error('Error al eliminar alcalde:', error);
		return false;
	}
};

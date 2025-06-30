import { axiosInstance } from '../../api/axiosInstance';

export const editarAlcalde = async (id: number, formData: FormData): Promise<boolean> => {
	try {
		await axiosInstance.patch(`alcaldeedit/${id}`, formData);
		return true;
	} catch (error) {
		console.error('Error al editar alcalde:', error);
		return false;
	}
};

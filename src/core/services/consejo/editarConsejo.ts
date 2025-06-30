import { axiosInstance } from '../../api/axiosInstance';

export const editarConsejo = async (id: number, formData: FormData): Promise<boolean> => {
	try {
		await axiosInstance.put(`consejo-muni/${id}`, formData);
		return true;
	} catch (err) {
		console.error('Error al editar consejo:', err);
		return false;
	}
};

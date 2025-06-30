import { axiosInstance } from '../../api/axiosInstance';

export const actualizarOrganigrama = async (id: number, formData: FormData): Promise<boolean> => {
	try {
		await axiosInstance.put(`organigrama/${id}`, formData);
		return true;
	} catch (error) {
		console.error('Error al actualizar organigrama:', error);
		return false;
	}
};

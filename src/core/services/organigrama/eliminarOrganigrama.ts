import { axiosWithoutMultipart } from '../../api/axiosInstance';

export const eliminarOrganigrama = async (id: number): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.delete(`organigrama/${id}`);
		return true;
	} catch (error) {
		console.error('Error al eliminar organigrama:', error);
		return false;
	}
};

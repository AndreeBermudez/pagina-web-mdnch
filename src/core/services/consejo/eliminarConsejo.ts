import { axiosWithoutMultipart } from '../../api/axiosInstance';

export const eliminarConsejo = async (id: number): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.delete(`consejo-muni/${id}`);
		return true;
	} catch (error) {
		console.error('Error eliminando consejo:', error);
		return false;
	}
};

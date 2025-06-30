import { axiosInstance } from '../../api/axiosInstance';

export const crearAlcalde = async (formData: FormData): Promise<boolean> => {
	try {
		await axiosInstance.post('alcaldes/crear', formData);
		return true;
	} catch (error) {
		console.error('Error al crear alcalde:', error);
		return false;
	}
};

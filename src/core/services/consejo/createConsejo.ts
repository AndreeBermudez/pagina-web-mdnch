import { axiosInstance } from '../../api/axiosInstance';

export const createConsejo = async (formData: FormData): Promise<boolean> => {
	try {
		await axiosInstance.post('consejo-muni/registrar', formData);
		return true;
	} catch (err) {
		console.error('Error al crear consejo:', err);
		return false;
	}
};

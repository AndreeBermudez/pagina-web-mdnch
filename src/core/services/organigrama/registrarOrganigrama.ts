import { axiosInstance } from '../../api/axiosInstance';

export const registrarOrganigrama = async (formData: FormData): Promise<boolean> => {
	try {
		await axiosInstance.post('organigrama/registrar', formData);
		return true;
	} catch (error) {
		console.error('Error al registrar organigrama:', error);
		return false;
	}
};

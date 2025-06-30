import { axiosInstance } from '../../api/axiosInstance';

export const createFuncionario = async (formData: FormData): Promise<boolean> => {
	try {
		await axiosInstance.post('funcionarios/crear', formData);
		return true;
	} catch (err) {
		console.error('Error al crear funcionario:', err);
		return false;
	}
};

import { axiosInstance } from '../../api/axiosInstance';

export const actualizarFuncionario = async (id: number, formData: FormData): Promise<boolean> => {
	try {
		await axiosInstance.put(`funcionarios/${id}`, formData);
		return true;
	} catch (err) {
		console.error('Error al actualizar funcionario:', err);
		return false;
	}
};

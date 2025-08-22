import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';

export const deleteFuncionario = async (id: number): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.delete(`funcionarios/${id}`);
		return true;
	} catch (err) {
		console.error('Error al eliminar funcionario:', err);
		return false;
	}
};

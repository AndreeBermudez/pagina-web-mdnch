import { axiosWithoutMultipart } from '../../api/axiosInstance';
import type { Funcionario } from './funcionario.interface';

export const getFuncionarios = async (): Promise<Funcionario[]> => {
	try {
		const response = await axiosWithoutMultipart.get('funcionarios');
		return Array.isArray(response.data.data) ? response.data.data : [];
	} catch (error) {
		console.error('Error al obtener funcionarios:', error);
		return [];
	}
};

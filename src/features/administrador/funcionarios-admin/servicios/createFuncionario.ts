import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { FuncionarioRequest } from '../schemas/funcionario.schema';

export const createFuncionario = async (data: FuncionarioRequest): Promise<boolean> => {
	const formData = new FormData();
	formData.append('nombre', data.nombre);
	formData.append('apellido', data.apellido);
	formData.append('cargo', data.cargo);
	formData.append('contacto', data.contacto);
	formData.append('direccionImagen', data.direccionImagen);

	try {
		await axiosInstance.post('funcionarios/crear', formData);
		return true;
	} catch (err) {
		console.error('Error al crear funcionario:', err);
		return false;
	}
};

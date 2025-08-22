import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { FuncionarioEdit } from '../schemas/funcionario.schema';

export const actualizarFuncionario = async (id: number, data: Partial<FuncionarioEdit>): Promise<boolean> => {
	const formData = new FormData();
	if (data.nombre) formData.append('nombre', data.nombre);
	if (data.apellido) formData.append('apellido', data.apellido);
	if (data.cargo) formData.append('cargo', data.cargo);
	if (data.contacto) formData.append('contacto', data.contacto);
	if (data.direccionImagen) formData.append('direccionImagen', data.direccionImagen);
	try {
		await axiosInstance.put(`funcionarios/${id}`, formData);
		return true;
	} catch (err) {
		console.error('Error al actualizar funcionario:', err);
		return false;
	}
};

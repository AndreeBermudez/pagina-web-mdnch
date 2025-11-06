import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { UsuarioResponse } from '../schemas/usuario.schema';

interface ListarUsuariosResponse {
	success: boolean;
	message: string;
	data: UsuarioResponse[];
}

export const listarUsuarios = async (): Promise<UsuarioResponse[]> => {
	try {
		const response = await axiosWithoutMultipart.get<ListarUsuariosResponse>('usuarios');
		return response.data.data;
	} catch (error) {
		console.error('Error al listar usuarios:', error);
		throw error;
	}
};

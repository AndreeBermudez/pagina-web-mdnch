import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { UsuarioCreateRequest, UsuarioResponse } from '../schemas/usuario.schema';

interface CrearUsuarioResponse {
	success: boolean;
	message: string;
	data: UsuarioResponse;
}

export const crearUsuario = async (data: UsuarioCreateRequest): Promise<UsuarioResponse> => {
	try {
		const response = await axiosWithoutMultipart.post<CrearUsuarioResponse>('usuario/crear', data);
		return response.data.data;
	} catch (error) {
		console.error('Error al crear usuario:', error);
		throw error;
	}
};

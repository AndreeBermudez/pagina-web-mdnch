import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';

export interface RolResponse {
	nombre: string;
}

export interface ListarRolesResponse {
	success: boolean;
	message: string;
	data: RolResponse[];
}

export const listarRoles = async (): Promise<RolResponse[]> => {
	try {
		const response = await axiosWithoutMultipart.get<ListarRolesResponse>('roles');
		return response.data.data;
	} catch (error) {
		console.error('Error al obtener roles:', error);
		throw error;
	}
};

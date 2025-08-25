import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { TurismoRequest } from '../schemas/turismo.schema';

export const crearTurismo = async (data: TurismoRequest): Promise<boolean> => {
	const formData = new FormData();
	formData.append('titulo', data.titulo);
	formData.append('descripcion', data.descripcion);
	formData.append('lugar', data.lugar);
	formData.append('ubicacion', data.ubicacion);
	if (data.direccionImagen) {
		formData.append('direccionImagen', data.direccionImagen);
	}
	try {
		await axiosInstance.post('turismo/crear', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return true;
	} catch (error) {
		console.error('Error al crear Turismo:', error);
		return false;
	}
};

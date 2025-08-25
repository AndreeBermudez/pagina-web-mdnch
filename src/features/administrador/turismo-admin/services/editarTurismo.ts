import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { TurismoEditForm } from '../schemas/turismo.schema';

export const editarTurismo = async (turismoId: number, data: Partial<TurismoEditForm>): Promise<boolean> => {
	const formData = new FormData();
	if (data.titulo) formData.append('titulo', data.titulo);
	if (data.descripcion) formData.append('descripcion', data.descripcion);
	if (data.lugar) formData.append('lugar', data.lugar);
	if (data.ubicacion) formData.append('ubicacion', data.ubicacion);
	if (data.direccionImagen) {
		formData.append('direccionImagen', data.direccionImagen);
	}
	try {
		await axiosInstance.put(`turismo/${turismoId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return true;
	} catch (error) {
		console.error('Error al actualizar Turismo:', error);
		return false;
	}
};

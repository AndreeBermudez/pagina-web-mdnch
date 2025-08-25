import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { AlcaldeRequest } from '../schemas/alcalde.schema';

export const crearAlcalde = async (data: AlcaldeRequest): Promise<boolean> => {
	const formData = new FormData();
	formData.append('nombre', data.nombre);
	formData.append('apellido', data.apellido);
	formData.append('descripcion', data.descripcion);
	formData.append('numeroObras', data.numeroObras.toString());
	formData.append('presupuesto', data.presupuesto.toString());
	formData.append('aprobacionCiudadana', data.aprobacionCiudadana);
	formData.append('atencionCiudadana', data.atencionCiudadana);
	formData.append('periodo', data.periodo);
	formData.append('experiencia', data.experiencia);
	formData.append('reconocimientos', data.reconocimientos);
	formData.append('compromiso', data.compromiso);
	if (data.direccionImagen) {
		formData.append('direccionImagen', data.direccionImagen);
	}
	try {
		await axiosInstance.post('alcaldes/crear', formData);
		return true;
	} catch (error) {
		console.error('Error al crear alcalde:', error);
		return false;
	}
};

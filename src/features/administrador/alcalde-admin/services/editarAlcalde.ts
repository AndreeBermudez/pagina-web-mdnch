import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { AlcaldeEditForm } from '../schemas/alcalde.schema';

export const editarAlcalde = async (id: number, data: Partial<AlcaldeEditForm>): Promise<boolean> => {
	const formData = new FormData();
	if (data.nombre) formData.append('nombre', data.nombre);
	if (data.apellido) formData.append('apellido', data.apellido);
	if (data.descripcion) formData.append('descripcion', data.descripcion);
	if (data.numeroObras !== undefined) formData.append('numeroObras', data.numeroObras.toString());
	if (data.presupuesto !== undefined) formData.append('presupuesto', data.presupuesto.toString());
	if (data.aprobacionCiudadana) formData.append('aprobacionCiudadana', data.aprobacionCiudadana);
	if (data.atencionCiudadana) formData.append('atencionCiudadana', data.atencionCiudadana);
	if (data.periodo) formData.append('periodo', data.periodo);
	if (data.experiencia) formData.append('experiencia', data.experiencia);
	if (data.reconocimientos) formData.append('reconocimientos', data.reconocimientos);
	if (data.compromiso) formData.append('compromiso', data.compromiso);
	if (data.direccionImagen) formData.append('direccionImagen', data.direccionImagen);
	try {
		await axiosInstance.patch(`alcaldeedit/${id}`, formData);
		return true;
	} catch (error) {
		console.error('Error al editar alcalde:', error);
		return false;
	}
};

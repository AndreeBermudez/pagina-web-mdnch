import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { PresupuestoRequest } from '../schemas/presupuesto.schema';

export const crearPresupuesto = async (data: PresupuestoRequest): Promise<boolean> => {
	const formData = new FormData();
	formData.append('titulo', data.titulo);
	formData.append('tipo', data.tipo);
	formData.append('linkDocumento', data.linkDocumento);
	try {
		await axiosInstance.post('presupuesto/crear', formData);
		return true;
	} catch (error) {
		console.error('Error al crear presupuesto:', error);
		return false;
	}
};

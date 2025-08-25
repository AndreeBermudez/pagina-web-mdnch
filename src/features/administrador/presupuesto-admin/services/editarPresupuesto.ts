import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { PresupuestoEdit } from '../schemas/presupuesto.schema';

export const editarPresupuesto = async (id: number, data: Partial<PresupuestoEdit>): Promise<boolean> => {
	const formData = new FormData();
	if (data.titulo) formData.append('titulo', data.titulo);
	if (data.tipo) formData.append('tipo', data.tipo);
	if (data.linkDocumento) formData.append('linkDocumento', data.linkDocumento);

	try {
		await axiosInstance.put(`presupuesto/${id}`, formData);
		return true;
	} catch (error) {
		console.error('Error al editar presupuesto:', error);
		return false;
	}
};

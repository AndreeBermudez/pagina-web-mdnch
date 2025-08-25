import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { Presupuesto } from '../schemas/presupuesto.schema';

export const obtenerPresupuestos = async (): Promise<Presupuesto[]> => {
	try {
		const response = await axiosWithoutMultipart.get('presupuesto/listar');
		if (Array.isArray(response.data)) {
			return response.data;
		}
		if (response.data && Array.isArray(response.data.data)) {
			return response.data.data;
		}
		return [];
	} catch (error) {
		console.error('Error al obtener presupuestos:', error);
		return [];
	}
};

import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { Servicio } from './servicios.interface';

export const obtenerServicios = async (): Promise<Servicio[]> => {
	try {
		const response = await axiosWithoutMultipart.get('serviciosmuni/listar');
		
		// Verificar diferentes estructuras de respuesta
		if (Array.isArray(response.data)) {
			return response.data;
		}
		if (response.data && Array.isArray(response.data.data)) {
			return response.data.data;
		}
		
		console.log('Servicios obtenidos exitosamente:', response.data);
		return [];
	} catch (error: any) {
		console.error('Error al obtener servicios:', error);
		console.error('Detalles del error:', error.response?.data);
		return [];
	}
};


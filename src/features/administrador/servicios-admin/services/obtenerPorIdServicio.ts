import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { Servicio } from './servicios.interface';

export const obtenerServicioPorId = async (serviciosMuniId: number): Promise<Servicio | null> => {
	try {
		const response = await axiosWithoutMultipart.get(`serviciosmuni/${serviciosMuniId}`);
		
		console.log('Servicio obtenido exitosamente:', response.data);
		return response.data;
	} catch (error: any) {
		console.error('Error al obtener servicio por ID:', error);
		console.error('Detalles del error:', error.response?.data);
		return null;
	}
};


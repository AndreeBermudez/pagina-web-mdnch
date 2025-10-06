import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { Destino } from './destino.interface';

export const obtenerDestinoPorId = async (destinoId: number): Promise<Destino | null> => {
	try {
		const response = await axiosWithoutMultipart.get(`destinoTuristico/${destinoId}`);
		
		console.log('Destino obtenido exitosamente:', response.data);
		return response.data;
	} catch (error: any) {
		console.error('Error al obtener destino por ID:', error);
		console.error('Detalles del error:', error.response?.data);
		return null;
	}
};
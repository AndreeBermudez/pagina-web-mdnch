import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { Destino } from './destino.interface';

export const obtenerDestinos = async (): Promise<Destino[]> => {
	try {
		const response = await axiosWithoutMultipart.get('destinoTuristico');
		
		console.log('Respuesta completa de la API:', response.data);
		
		// Verificar diferentes estructuras de respuesta
		let destinos = [];
		if (Array.isArray(response.data)) {
			destinos = response.data;
		} else if (response.data && Array.isArray(response.data.data)) {
			destinos = response.data.data;
		}
		
		console.log('Destinos procesados:', destinos);
		console.log('Primer destino (estructura):', destinos[0]);
		
		return destinos;
	} catch (error: any) {
		console.error('Error al obtener destinos:', error);
		console.error('Detalles del error:', error.response?.data);
		return [];
	}
};
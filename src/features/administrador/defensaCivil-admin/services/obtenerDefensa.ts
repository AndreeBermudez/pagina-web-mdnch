import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { DefensaCivil } from './defensa.interface';

export const obtenerDefensasCiviles = async (): Promise<DefensaCivil[]> => {
	try {
		const response = await axiosWithoutMultipart.get('defensaCivil');
		
		console.log('Respuesta completa de la API:', response.data);
		
		// Verificar diferentes estructuras de respuesta
		let defensas = [];
		if (Array.isArray(response.data)) {
			defensas = response.data;
		} else if (response.data && Array.isArray(response.data.data)) {
			defensas = response.data.data;
		}
		
		console.log('Defensas procesadas:', defensas);
		console.log('Primera defensa (estructura):', defensas[0]);
		
		return defensas;
	} catch (error: any) {
		console.error('Error al obtener defensas civiles:', error);
		console.error('Detalles del error:', error.response?.data);
		return [];
	}
};
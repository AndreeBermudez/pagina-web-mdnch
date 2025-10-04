import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { AlcaldeBanner } from './AlcaldeBanner.interface';

export const obtenerAlcaldesBanner = async (): Promise<AlcaldeBanner[]> => {
	try {
		const response = await axiosInstance.get('/alcaldesIndex');
		
		// Manejar diferentes formatos de respuesta del servidor
		if (response.data && typeof response.data === 'object') {
			// Si la respuesta tiene formato {success, data, message}
			if (response.data.data && Array.isArray(response.data.data)) {
				return response.data.data;
			}
			// Si la respuesta es directamente un array
			if (Array.isArray(response.data)) {
				return response.data;
			}
		}
		
		console.warn('Formato de respuesta inesperado:', response.data);
		return [];
	} catch (error) {
		console.error('Error al obtener alcaldes banner:', error);
		throw error;
	}
};

export const obtenerAlcaldeBannerPorId = async (alcaldeId: number): Promise<AlcaldeBanner> => {
	try {
		const response = await axiosInstance.get(`/alcaldepage/${alcaldeId}`);
		return response.data;
	} catch (error) {
		console.error('Error al obtener alcalde banner por ID:', error);
		throw error;
	}
};
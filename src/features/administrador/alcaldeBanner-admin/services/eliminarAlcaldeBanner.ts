import { axiosInstance } from '../../../../core/api/axiosInstance';

export const eliminarAlcaldeBanner = async (alcaldeId: number): Promise<any> => {
	try {
		const response = await axiosInstance.delete(`/alcaldesIndex/${alcaldeId}`);
		return response.data;
	} catch (error) {
		console.error('Error al eliminar alcalde banner:', error);
		throw error;
	}
};
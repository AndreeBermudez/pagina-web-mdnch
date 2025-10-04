import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { AlcaldeBannerUpdateData } from './AlcaldeBanner.interface';

export const actualizarAlcaldeBanner = async (alcaldeId: number, data: AlcaldeBannerUpdateData): Promise<any> => {
	try {
		const formData = new FormData();
		
		formData.append('nombre', data.nombre);
		formData.append('apellido', data.apellido);
		if (data.direccionImagen) {
			formData.append('direccionImagen', data.direccionImagen);
		}
		formData.append('tituloBannerPage', data.tituloBannerPage);
		formData.append('descripcionBannerPage', data.descripcionBannerPage);

		const response = await axiosInstance.patch(`/alcaldeEditIndex/${alcaldeId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error) {
		console.error('Error al actualizar alcalde banner:', error);
		throw error;
	}
};
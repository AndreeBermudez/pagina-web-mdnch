import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { AlcaldeBannerFormData } from './AlcaldeBanner.interface';

export const crearAlcaldeBanner = async (data: AlcaldeBannerFormData): Promise<any> => {
	try {
		const formData = new FormData();
		
		formData.append('nombre', data.nombre);
		formData.append('apellido', data.apellido);
		formData.append('direccionImagen', data.direccionImagen);
		formData.append('tituloBannerPage', data.tituloBannerPage);
		formData.append('descripcionBannerPage', data.descripcionBannerPage);

		const response = await axiosInstance.post('/alcaldesIndex/crear', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error) {
		console.error('Error al crear alcalde banner:', error);
		throw error;
	}
};

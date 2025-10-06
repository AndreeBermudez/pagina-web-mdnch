import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { DefensaCivilFormData } from './defensa.interface';

export const crearDefensaCivil = async (data: DefensaCivilFormData) => {
	try {
		const formData = new FormData();
		
		// Agregar campos de texto
		formData.append('titulo', data.titulo);
		formData.append('descripcion', data.descripcion);
		formData.append('numeroSerenazgo', data.numeroSerenazgo);
		formData.append('numeroSalud', data.numeroSalud);
		formData.append('numeroBomberos', data.numeroBomberos);
		
		// Agregar archivo PDF si existe
		if (data.rutaPdf && data.rutaPdf instanceof File) {
			formData.append('rutaPdf', data.rutaPdf);
		}

		const response = await axiosInstance.post('defensaCivil/crear', formData);

		return {
			success: true,
			data: response.data,
			message: 'Defensa Civil creada exitosamente'
		};
	} catch (error: any) {
		return {
			success: false,
			data: null,
			message: error.response?.data?.message || 'Error al crear la información de Defensa Civil'
		};
	}
};
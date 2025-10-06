import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { DefensaCivilUpdateData } from './defensa.interface';

export const actualizarDefensaCivil = async (
	defensaCivilId: number, 
	data: DefensaCivilUpdateData
) => {
	try {
		const formData = new FormData();
		
		// Agregar campos de texto
		formData.append('titulo', data.titulo);
		formData.append('descripcion', data.descripcion);
		formData.append('numeroSerenazgo', data.numeroSerenazgo);
		formData.append('numeroSalud', data.numeroSalud);
		formData.append('numeroBomberos', data.numeroBomberos);
		
		// Agregar archivo PDF solo si se proporciona uno nuevo
		if (data.rutaPdf && data.rutaPdf instanceof File) {
			formData.append('rutaPdf', data.rutaPdf);
		}

		const response = await axiosInstance.put(`defensaCivil/${defensaCivilId}`, formData);

		return {
			success: true,
			data: response.data,
			message: 'Defensa Civil actualizada exitosamente'
		};
	} catch (error: any) {
		return {
			success: false,
			data: null,
			message: error.response?.data?.message || 'Error al actualizar la información de Defensa Civil'
		};
	}
};
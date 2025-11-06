import { axiosInstance } from '../../../../../core/api/axiosInstance';
import type { PeriodoRequest } from '../../schemas/transparencia.schema';

export const editarPeriodo = async (id: number, data: Partial<PeriodoRequest>): Promise<boolean> => {
	const formData = new FormData();
	
	// Agregar el ID del período que se va a actualizar
	formData.append('periodoId', id.toString());
	
	// Agregar campos obligatorios solo si están presentes
	if (data.año) {
		formData.append('anio', data.año);
	}
	if (data.responsable) {
		formData.append('responsable', data.responsable);
	}
	
	// Agregar archivos solo si fueron seleccionados (nuevos)
	if (data.trimestre1) formData.append('trimestre1', data.trimestre1);
	if (data.trimestre2) formData.append('trimestre2', data.trimestre2);
	if (data.trimestre3) formData.append('trimestre3', data.trimestre3);
	if (data.trimestre4) formData.append('trimestre4', data.trimestre4);
	
	try {
		if (!data.transparenciaId) {
			throw new Error('transparenciaId es requerido para actualizar período');
		}
		await axiosInstance.post(`transparencia/${data.transparenciaId}/periodo/subir`, formData);
		return true;
	} catch (error) {
		console.error('Error al editar período:', error);
		return false;
	}
};

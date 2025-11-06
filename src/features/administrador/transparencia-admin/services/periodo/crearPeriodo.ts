import { axiosInstance } from '../../../../../core/api/axiosInstance';
import type { PeriodoRequest } from '../../schemas/transparencia.schema';

export const crearPeriodo = async (data: PeriodoRequest): Promise<boolean> => {
	const formData = new FormData();
	formData.append('anio', data.año);
	formData.append('responsable', data.responsable);
	if(data.trimestre1) formData.append('trimestre1', data.trimestre1);
	if(data.trimestre2) formData.append('trimestre2', data.trimestre2);
	if(data.trimestre3) formData.append('trimestre3', data.trimestre3);
	if(data.trimestre4) formData.append('trimestre4', data.trimestre4);
	
	try {
		await axiosInstance.post(`transparencia/${data.transparenciaId}/periodo/subir`, formData);
		return true;
	} catch (error) {
		console.error('Error al crear período:', error);
		return false;
	}
};

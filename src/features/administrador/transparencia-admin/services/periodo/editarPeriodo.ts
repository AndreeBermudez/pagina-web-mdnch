import { axiosInstance } from '../../../../../core/api/axiosInstance';
import type { PeriodoRequest } from '../../schemas/transparencia.schema';

export const editarPeriodo = async (id: number, data: Partial<PeriodoRequest>): Promise<boolean> => {
	const formData = new FormData();
	if(data.transparenciaId)formData.append('transparenciaId', data.transparenciaId.toString());
	if(data.año) formData.append('año', data.año.toString());
	if(data.trimestre1) formData.append('trimestre1', data.trimestre1);
	if(data.trimestre2) formData.append('trimestre2', data.trimestre2);
	if(data.trimestre3) formData.append('trimestre3', data.trimestre3);
	if(data.trimestre4) formData.append('trimestre4', data.trimestre4);
	try {
		await axiosInstance.patch(`periodo/${id}`, formData);
		return true;
	} catch (error) {
		console.error('Error al crear periodo:', error);
		return false;
	}
};

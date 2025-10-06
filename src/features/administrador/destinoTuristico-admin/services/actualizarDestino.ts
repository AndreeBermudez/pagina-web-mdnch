import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { DestinoUpdateData } from './destino.interface';

export const actualizarDestino = async (
	destinoId: number, 
	data: DestinoUpdateData
) => {
	try {
		const response = await axiosWithoutMultipart.patch(`destinoTuristico/${destinoId}`, {
			video: data.video
		});

		return {
			success: true,
			data: response.data,
			message: 'Destino turístico actualizado exitosamente'
		};
	} catch (error: any) {
		return {
			success: false,
			data: null,
			message: error.response?.data?.message || 'Error al actualizar el destino turístico'
		};
	}
};
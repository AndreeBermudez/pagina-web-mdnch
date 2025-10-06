import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { DestinoFormData } from './destino.interface';


export const crearDestino = async (data: DestinoFormData) => {
	try {
		const response = await axiosWithoutMultipart.post('destinoTuristico/registrar', {
			video: data.video
		});

		return {
			success: true,
			data: response.data,
			message: 'Destino turístico creado exitosamente'
		};
	} catch (error: any) {
		return {
			success: false,
			data: null,
			message: error.response?.data?.message || 'Error al crear el destino turístico'
		};
	}
};

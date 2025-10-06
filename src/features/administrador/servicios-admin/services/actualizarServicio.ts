import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { ServicioUpdateData } from './servicios.interface';

export const actualizarServicio= async (
	serviciosMuniId: number, 
	data: ServicioUpdateData
) => {
	try {
		const response = await axiosWithoutMultipart.put(`serviciosmuni/${serviciosMuniId}`, {
			titulo: data.titulo,
			descripcion: data.descripcion,
			link: data.link
		});

		return {
			success: true,
			data: response.data,
			message: 'Servicio actualizado exitosamente'
		};
	} catch (error: any) {
		return {
			success: false,
			data: null,
			message: error.response?.data?.message || 'Error al actualizar el servicio'
		};
	}
};
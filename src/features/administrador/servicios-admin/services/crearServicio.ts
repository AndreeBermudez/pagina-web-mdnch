import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { ServicioFormData } from './servicios.interface';


export const crearServicio = async (data: ServicioFormData) => {
	try {
		const response = await axiosWithoutMultipart.post('serviciosmuni/crear', {
			titulo: data.titulo,
			descripcion: data.descripcion,
			link: data.link
		});

		return {
			success: true,
			data: response.data,
			message: 'Servicio creado exitosamente'
		};
	} catch (error: any) {
		return {
			success: false,
			data: null,
			message: error.response?.data?.message || 'Error al crear el servicio'
		};
	}
};
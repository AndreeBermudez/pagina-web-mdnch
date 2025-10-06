import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';


export const eliminarServicio = async (serviciosMuniId: number) => {
	try {
		const response = await axiosWithoutMultipart.delete(`serviciosmuni/${serviciosMuniId}`);

		return {
			success: true,
			data: response.data,
			message: 'Servicio eliminado exitosamente'
		};
	} catch (error: any) {
		return {
			success: false,
			data: null,
			message: error.response?.data?.message || 'Error al eliminar el servicio'
		};
	}
};
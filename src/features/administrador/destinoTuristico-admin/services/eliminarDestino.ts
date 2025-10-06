import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';

export const eliminarDestino = async (destinoId: number) => {
	try {
		const response = await axiosWithoutMultipart.delete(`destinoTuristico/${destinoId}`);

		return {
			success: true,
			data: response.data,
			message: 'Destino turístico eliminado exitosamente'
		};
	} catch (error: any) {
		return {
			success: false,
			data: null,
			message: error.response?.data?.message || 'Error al eliminar el destino turístico'
		};
	}
};
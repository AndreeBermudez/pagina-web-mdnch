import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';

export const eliminarDefensaCivil = async (defensaCivilId: number) => {
	try {
		const response = await axiosWithoutMultipart.delete(`defensaCivil/${defensaCivilId}`);

		return {
			success: true,
			data: response.data,
			message: 'Defensa Civil eliminada exitosamente'
		};
	} catch (error: any) {
		return {
			success: false,
			data: null,
			message: error.response?.data?.message || 'Error al eliminar la información de Defensa Civil'
		};
	}
};
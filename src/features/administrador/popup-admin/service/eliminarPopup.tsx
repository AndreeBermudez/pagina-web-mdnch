import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';

export const eliminarPopup = async (popupId: number): Promise<boolean> => {
	try {
		await axiosWithoutMultipart.delete(`popups/${popupId}`);
		return true;
	} catch (error) {
		console.error('Error al eliminar popup:', error);
		return false;
	}
};

import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { PopupRequest } from '../schemas/popup.schema';

export const actualizarPopup = async (popupId: number, data: Partial<PopupRequest>): Promise<boolean> => {
	const formData = new FormData();
	if (data.titulo) formData.append('titulo', data.titulo);
	if (data.direccionImagen) formData.append('direccionImagen', data.direccionImagen);
	try {
		await axiosInstance.put(`popups/${popupId}`, formData);
		return true;
	} catch (error) {
		console.error('Error al actualizar popup:', error);
		return false;
	}
};

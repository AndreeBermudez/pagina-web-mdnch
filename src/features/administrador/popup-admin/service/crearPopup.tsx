import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { PopupRequest } from '../schemas/popup.schema';

export const crearPopup = async (data: PopupRequest): Promise<boolean> => {
    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('direccionImagen', data.direccionImagen);
    try {
        await axiosInstance.post('popup/registrar', formData);
        return true;
    } catch (error) {
        console.error('Error al crear popup:', error);
        return false;
    }
};
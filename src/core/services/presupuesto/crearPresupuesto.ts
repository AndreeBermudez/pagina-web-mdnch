import { axiosInstance } from '../../api/axiosInstance';

export const crearPresupuesto = async (formData: FormData): Promise<boolean> => {
    try {
        await axiosInstance.post('presupuesto/crear', formData);
        return true;
    } catch (error) {
        console.error('Error al crear presupuesto:', error);
        return false;
    }
};

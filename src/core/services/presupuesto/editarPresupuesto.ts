import { axiosInstance } from '../../api/axiosInstance';

export const editarPresupuesto = async (id: number, formData: FormData): Promise<boolean> => {
    try {
        await axiosInstance.put(`presupuesto/${id}`, formData);
        return true;
    } catch (error) {
        console.error('Error al editar presupuesto:', error);
        return false;
    }
};
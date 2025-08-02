import { axiosInstance } from '../../api/axiosInstance';

export const eliminarPresupuesto = async (id: number): Promise<boolean> => {
    try {
        await axiosInstance.delete(`presupuesto/${id}`);
        return true;
    } catch (error) {
        console.error('Error al eliminar presupuesto:', error);
        return false;
    }
};

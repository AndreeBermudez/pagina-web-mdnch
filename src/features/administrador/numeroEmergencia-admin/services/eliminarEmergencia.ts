import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';

export const eliminarEmergencia = async (id: number): Promise<boolean> => {
    try {
        await axiosWithoutMultipart.delete(`numeros/${id}`);
        return true;
    } catch (error) {
        console.error('Error al eliminar número de emergencia:', error);
        return false;
    }
};

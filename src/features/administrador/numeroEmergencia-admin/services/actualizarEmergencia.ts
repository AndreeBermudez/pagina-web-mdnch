import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';

export interface NumeroEmergenciaUpdateRequest {
    titulo: string;
    numero: string;
}

export const actualizarEmergencia = async (id: number, data: NumeroEmergenciaUpdateRequest): Promise<boolean> => {
    try {
        await axiosWithoutMultipart.put(`numeros/${id}`, data);
        return true;
    } catch (error) {
        console.error('Error al actualizar número de emergencia:', error);
        return false;
    }
};

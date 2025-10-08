import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';

export interface NumeroEmergenciaRequest {
    titulo: string;
    numero: string;
}

export const crearEmergencia = async (data: NumeroEmergenciaRequest): Promise<boolean> => {
    try {
        await axiosWithoutMultipart.post('numeros/crear', data);
        return true;
    } catch (error) {
        console.error('Error al crear número de emergencia:', error);
        return false;
    }
};

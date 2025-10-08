import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';
import type { NumeroEmergenciaResponse } from './obtenerEmergencia';

interface ApiResponse {
    success: boolean;
    message: string;
    data: NumeroEmergenciaResponse;
}

export const obtenerxIDEmergencia = async (id: number): Promise<NumeroEmergenciaResponse | null> => {
    try {
        const response = await axiosWithoutMultipart.get<ApiResponse>(`numeros/${id}`);
        if (response.data.success && response.data.data) {
            return response.data.data;
        } else {
            console.warn('API retornó success: false o data vacío:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener número de emergencia por ID:', error);
        return null;
    }
};

import { axiosWithoutMultipart } from '../../../../core/api/axiosInstance';

export interface NumeroEmergenciaResponse {
    id: number;
    titulo: string;
    numero: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: NumeroEmergenciaResponse[];
}

export const obtenerEmergencia = async (): Promise<NumeroEmergenciaResponse[]> => {
    try {
        const response = await axiosWithoutMultipart.get<ApiResponse>('numeros');
        if (response.data.success && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.warn('API retornó success: false o data no es un array:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error al obtener números de emergencia:', error);
        return [];
    }
};

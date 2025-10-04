import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { Control } from './control.interface';

export interface ObtenerControlesResponse {
    success: boolean;
    data: Control[];
    message?: string;
}

export const obtenerControles = async (): Promise<Control[] | null> => {
    try {
        const response = await axiosInstance.get('controlInterno');
 
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
       
            return response.data.data;
        }
        
        // Si no tiene la estructura esperada, verificar si es un array directo
        if (Array.isArray(response.data)) {
            return response.data;
        }
    
        return [];
    } catch (error: any) {
        if (error?.response) {
           
        }
        return null;
    }
};

export const obtenerControlesCompleta = async (): Promise<ObtenerControlesResponse> => {
    try {
        const response = await axiosInstance.get('controlInterno');
        
        // El servidor devuelve { success: true, data: Array, message: string }
        if (response.data && response.data.success && Array.isArray(response.data.data)) {
            return {
                success: true,
                data: response.data.data,
                message: response.data.message || 'Controles obtenidos exitosamente'
            };
        }
        
        // Si es un array directo
        if (Array.isArray(response.data)) {
            return {
                success: true,
                data: response.data,
                message: 'Controles obtenidos exitosamente'
            };
        }
        
        return {
            success: false,
            data: [],
            message: 'Respuesta del servidor no válida'
        };
    } catch (error) {
        console.error('Error al obtener controles internos:', error);
        return {
            success: false,
            data: [],
            message: 'Error al obtener los controles internos'
        };
    }
};
import { axiosInstance } from '../../../../core/api/axiosInstance';
import type { Control } from './control.interface';

export interface ObtenerControlResponse {
    success: boolean;
    data: Control | null;
    message?: string;
}

export const obtenerControlPorId = async (controlInternoId: number): Promise<Control | null> => {
    try {

        const response = await axiosInstance.get<Control>(`api/authentication/controlInterno/${controlInternoId}`);
        
        return response.data;
    } catch (error) {
       
        return null;
    }
};

export const obtenerControlPorIdCompleta = async (controlInternoId: number): Promise<ObtenerControlResponse> => {
    try {
        const response = await axiosInstance.get<Control>(`controlInterno/${controlInternoId}`);
        
        return {
            success: true,
            data: response.data,
            message: 'Control obtenido exitosamente'
        };
    } catch (error) {
        
        return {
            success: false,
            data: null,
            message: `Error al obtener el control interno con ID ${controlInternoId}`
        };
    }
};
import { axiosWithoutMultipart } from '../../api/axiosInstance';
import type { presupuestoPayload } from './presupuesto.interface';

export const obtenerPresupuestos = async (): Promise<presupuestoPayload[]> => {
    try {
        const response = await axiosWithoutMultipart.get('presupuesto/listar');
        
        // Si la respuesta es un array directamente
        if (Array.isArray(response.data)) {
            return response.data;
        }
        
        // Si la respuesta tiene una propiedad 'data' que contiene el array
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data;
        }
        
        // Si la respuesta tiene otra estructura, devolver array vacío
        return [];
    } catch (error) {
        console.error('Error al obtener presupuestos:', error);
        return [];
    }
};

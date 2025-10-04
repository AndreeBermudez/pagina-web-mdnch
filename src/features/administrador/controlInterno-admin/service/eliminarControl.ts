import { axiosInstance } from '../../../../core/api/axiosInstance';

export const eliminarControl = async (controlInternoId: number): Promise<boolean> => {
    try {
        
        // Usar el endpoint DELETE para eliminar
        await axiosInstance.delete(`controlInterno/${controlInternoId}`);
        
        return true;
    } catch (error) {
        console.error('Error al eliminar control interno:', error);
        return false;
    }
};
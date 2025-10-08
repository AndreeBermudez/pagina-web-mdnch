import { useQuery } from '@tanstack/react-query';
import { axiosWithoutMultipart } from '../api/axiosInstance';

interface PopupUsuario {
    popupId: number;
    titulo: string;
    direccionImagen: string;
    estado?: boolean;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: PopupUsuario[];
}

const obtenerPopupActivo = async (): Promise<PopupUsuario | null> => {
    try {
      
        const response = await axiosWithoutMultipart.get<ApiResponse>('popups');
       
        
        if (response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
          
            const popupActivo = response.data.data.find((popup: PopupUsuario) => popup.estado === true) || response.data.data[0];
          
            return popupActivo;
        }
   
        return null;
    } catch (error) {
      
        return null;
    }
};

export const usePopupActivo = () => {
    return useQuery({
        queryKey: ['popup-activo'],
        queryFn: obtenerPopupActivo,
        staleTime: 5 * 60 * 1000, // 5 minutos
        refetchOnWindowFocus: false,
        retry: 1, // Solo reintentar una vez
        retryDelay: 1000, // Esperar 1 segundo antes de reintentar
    });
};
import { axiosInstance } from '../../api/axiosInstance';
import { handleError } from '../../utils/handleError';

export const eliminarNoticia = async (id: number): Promise<boolean> => {
    try {
        const response = await axiosInstance.delete(`noticias/${id}`);
        console.log(response.data);
        if (!response || response.status !== 200) {
            throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
        }
        // Para eliminar, verificamos el campo 'success' del ResponseBase
        // ya que 'data' será null
        if (response.data && response.data.success) {
            return true;
        }
        throw new Error('Error al eliminar la noticia');
    } catch (error: unknown) {
        return handleError(error);
    }
};
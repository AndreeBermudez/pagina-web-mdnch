import { axiosInstance } from '../../api/axiosInstance';
import type { ResponseBase } from '../noticias/noticia.interface';
import { handleError } from '../../utils/handleError';
import type { Evento } from './evento.interface';

export const listarEventos = async (): Promise<Evento[]> => {
    try {
        const response = await axiosInstance.get<ResponseBase<Evento[]>>('eventos');
        console.log(response.data);
        if (!response || response.status !== 200) {
            throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
        }
        if (!response.data) {
            throw new Error('Respuesta del servidor inválida');
        }
        return response.data.data;
    } catch (error: unknown) {
        return handleError(error);
    }
};

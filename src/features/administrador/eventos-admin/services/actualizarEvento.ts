import { axiosInstance } from '../../../../core/api/axiosInstance';
import { handleError } from '../../../../core/utils/handleError';
import type { ResponseBase } from '../../../../core/types/response-base';
import type { EventoRequest, EventoResponse } from '../schemas/evento.schema';

export const actualizarEvento = async (id: number ,data: Partial<EventoRequest>): Promise<EventoResponse> => {
    try {
        const formData = new FormData();
        if(data.fecha) formData.append('fecha', data.fecha);
        if(data.titulo) formData.append('titulo', data.titulo);
        if(data.categoria) formData.append('categoria', data.categoria);
        if(data.descripcion) formData.append('descripcion', data.descripcion);
        if(data.horaInicio) formData.append('horaInicio', data.horaInicio);
        if(data.horaFin) formData.append('horaFin', data.horaFin);
        if(data.ubicacion) formData.append('ubicacion', data.ubicacion);
        if(data.direccionImagen) formData.append('direccionImagen', data.direccionImagen);

        const response = await axiosInstance.patch<ResponseBase<EventoResponse>>(`eventosedit/${id}`, formData);
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

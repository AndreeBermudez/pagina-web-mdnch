import { axiosInstance } from '../../../../core/api/axiosInstance';
import { handleError } from '../../../../core/utils/handleError';
import type { ResponseBase } from '../../../../core/types/response-base';
import type { EventoRequest, EventoResponse } from '../schemas/evento.schema';

export const crearEvento = async (data: EventoRequest): Promise<EventoResponse> => {
	try {
		const formData = new FormData();
		formData.append('fecha', data.fecha);
		formData.append('titulo', data.titulo);
		formData.append('categoria', data.categoria);
		formData.append('descripcion', data.descripcion);
		formData.append('horaInicio', data.horaInicio);
		formData.append('horaFin', data.horaFin);
		formData.append('ubicacion', data.ubicacion);
		formData.append('direccionImagen', data.direccionImagen);

		const response = await axiosInstance.post<ResponseBase<EventoResponse>>('evento/registrar', formData);
		if (!response.data.success || response.status !== 201) {
			throw new Error(`Error en la respuesta del servidor: ${response?.status || 'Sin respuesta'}`);
		}
		return response.data.data;
	} catch (error: unknown) {
		return handleError(error);
	}
};

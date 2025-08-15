import { useQuery } from '@tanstack/react-query';
import { obtenerAgendas } from '../services/obtenerAgendas';
import type { AgendaResponse } from '../schemas/agenda.schema';

export const useAgendaList = () => {
	return useQuery<AgendaResponse[], Error>({
		queryKey: ['agenda'],
		queryFn: obtenerAgendas,
	});
};

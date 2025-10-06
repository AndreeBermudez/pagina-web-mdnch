import { useQuery } from '@tanstack/react-query';
import { obtenerDestinos } from '../services/obtenerDestino';

export const useDestinosQuery = () => {
	const { data: destinos, isLoading, error } = useQuery({
		queryKey: ['destinos'],
		queryFn: obtenerDestinos,
		staleTime: 5 * 60 * 1000, // 5 minutos
		gcTime: 30 * 60 * 1000,   // 30 minutos
	});

	return { destinos, isLoading, error };
};
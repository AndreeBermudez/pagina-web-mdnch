import { useQuery } from '@tanstack/react-query';
import { obtenerDefensasCiviles } from '../services/obtenerDefensa';

export const useDefensaQuery = () => {
	const { data: defensas, isLoading, error } = useQuery({
		queryKey: ['defensas'],
		queryFn: obtenerDefensasCiviles,
		staleTime: 5 * 60 * 1000, // 5 minutos
		gcTime: 30 * 60 * 1000,   // 30 minutos
	});

	return { defensas, isLoading, error };
};
import { useQuery } from '@tanstack/react-query';
import { obtenerTransparencias } from '../services/transparencia/obtenerTransparencia';
import type { TransparenciaResponse } from '../schemas/transparencia.schema';

export const useTransparenciaQuery = () => {
	const {
		data: transparencias,
		isLoading,
		error,
	} = useQuery<TransparenciaResponse[]>({
		queryKey: ['transparencias'],
		queryFn: obtenerTransparencias,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});

	return {
		transparencias,
		isLoading,
		error,
	};
};

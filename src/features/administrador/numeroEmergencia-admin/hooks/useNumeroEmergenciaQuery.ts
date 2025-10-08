import { useQuery } from '@tanstack/react-query';
import { obtenerEmergencia } from '../services/obtenerEmergencia';

export const useNumeroEmergenciaQuery = () => {
	const getAll = useQuery({
		queryKey: ['numeroEmergencia'],
		queryFn: () => obtenerEmergencia(),
	});

	return {
		numerosEmergencia: getAll.data || [],
		isLoading: getAll.isLoading,
		error: getAll.error,
		refetch: getAll.refetch,
	};
};

export const useNumeroEmergenciaList = () => {
	return useQuery({
		queryKey: ['numeroEmergencia-list'],
		queryFn: () => obtenerEmergencia(),
	});
};
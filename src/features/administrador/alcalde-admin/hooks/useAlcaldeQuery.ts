import { useQuery } from '@tanstack/react-query';
import { obtenerAlcaldes } from '../services';

export const useAlcaldeQuery = () => {
	const getAll = useQuery({
		queryKey: ['alcalde'],
		queryFn: () => obtenerAlcaldes(),
	});

	return {
		alcaldes: getAll.data || [],
		isLoading: getAll.isLoading,
		isError: getAll.isError,
		error: getAll.error,
		refetch: getAll.refetch,
	};
};

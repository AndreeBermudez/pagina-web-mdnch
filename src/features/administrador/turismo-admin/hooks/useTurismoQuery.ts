import { useQuery } from '@tanstack/react-query';
import { listarTurismo } from '../services/listarTurismo';

export const useTurismoQuery = () => {
	const getAll = useQuery({
		queryKey: ['turismo'],
		queryFn: () => listarTurismo(),
	});
	return {
		turismo: getAll.data ?? [],
		isLoading: getAll.isLoading,
		error: getAll.error,
		isError: getAll.isError,
		refetch: getAll.refetch,
	};
};

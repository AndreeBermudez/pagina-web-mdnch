import { useQuery } from '@tanstack/react-query';
import { listarRoles } from '../services/listarRoles';

export const useRolesQuery = () => {
	const {
		data: roles = [],
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ['roles'],
		queryFn: listarRoles,
		staleTime: 1000 * 60 * 5, // 5 minutos
	});

	return {
		roles,
		isLoading,
		error,
		refetch,
	};
};

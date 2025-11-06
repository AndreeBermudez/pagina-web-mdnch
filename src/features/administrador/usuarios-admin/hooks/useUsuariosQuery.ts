import { useQuery } from '@tanstack/react-query';
import { listarUsuarios } from '../services/listarUsuario';

export const useUsuariosQuery = () => {
	const {
		data: usuarios = [],
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ['usuarios'],
		queryFn: listarUsuarios,
		staleTime: 1000 * 60 * 5, // 5 minutos
	});

	return {
		usuarios,
		isLoading,
		error,
		refetch,
	};
};

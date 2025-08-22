import { useQuery } from '@tanstack/react-query';
import { getFuncionarios } from '../servicios';

export const useFuncionarioQuery = () => {
	const getAll = useQuery({
		queryKey: ['funcionarios'],
		queryFn: () => getFuncionarios(),
	});
	return {
		funcionarios: getAll.data,
		isLoading: getAll.isLoading,
		error: getAll.error,
		isError: getAll.isError,
		refetch: getAll.refetch,
	};
};

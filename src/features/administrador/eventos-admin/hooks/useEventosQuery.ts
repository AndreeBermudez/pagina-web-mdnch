import { useQuery } from '@tanstack/react-query';
import { listarEventos } from '../services/listarEventos';
import { listarUltimosEventos } from '../services/listarUltimosEventos';

export const useEventosQuery = () => {
	const getAll = useQuery({
		queryKey: ['eventos'],
		queryFn: () => listarEventos(),
	});

    const getTop = useQuery({
		queryKey: ['top-eventos'],
		queryFn: () => listarUltimosEventos(),
	});
	return {
		eventos: getAll.data,
		isLoading: getAll.isLoading,
		error: getAll.error,
		isError: getAll.isError,
        topEventos: getTop.data,
        isLoadingTop: getTop.isLoading,
        errorTop: getTop.error,
        isErrorTop: getTop.isError,
        refetch: getAll.refetch,
        refetchTop: getTop.refetch,
	};
};

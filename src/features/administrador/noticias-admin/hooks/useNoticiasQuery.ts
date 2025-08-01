import { useQuery } from '@tanstack/react-query';
import { listarNoticias } from '../services/listarNoticias';
import { listarTopNoticias } from '../services/listarTopNoticias';

export const useNoticiasQuery = () => {
	const getAll = useQuery({
		queryKey: ['noticias'],
		queryFn: () => listarNoticias(),
	});

    const getTop = useQuery({
		queryKey: ['top-noticias'],
		queryFn: () => listarTopNoticias(),
	});
	return {
		noticias: getAll.data,
		isLoading: getAll.isLoading,
		error: getAll.error,
		isError: getAll.isError,
        topNoticias: getTop.data,
        isLoadingTop: getTop.isLoading,
        errorTop: getTop.error,
        isErrorTop: getTop.isError,
        refetch: getAll.refetch,
        refetchTop: getTop.refetch,
	};
};

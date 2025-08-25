import { useQuery } from '@tanstack/react-query';
import { listarPdu } from '../services/listarPdu';

export const usePduQuery = () => {
	const getAll = useQuery({
		queryKey: ['pdu'],
		queryFn: () => listarPdu(),
	});

	return {
		pdus: getAll.data || [],
		isLoading: getAll.isLoading,
		error: getAll.error,
		refetch: getAll.refetch,
	};
};

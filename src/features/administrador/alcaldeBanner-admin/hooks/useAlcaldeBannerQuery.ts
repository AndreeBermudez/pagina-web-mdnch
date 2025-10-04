import { useQuery } from '@tanstack/react-query';
import { obtenerAlcaldesBanner } from '../services/obtenerAlcaldesBanner';

export const useAlcaldeBannerQuery = () => {
	const {
		data: alcaldesBanner = [],
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ['alcaldesBanner'],
		queryFn: obtenerAlcaldesBanner,
		staleTime: 5 * 60 * 1000, // 5 minutos
	});

	return {
		alcaldesBanner,
		isLoading,
		error: error?.message || null,
		refetch,
	};
};
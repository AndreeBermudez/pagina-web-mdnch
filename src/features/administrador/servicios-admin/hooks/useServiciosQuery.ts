import { useQuery } from '@tanstack/react-query';
import { obtenerServicios } from '../services/obtenerServicio';

export const useServiciosQuery = () => {
	const { data: servicios, isLoading, error } = useQuery({
		queryKey: ['servicios'],
		queryFn: obtenerServicios,
		staleTime: 5 * 60 * 1000, // 5 minutos
		gcTime: 30 * 60 * 1000,   // 30 minutos
	});

	return { servicios, isLoading, error };
};
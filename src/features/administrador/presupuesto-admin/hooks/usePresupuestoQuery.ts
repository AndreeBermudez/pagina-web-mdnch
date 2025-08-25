import { useQuery } from '@tanstack/react-query';
import { obtenerPresupuestos } from '../services/obtenerPresupuesto';

export const usePresupuestoQuery = () => {
	const getAll = useQuery({
		queryKey: ['presupuestos'],
		queryFn: () => obtenerPresupuestos(),
	});

	return {
		presupuestos: getAll.data,
		isLoading: getAll.isLoading,
		error: getAll.error,
		refetch: getAll.refetch,
	};
};

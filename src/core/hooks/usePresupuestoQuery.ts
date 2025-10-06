import { useQuery } from '@tanstack/react-query';
import { obtenerPresupuestos } from '../../features/administrador/presupuesto-admin/services/obtenerPresupuesto';

const PRESUPUESTO_QUERY_KEY = ['presupuestos'];

export const usePresupuestoQuery = () => {
	return useQuery({
		queryKey: PRESUPUESTO_QUERY_KEY,
		queryFn: obtenerPresupuestos,
		staleTime: 1000 * 60 * 5, // 5 minutos
		gcTime: 1000 * 60 * 30, // 30 minutos
	});
};
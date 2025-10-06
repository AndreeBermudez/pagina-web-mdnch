import { useQuery } from '@tanstack/react-query';
import { obtenerServicios } from '../../features/administrador/servicios-admin/services/obtenerServicio';

const SERVICIOS_QUERY_KEY = ['servicios-usuario'];

export const useServiciosUsuarioQuery = () => {
	return useQuery({
		queryKey: SERVICIOS_QUERY_KEY,
		queryFn: obtenerServicios,
		staleTime: 1000 * 60 * 10, // 10 minutos
		gcTime: 1000 * 60 * 60, // 1 hora
	});
};
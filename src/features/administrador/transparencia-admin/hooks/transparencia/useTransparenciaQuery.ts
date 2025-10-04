import { useQuery } from '@tanstack/react-query';
import { obtenerTransparencias } from '../../services/transparencia/obtenerTransparencia';

export const useTransparencias = () => {
	return useQuery({
		queryKey: ['transparencias'],
		queryFn: obtenerTransparencias,
	});
};

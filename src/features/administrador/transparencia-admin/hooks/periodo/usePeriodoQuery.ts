import { useQuery } from '@tanstack/react-query';
import { obtenerPeriodos } from '../../services/periodo/obtenerPeriodo';

export const usePeriodos = () => {
	return useQuery({
		queryKey: ['periodos'],
		queryFn: () => obtenerPeriodos(),
	});
};

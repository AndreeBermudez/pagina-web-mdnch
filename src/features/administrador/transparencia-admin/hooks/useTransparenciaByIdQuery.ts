import { useQuery } from '@tanstack/react-query';
import { obtenerTransparenciaPorId } from '../services/transparencia/obtenerXIDTransparencia';

export const useTransparenciaByIdQuery = (id: number | null) => {
	return useQuery({
		queryKey: ['transparencia', id],
		queryFn: () => {
			if (!id) throw new Error('ID no proporcionado');
			return obtenerTransparenciaPorId(id);
		},
		enabled: !!id, // Solo ejecuta la query si hay un ID
	});
};

import { useQuery } from '@tanstack/react-query';
import { listarConvocatorias } from '../services/listarConvocatorias';
import { obtenerConvocatoria } from '../services/obtenerConvocatoria';
import type { ConvocatoriaId } from '../services/types';

export const useConvocatoriasQuery = () =>
	useQuery({
		queryKey: ['convocatorias'],
		queryFn: () => listarConvocatorias(),
	});

export const useConvocatoriaQuery = (id: ConvocatoriaId | null) =>
	useQuery({
		queryKey: ['convocatoria', id],
		queryFn: () => obtenerConvocatoria(id as ConvocatoriaId),
		enabled: Boolean(id),
	});

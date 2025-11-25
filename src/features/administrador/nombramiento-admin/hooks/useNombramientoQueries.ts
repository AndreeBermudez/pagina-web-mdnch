import { useQuery } from '@tanstack/react-query';
import { listarNombramientos } from '../services/listarNombramientos';
import { obtenerNombramiento } from '../services/obtenerNombramiento';
import type { NombramientoId } from '../services/types';

export const useNombramientosQuery = () =>
  useQuery({
    queryKey: ['nombramientos'],
    queryFn: () => listarNombramientos(),
  });

export const useNombramientoQuery = (id: NombramientoId | null) =>
  useQuery({
    queryKey: ['nombramiento', id],
    queryFn: () => obtenerNombramiento(id as NombramientoId),
    enabled: Boolean(id),
  });

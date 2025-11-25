import { useQuery } from '@tanstack/react-query';
import { obtenerNombramientosPublicos, type NombramientoPublico } from '../services/nombramiento/obtenerNombramientosPublicos';

export const useNombramientosPublicos = () => {
  return useQuery<NombramientoPublico[], Error>({
    queryKey: ['nombramientos-publicos'],
    queryFn: obtenerNombramientosPublicos,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
};

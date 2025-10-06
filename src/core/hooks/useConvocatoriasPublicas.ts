import { useQuery } from '@tanstack/react-query';
import { obtenerConvocatoriasPublicas, type ConvocatoriaPublica } from '../services/convocatoria/obtenerConvocatoriasPublicas';

export const useConvocatoriasPublicas = () => {
  return useQuery<ConvocatoriaPublica[], Error>({
    queryKey: ['convocatorias-publicas'],
    queryFn: obtenerConvocatoriasPublicas,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
};
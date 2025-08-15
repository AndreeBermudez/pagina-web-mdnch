import { useQuery } from '@tanstack/react-query';
import { getPages, getPageById } from '../services/getPages';
import type { PaginaResponse } from '../schemas/page.schema';

export const usePagesQuery = () => {
  return useQuery<PaginaResponse[], Error>({
    queryKey: ['paginas'],
    queryFn: getPages,
  });
};

export const usePageByIdQuery = (id: number, enabled = true) => {
  return useQuery<PaginaResponse, Error>({
    queryKey: ['pagina', id],
    queryFn: () => getPageById(id),
    enabled,
  });
};

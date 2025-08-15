import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPage } from '../services/createPage';
import { updatePage } from '../services/updatePage';
import { deletePage } from '../services/deletePage';
import type { PaginaRequest, PaginaResponse } from '../schemas/page.schema';

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPage,
    onSuccess: () => {
      queryClient.invalidateQueries(['paginas']);
    },
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  return useMutation<{ id: number; data: Partial<PaginaRequest> }, unknown, { id: number; data: Partial<PaginaRequest> }, unknown>({
    mutationFn: async ({ id, data }) => updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['paginas']);
    },
  });
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  return useMutation<number, unknown, number, unknown>({
    mutationFn: deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries(['paginas']);
    },
  });
};

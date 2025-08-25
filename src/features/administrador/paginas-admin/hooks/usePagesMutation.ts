import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPage } from '../services/createPage';
import { updatePage } from '../services/updatePage';
import { deletePage } from '../services/deletePage';
import type { PaginaUpdate } from '../schemas/page.schema';

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['paginas']});
    },
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: {id:number, data: PaginaUpdate}) => updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['paginas']});
    },
  });
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['paginas']});
    },
  });
};

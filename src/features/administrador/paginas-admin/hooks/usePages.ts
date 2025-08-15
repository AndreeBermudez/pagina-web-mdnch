import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPages } from '../services/getPages';
import { getPageById } from '../services/getPageById';
import { createPage } from '../services/createPage';
import { updatePage } from '../services/updatePage';
import { deletePage } from '../services/deletePage';
import type { PaginaRequest, PaginaResponse } from '../schemas/page.schema';

export const usePages = () => {
  const queryClient = useQueryClient();

  // Query: Obtener todas las páginas
  const {
    data: pages,
    isLoading: isLoadingPages,
    error: errorPages,
    refetch: refetchPages,
  } = useQuery<PaginaResponse[], Error>({
    queryKey: ['paginas'],
    queryFn: getPages,
  });

  // Query: Obtener página por ID
  const usePageById = (id: number, enabled = true) => {
    return useQuery<PaginaResponse, Error>({
      queryKey: ['pagina', id],
      queryFn: () => getPageById(id),
      enabled,
    });
  };

  // Mutation: Crear página
  const {
    mutate: createPageMutate,
    isLoading: isCreatingPage,
    error: errorCreatePage,
    isSuccess: isCreatePageSuccess,
    reset: resetCreatePage,
  } = useMutation({
    mutationFn: createPage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paginas'] });
    },
  });

  // Mutation: Actualizar página
  const {
    mutate: updatePageMutate,
    isLoading: isUpdatingPage,
    error: errorUpdatePage,
    isSuccess: isUpdatePageSuccess,
    reset: resetUpdatePage,
  } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<PaginaRequest> }) => updatePage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paginas'] });
    },
  });

  // Mutation: Eliminar página
  const {
    mutate: deletePageMutate,
    isLoading: isDeletingPage,
    error: errorDeletePage,
    isSuccess: isDeletePageSuccess,
    reset: resetDeletePage,
  } = useMutation({
    mutationFn: deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paginas'] });
    },
  });

  return {
    // Queries
    pages,
    isLoadingPages,
    errorPages,
    refetchPages,
    usePageById,
    // Mutations
    createPageMutate,
    isCreatingPage,
    errorCreatePage,
    isCreatePageSuccess,
    resetCreatePage,
    updatePageMutate,
    isUpdatingPage,
    errorUpdatePage,
    isUpdatePageSuccess,
    resetUpdatePage,
    deletePageMutate,
    isDeletingPage,
    errorDeletePage,
    isDeletePageSuccess,
    resetDeletePage,
  };
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearNoticia } from '../services/crearNoticia';
import type { NoticiaRequest } from '../schemas/noticia.schema';
import { actualizarNoticia } from '../services/actualizarNoticia';
import { eliminarNoticia } from '../services/eliminarNoticia';

export const useNoticiasMutations = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: crearNoticia,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['noticias'] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: number; data: Partial<NoticiaRequest> }) => actualizarNoticia(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['noticias'] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: eliminarNoticia,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['noticias'] });
		},
	});

	return {
		crearNoticia: createMutation,
		actualizarNoticia: updateMutation,
		eliminarNoticia: deleteMutation,
	};
};

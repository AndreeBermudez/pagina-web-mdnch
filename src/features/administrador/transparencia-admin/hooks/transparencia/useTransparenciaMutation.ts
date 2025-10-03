import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearTransparencia } from '../../services/transparencia/crearTransparencia';
import { editarTransparencia } from '../../services/transparencia/editarTransparencia';
import { eliminarTransparencia } from '../../services/transparencia/eliminarTransparencia';
import type { TransparenciaRequest } from '../../schemas/transparencia.schema';

export const useCreateTransparencia = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (transparencia: TransparenciaRequest) => crearTransparencia(transparencia),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transparencias'] });
		},
	});
};

export const useUpdateTransparencia = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: Partial<TransparenciaRequest> }) =>
			editarTransparencia(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['transparencias'] });
			queryClient.invalidateQueries({
				queryKey: ['transparencias', variables.id],
			});
		},
	});
};

export const useDeleteTransparencia = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => eliminarTransparencia(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transparencias'] });
		},
	});
};

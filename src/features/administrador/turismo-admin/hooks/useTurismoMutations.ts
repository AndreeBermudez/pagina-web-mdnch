import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearTurismo } from '../services/crearTurismo';
import type { TurismoEditForm } from '../schemas/turismo.schema';
import { editarTurismo } from '../services/editarTurismo';
import { eliminarTurismo } from '../services/eliminarTurismo';

export const useTurismoMutations = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: crearTurismo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['turismo'] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: number; data: Partial<TurismoEditForm> }) => editarTurismo(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['turismo'] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: eliminarTurismo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['turismo'] });
		},
	});

	return {
		createTurismo: createMutation,
		updateTurismo: updateMutation,
		deleteTurismo: deleteMutation,
	};
};

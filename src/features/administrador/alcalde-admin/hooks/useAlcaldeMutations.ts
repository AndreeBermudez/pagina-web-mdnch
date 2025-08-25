import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearAlcalde, editarAlcalde, eliminarAlcalde } from '../services';
import type { AlcaldeEditForm } from '../schemas/alcalde.schema';

export const useAlcaldeMutations = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: crearAlcalde,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['alcalde'] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: number; data: Partial<AlcaldeEditForm> }) => editarAlcalde(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['alcalde'] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: eliminarAlcalde,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['alcalde'] });
		},
	});

	return {
		createAlcalde: createMutation,
		updateAlcalde: updateMutation,
		deleteAlcalde: deleteMutation,
	};
};

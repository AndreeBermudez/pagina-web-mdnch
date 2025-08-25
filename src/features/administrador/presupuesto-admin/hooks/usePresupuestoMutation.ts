import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearPresupuesto } from '../services/crearPresupuesto';
import type { PresupuestoEdit } from '../schemas/presupuesto.schema';
import { editarPresupuesto } from '../services/editarPresupuesto';
import { eliminarPresupuesto } from '../services/eliminarPresupuesto';

export const usePresupuestoMutation = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: crearPresupuesto,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['presupuestos'] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: number; data: Partial<PresupuestoEdit> }) => editarPresupuesto(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['presupuestos'] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: eliminarPresupuesto,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['presupuestos'] });
		},
	});

	return {
		createPresupuesto: createMutation,
		updatePresupuesto: updateMutation,
		deletePresupuesto: deleteMutation,
	};
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NumeroEmergenciaRequest } from '../schemas/numeroEmergencia.schema';
import { actualizarEmergencia } from '../services/actualizarEmergencia';
import { eliminarEmergencia } from '../services/eliminarEmergencia';
import { crearEmergencia } from '../services/crearEmergencia';

export const useNumeroEmergenciaMutations = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: crearEmergencia,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['numeroEmergencia'] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: number; data: NumeroEmergenciaRequest }) => actualizarEmergencia(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['numeroEmergencia'] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: eliminarEmergencia,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['numeroEmergencia'] });
		},
	});

	return {
		crearNumeroEmergencia: createMutation,
		actualizarNumeroEmergencia: updateMutation,
		eliminarNumeroEmergencia: deleteMutation,
	};
};
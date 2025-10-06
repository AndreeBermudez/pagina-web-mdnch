import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearDestino } from '../services/crearDestino';
import { actualizarDestino } from '../services/actualizarDestino';
import { eliminarDestino } from '../services/eliminarDestino';
import type { DestinoFormData, DestinoUpdateData } from '../services/destino.interface';

export const useDestinosMutations = () => {
	const queryClient = useQueryClient();

	const crearDestinoMutation = useMutation({
		mutationFn: async (data: DestinoFormData) => {
			const result = await crearDestino(data);
			if (!result.success) {
				throw new Error(result.message);
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['destinos'] });
		},
	});

	const actualizarDestinoMutation = useMutation({
		mutationFn: async ({ id, data }: { id: number; data: DestinoUpdateData }) => {
			const result = await actualizarDestino(id, data);
			if (!result.success) {
				throw new Error(result.message);
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['destinos'] });
		},
	});

	const eliminarDestinoMutation = useMutation({
		mutationFn: async (id: number) => {
			const result = await eliminarDestino(id);
			if (!result.success) {
				throw new Error(result.message);
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['destinos'] });
		},
	});

	return {
		crearDestino: crearDestinoMutation,
		actualizarDestino: actualizarDestinoMutation,
		eliminarDestino: eliminarDestinoMutation,
	};
};
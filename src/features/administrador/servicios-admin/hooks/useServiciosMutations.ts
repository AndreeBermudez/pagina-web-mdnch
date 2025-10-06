import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearServicio } from '../services/crearServicio';
import { actualizarServicio } from '../services/actualizarServicio';
import { eliminarServicio } from '../services/eliminarServicios';
import type { ServicioFormData, ServicioUpdateData } from '../services/servicios.interface';

export const useServiciosMutations = () => {
	const queryClient = useQueryClient();

	const crearServicioMutation = useMutation({
		mutationFn: async (data: ServicioFormData) => {
			const result = await crearServicio(data);
			if (!result.success) {
				throw new Error(result.message);
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['servicios'] });
		},
	});

	const actualizarServicioMutation = useMutation({
		mutationFn: async ({ id, data }: { id: number; data: ServicioUpdateData }) => {
			const result = await actualizarServicio(id, data);
			if (!result.success) {
				throw new Error(result.message);
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['servicios'] });
		},
	});

	const eliminarServicioMutation = useMutation({
		mutationFn: async (id: number) => {
			const result = await eliminarServicio(id);
			if (!result.success) {
				throw new Error(result.message);
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['servicios'] });
		},
	});

	return {
		crearServicio: crearServicioMutation,
		actualizarServicio: actualizarServicioMutation,
		eliminarServicio: eliminarServicioMutation,
	};
};
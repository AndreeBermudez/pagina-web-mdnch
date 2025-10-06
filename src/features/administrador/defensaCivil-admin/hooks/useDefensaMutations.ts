import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearDefensaCivil } from '../services/crearDefensa';
import { actualizarDefensaCivil } from '../services/actualizarDefensa';
import { eliminarDefensaCivil } from '../services/eliminarDefensa';
import type { DefensaCivilFormData, DefensaCivilUpdateData } from '../services/defensa.interface';

export const useDefensaMutations = () => {
	const queryClient = useQueryClient();

	const crearDefensaMutation = useMutation({
		mutationFn: async (data: DefensaCivilFormData) => {
			const result = await crearDefensaCivil(data);
			if (!result.success) {
				throw new Error(result.message);
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['defensas'] });
		},
	});

	const actualizarDefensaMutation = useMutation({
		mutationFn: async ({ id, data }: { id: number; data: DefensaCivilUpdateData }) => {
			const result = await actualizarDefensaCivil(id, data);
			if (!result.success) {
				throw new Error(result.message);
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['defensas'] });
		},
	});

	const eliminarDefensaMutation = useMutation({
		mutationFn: async (id: number) => {
			const result = await eliminarDefensaCivil(id);
			if (!result.success) {
				throw new Error(result.message);
			}
			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['defensas'] });
		},
	});

	return {
		crearDefensa: crearDefensaMutation,
		actualizarDefensa: actualizarDefensaMutation,
		eliminarDefensa: eliminarDefensaMutation,
	};
};
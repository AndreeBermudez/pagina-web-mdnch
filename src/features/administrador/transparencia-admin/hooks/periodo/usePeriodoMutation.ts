import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearPeriodo } from '../../services/periodo/crearPeriodo';
import { editarPeriodo } from '../../services/periodo/editarPeriodo';
import { eliminarPeriodo } from '../../services/periodo/eliminarPeriodo';
import type { PeriodoRequest } from '../../schemas/transparencia.schema';

export const useCreatePeriodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (periodo: PeriodoRequest) => crearPeriodo(periodo),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['periodos'] });
			if (variables.transparenciaId) {
				queryClient.invalidateQueries({
					queryKey: ['periodos', 'transparencia', variables.transparenciaId],
				});
			}
		},
	});
};

export const useUpdatePeriodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: Partial<PeriodoRequest> }) => editarPeriodo(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['periodos'] });
			queryClient.invalidateQueries({
				queryKey: ['periodos', variables.id],
			});
			if (variables.data.transparenciaId) {
				queryClient.invalidateQueries({
					queryKey: ['periodos', 'transparencia', variables.data.transparenciaId],
				});
			}
		},
	});
};

export const useDeletePeriodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => eliminarPeriodo(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['periodos'] });
		},
	});
};

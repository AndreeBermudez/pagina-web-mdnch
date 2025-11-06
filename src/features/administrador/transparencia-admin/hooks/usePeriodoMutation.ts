import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearPeriodo } from '../services/periodo/crearPeriodo';
import { editarPeriodo } from '../services/periodo/editarPeriodo';
import { eliminarPeriodo } from '../services/periodo/eliminarPeriodo';
import type { PeriodoRequest } from '../schemas/transparencia.schema';

interface UpdatePeriodoParams {
	id: number;
	data: Partial<PeriodoRequest>;
}

export const usePeriodoMutation = () => {
	const queryClient = useQueryClient();
	
	const invalidatePeriodos = () => {
		queryClient.invalidateQueries({ queryKey: ['periodos'] });
	};

	const invalidateTransparencias = () => {
		queryClient.invalidateQueries({ queryKey: ['transparencias'] });
	};

	const invalidateTransparenciaDetalle = () => {
		// Invalida todas las queries de transparencia por ID
		queryClient.invalidateQueries({ queryKey: ['transparencia'] });
	};

	const invalidateAll = () => {
		invalidatePeriodos();
		invalidateTransparencias();
		invalidateTransparenciaDetalle();
	};

	const createPeriodo = useMutation({
		mutationFn: (data: PeriodoRequest) => crearPeriodo(data),
		onSuccess: invalidateAll,
	});

	const updatePeriodo = useMutation({
		mutationFn: ({ id, data }: UpdatePeriodoParams) => editarPeriodo(id, data),
		onSuccess: invalidateAll,
	});

	const deletePeriodo = useMutation({
		mutationFn: (id: number) => eliminarPeriodo(id),
		onSuccess: invalidateAll,
	});

	return {
		createPeriodo,
		updatePeriodo,
		deletePeriodo,
	};
};

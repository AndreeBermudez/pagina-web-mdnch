import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearTransparencia } from '../services/transparencia/crearTransparencia';
import { editarTransparencia } from '../services/transparencia/editarTransparencia';
import { eliminarTransparencia } from '../services/transparencia/eliminarTransparencia';
import type { TransparenciaRequest } from '../schemas/transparencia.schema';

interface UpdateTransparenciaParams {
	id: number;
	data: Partial<TransparenciaRequest>;
}

export const useTransparenciaMutation = () => {
	const queryClient = useQueryClient();
	const invalidateTransparencias = () => {
		queryClient.invalidateQueries({ queryKey: ['transparencias'] });
	};

	const createTransparencia = useMutation({
		mutationFn: (data: TransparenciaRequest) => crearTransparencia(data),
		onSuccess: invalidateTransparencias,
	});

	const updateTransparencia = useMutation({
		mutationFn: ({ id, data }: UpdateTransparenciaParams) => editarTransparencia(id, data),
		onSuccess: invalidateTransparencias,
	});

	const deleteTransparencia = useMutation({
		mutationFn: (id: number) => eliminarTransparencia(id),
		onSuccess: invalidateTransparencias,
	});

	return {
		createTransparencia,
		updateTransparencia,
		deleteTransparencia,
	};
};

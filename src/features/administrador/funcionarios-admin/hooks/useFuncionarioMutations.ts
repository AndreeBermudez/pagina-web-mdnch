import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FuncionarioRequest } from '../schemas/funcionario.schema';
import { actualizarFuncionario, createFuncionario, deleteFuncionario } from '../servicios';

export const useFuncionarioMutations = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: createFuncionario,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['funcionarios'] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: number; data: Partial<FuncionarioRequest> }) =>
			actualizarFuncionario(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['funcionarios'] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteFuncionario,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['funcionarios'] });
		},
	});

	return {
		crearFuncionario: createMutation,
		actualizarFuncionario: updateMutation,
		eliminarFuncionario: deleteMutation,
	};
};

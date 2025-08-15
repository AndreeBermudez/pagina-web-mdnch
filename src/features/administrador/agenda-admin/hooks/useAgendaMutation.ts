import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearAgenda } from '../services/crearAgenda';
import type { AgendaRequest } from '../schemas/agenda.schema';
import { editarAgenda } from '../services/editarAgenda';
import { eliminarAgenda } from '../services/eliminarAgenda';

export const useAgendaMutations = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: (data: AgendaRequest) => crearAgenda(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['agenda'] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({id, data}: {id: number, data: Partial<AgendaRequest>}) => editarAgenda(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['agenda'] });
		},
	});

    const deleteMutation = useMutation({
		mutationFn: (id: number) => eliminarAgenda(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['agenda'] });
		},
	});

    return {
        crearAgenda: createMutation,
        actualizarAgenda: updateMutation,
        eliminarAgenda: deleteMutation,
    };
};

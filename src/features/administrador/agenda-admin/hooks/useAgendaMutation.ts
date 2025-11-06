import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearAgenda } from '../services/crearAgenda';
import type  { AgendaRequest } from '../schemas/agenda.schema';
import { editarAgenda } from '../services/editarAgenda';
import { eliminarAgenda } from '../services/eliminarAgenda';

export const useAgendaMutations = () => {
	const queryClient = useQueryClient();

 const createAgenda = useMutation({
        mutationFn: (data: AgendaRequest ) => crearAgenda(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agendas'] });
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || 'Error al crear la agenda';
            queryClient.setQueryData(['error'], errorMessage);
            throw new Error(errorMessage);
        },
    });

    const updateAgenda = useMutation({
        mutationFn: ({ id, data }: { id: number; data: AgendaRequest  }) => editarAgenda(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agendas'] });
        },
        onError: (error: any) => {
       
            const errorMessage = error?.response?.data?.message || 'Error al actualizar la agenda';
            queryClient.setQueryData(['error'], errorMessage);
            throw new Error(errorMessage);
        },
    });

    const deleteAgenda = useMutation({
        mutationFn: (id: number) => eliminarAgenda(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agendas'] });
        },
        onError: (error: any) => {
       
            const errorMessage = error?.response?.data?.message || 'Error al eliminar la agenda';
            queryClient.setQueryData(['error'], errorMessage);
            throw new Error(errorMessage);
        },
    });

    return {
        crearAgenda: createAgenda,
        actualizarAgenda: updateAgenda,
        eliminarAgenda: deleteAgenda,
    };
};

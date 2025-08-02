import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearEvento } from '../services/crearEvento';
import { actualizarEvento } from '../services/actualizarEvento';
import type { EventoRequest } from '../schemas/evento.schema';
import { eliminarEvento } from '../services/eliminarEvento';

export const useEventosMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: crearEvento,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['eventos'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<EventoRequest> }) => actualizarEvento(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['eventos'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: eliminarEvento,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['eventos'] });
        },
    });

    return {
        crearEvento: createMutation,
        actualizarEvento: updateMutation,
        eliminarEvento: deleteMutation,
    };
};

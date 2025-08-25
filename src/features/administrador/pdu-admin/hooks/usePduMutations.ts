import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { PduEditForm } from '../schemas/pdu.schema';
import { editarPdu } from '../services/editarPdu';
import { eliminarPdu } from '../services/eliminarPdu';
import { crearPdu } from '../services/crearPdu';

export const usePduMutations = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: crearPdu,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['pdu'] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: number; data: Partial<PduEditForm> }) => editarPdu(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['pdu'] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: eliminarPdu,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['pdu'] });
		},
	});

	return {
		crearPdu: createMutation,
		actualizarPdu: updateMutation,
		eliminarPdu: deleteMutation,
	};
};

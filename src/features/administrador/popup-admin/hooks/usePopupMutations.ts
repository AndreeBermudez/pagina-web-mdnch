import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { PopupRequest } from '../schemas/popup.schema';
import { actualizarPopup } from '../service/actualizarPopup';
import { eliminarPopup } from '../service/eliminarPopup';
import { crearPopup } from '../service/crearPopup';

export const usePopupMutations = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: crearPopup,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['popup'] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ popupId, data }: { popupId: number; data: Partial<PopupRequest> }) => actualizarPopup(popupId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['popup'] });
		},
	});

	const deleteMutation = useMutation({
		mutationFn: eliminarPopup,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['popup'] });
		},
	});

	return {
		crearPopup: createMutation,
		actualizarPopup: updateMutation,
		eliminarPopup: deleteMutation,
	};
};
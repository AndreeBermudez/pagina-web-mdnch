import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSlider } from '../services/createSlider';
import { updateSlider } from '../services/updateSlider';
import type { SliderRequest } from '../schemas/slider.schema';
import { deleteSlider } from '../services/deleteSlider';

export const useSliderMutations = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: createSlider,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['sliders'] });
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ data, id }: { data: Partial<SliderRequest>; id: number }) => updateSlider(data, id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['sliders'] });
		},
	});

    const deleteMutation = useMutation({
        mutationFn: deleteSlider,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sliders'] });
        },
    })

	return {
        crearSlider: createMutation,
        actualizarSlider: updateMutation,
        eliminarSlider: deleteMutation,
    };
};

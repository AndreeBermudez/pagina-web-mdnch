import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearAlcaldeBanner } from '../services/crearAlcaldeBanner';
import { actualizarAlcaldeBanner } from '../services/actualizarAlcaldeBanner';
import { eliminarAlcaldeBanner } from '../services/eliminarAlcaldeBanner';
import type { AlcaldeBannerFormData, AlcaldeBannerUpdateData } from '../services/AlcaldeBanner.interface';

export const useAlcaldeBannerMutations = () => {
	const queryClient = useQueryClient();

	const createAlcaldeBanner = useMutation({
		mutationFn: (data: AlcaldeBannerFormData) => crearAlcaldeBanner(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['alcaldesBanner'] });
		},
	});

	const updateAlcaldeBanner = useMutation({
		mutationFn: ({ id, data }: { id: number; data: AlcaldeBannerUpdateData }) =>
			actualizarAlcaldeBanner(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['alcaldesBanner'] });
		},
	});

	const deleteAlcaldeBanner = useMutation({
		mutationFn: (id: number) => eliminarAlcaldeBanner(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['alcaldesBanner'] });
		},
	});

	return {
		createAlcaldeBanner,
		updateAlcaldeBanner,
		deleteAlcaldeBanner,
	};
};
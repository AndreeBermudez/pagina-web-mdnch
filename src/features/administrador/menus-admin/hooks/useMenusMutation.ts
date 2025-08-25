import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMenu } from '../services/createMenu';
import { deleteMenu } from '../services/deleteMenu';
import { updateMenu } from '../services/updateMenu';
import type { MenuUpdate } from '../schemas/menu.schema';

export const useMenuCreate = () => {
	const queryCliente = useQueryClient();
	return useMutation({
		mutationFn: createMenu,
		onSuccess: () => {
			queryCliente.invalidateQueries({ queryKey: ['menus'] });
		},
	});
};

export const useMenuUpdate = () => {
	const queryCliente = useQueryClient();
	return useMutation({
		mutationFn: ({ id, menu }: { id: number; menu: MenuUpdate }) => updateMenu(id, menu),
		onSuccess: () => {
			queryCliente.invalidateQueries({ queryKey: ['menus'] });
		},
	});
};

export const useMenuDelete = () => {
	const queryCliente = useQueryClient();
	return useMutation({
		mutationFn: deleteMenu,
		onSuccess: () => {
			queryCliente.invalidateQueries({ queryKey: ['menus'] });
		},
	});
};

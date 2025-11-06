import { useMutation, useQueryClient } from '@tanstack/react-query';
import { crearUsuario } from '../services/crearUsuario';
import type { UsuarioCreateRequest } from '../schemas/usuario.schema';

export const useUsuarioMutation = () => {
	const queryClient = useQueryClient();

	const createUsuario = useMutation({
		mutationFn: (data: UsuarioCreateRequest) => crearUsuario(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['usuarios'] });
		},
		onError: (error: any) => {
			const errorMessage = error?.response?.data?.message || 'Error al crear el usuario';
			queryClient.setQueryData(['error'], errorMessage);
			throw new Error(errorMessage);
		},
	});

	return {
		createUsuario,
	};
};

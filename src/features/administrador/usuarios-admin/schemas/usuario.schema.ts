import { z } from 'zod';

// Schema para crear usuario
export const usuarioCreateSchema = z.object({
	nombres: z.string().min(1, 'El nombre es obligatorio'),
	apellidos: z.string().min(1, 'Los apellidos son obligatorios'),
	username: z.string().min(1, 'El usuario es obligatorio'),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
	rol: z.enum(['ADMINISTRADOR', 'IMAGEN', 'ALCALDIA'], {
		errorMap: () => ({ message: 'Selecciona un rol válido' }),
	}),
});

// Schema para la respuesta del usuario
export const usuarioResponseSchema = z.object({
	id: z.number(),
	nombres: z.string(),
	apellidos: z.string(),
	username: z.string(),
	rol: z.string(),
});

// Tipos TypeScript
export type UsuarioCreateRequest = z.infer<typeof usuarioCreateSchema>;
export type UsuarioResponse = z.infer<typeof usuarioResponseSchema>;

import z from 'zod';

export const funcionarioSchema = z.object({
	nombre: z.string().min(1, { message: 'El nombre no puede estar vacío' }),
	apellido: z.string().min(1, { message: 'El apellido no puede estar vacío' }),
	cargo: z.string().min(1, { message: 'El cargo no puede estar vacío' }),
	contacto: z.string().min(1, { message: 'El contacto no puede estar vacío' }),
	direccionImagen: z.instanceof(File, { message: 'Debe seleccionar una imagen' }),
});

export const funcionarioEdit = funcionarioSchema.omit({ direccionImagen: true }).extend({
	direccionImagen: z.instanceof(File, { message: 'Debe seleccionar una imagen' }).optional(),
});

export const funcionarioResponse = funcionarioSchema.omit({ direccionImagen: true }).extend({
	funcionarioId: z.number(),
	direccionImagen: z.string().min(1, { message: 'La imagen no puede estar vacía' }),
	fechaCreacion: z.string().min(1, { message: 'La fecha de creación no puede estar vacía' }),
	fechaModificacion: z.string().min(1, { message: 'La fecha de modificación no puede estar vacía' }),
	responsable: z.string().min(1, { message: 'El responsable no puede estar vacío' }),
});

export type FuncionarioRequest = z.infer<typeof funcionarioSchema>;
export type FuncionarioEdit = z.infer<typeof funcionarioEdit>;
export type Funcionario = z.infer<typeof funcionarioResponse>;

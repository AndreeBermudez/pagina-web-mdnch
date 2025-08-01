import { z } from 'zod';

const sliderBaseSchema = z.object({
	titulo: z.tuple([
		z.string().min(1, 'Primer título requerido'),
		z.string().min(1, 'Segundo título requerido'),
		z.string().min(1, 'Tercer título requerido'),
	]),
	descripcion: z
		.string({ message: 'La descripción es requerida' })
		.min(1, { message: 'La descripción no puede estar vacía' }),
	activo: z.string({ message: 'La propiedad activo falló' }),
});

export const sliderFormSchema = sliderBaseSchema
	.extend({
		direccionImagen: z.instanceof(File, { message: 'Debe seleccionar una imagen' }),
	})
	.omit({ activo: true });

export const sliderEditSchema = sliderBaseSchema
.extend({
	direccionImagen: z.instanceof(File, { message: 'Debe seleccionar una imagen' }).optional(),
})
.omit({ activo: true });

export const sliderRequestSchema = sliderFormSchema.extend({
	activo: z.literal('true'),
});

export const sliderResponseSchema = sliderBaseSchema.extend({
	bannerId: z.string(),
	direccionImagen: z.string(),
	fechaCreacion: z.string(),
	fechaActualizacion: z.string().optional(),
});

export type SliderFormData = z.infer<typeof sliderFormSchema>;
export type SliderEditData = z.infer<typeof sliderEditSchema>;
export type SliderRequest = z.infer<typeof sliderRequestSchema>;
export type SliderResponse = z.infer<typeof sliderResponseSchema>;

import { z } from 'zod';

export const defensaCivilSchemaBase = z.object({
	titulo: z
		.string()
		.min(1, { message: 'El título es obligatorio' })
		.max(255, { message: 'El título no puede exceder 255 caracteres' }),
	descripcion: z
		.string()
		.min(1, { message: 'La descripción es obligatoria' })
		.max(1000, { message: 'La descripción no puede exceder 1000 caracteres' }),
	numeroSerenazgo: z
		.string()
		.min(1, { message: 'El número de Serenazgo es obligatorio' })
		.max(20, { message: 'El número no puede exceder 20 caracteres' }),
	numeroSalud: z
		.string()
		.min(1, { message: 'El número de Salud es obligatorio' })
		.max(20, { message: 'El número no puede exceder 20 caracteres' }),
	numeroBomberos: z
		.string()
		.min(1, { message: 'El número de Bomberos es obligatorio' })
		.max(20, { message: 'El número no puede exceder 20 caracteres' }),
});

export const defensaCivilCreateSchema = defensaCivilSchemaBase.extend({
	rutaPdf: z
		.instanceof(File)
		.optional()
		.refine(
			(file) => !file || file.type === 'application/pdf',
			{ message: 'El archivo debe ser un PDF' }
		)
		.refine(
			(file) => !file || file.size <= 10 * 1024 * 1024,
			{ message: 'El archivo no puede exceder 10MB' }
		),
});

export const defensaCivilUpdateSchema = defensaCivilSchemaBase.extend({
	rutaPdf: z
		.instanceof(File)
		.optional()
		.refine(
			(file) => !file || file.type === 'application/pdf',
			{ message: 'El archivo debe ser un PDF' }
		)
		.refine(
			(file) => !file || file.size <= 10 * 1024 * 1024,
			{ message: 'El archivo no puede exceder 10MB' }
		),
});

export const defensaCivilResponseSchema = defensaCivilSchemaBase.extend({
	defensaCivilId: z.number(),
	rutaPdf: z.string(),
	fechaCreacion: z.string().optional(),
	fechaModificacion: z.string().optional(),
});

// Tipos TypeScript generados automáticamente
export type DefensaCivilCreateRequest = z.infer<typeof defensaCivilCreateSchema>;
export type DefensaCivilUpdateRequest = z.infer<typeof defensaCivilUpdateSchema>;
export type DefensaCivilResponse = z.infer<typeof defensaCivilResponseSchema>;
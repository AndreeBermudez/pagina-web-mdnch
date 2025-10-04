import z from 'zod';

export const controlInternoSchemaBase = z.object({
    titulo: z.string().min(1, { message: 'El título no puede estar vacío' })
        .max(255, { message: 'El título no puede superar 255 caracteres' }),
});

export const controlInternoRequest = controlInternoSchemaBase.extend({
    rutaPdf: z.instanceof(File, { message: 'Debe seleccionar un archivo PDF' })
        .refine((file) => file.type === 'application/pdf', {
            message: 'El archivo debe ser un PDF'
        })
        .refine((file) => file.size <= 10 * 1024 * 1024, { 
            message: 'El archivo no puede superar 10MB'
        }),
});

export const controlInternoEditForm = controlInternoSchemaBase.extend({
    rutaPdf: z.instanceof(File)
        .refine((file) => file.type === 'application/pdf', {
            message: 'El archivo debe ser un PDF'
        })
        .refine((file) => file.size <= 10 * 1024 * 1024, { 
            message: 'El archivo no puede superar 10MB'
        })
        .optional(),
});

export const controlInternoResponse = controlInternoSchemaBase.extend({
    controlInternoId: z.number(),
    rutaPdf: z.string().min(1, { message: 'La ruta del PDF no puede estar vacía' }),
});

export const controlInternoIdSchema = z.object({
    controlInternoId: z.number().positive({ message: 'El ID debe ser un número positivo' }),
});

export type ControlInternoForm = z.infer<typeof controlInternoRequest>;
export type ControlInternoEditForm = z.infer<typeof controlInternoEditForm>;
export type ControlInternoRequest = z.infer<typeof controlInternoRequest>;
export type ControlInternoResponse = z.infer<typeof controlInternoResponse>;
export type ControlInternoId = z.infer<typeof controlInternoIdSchema>;
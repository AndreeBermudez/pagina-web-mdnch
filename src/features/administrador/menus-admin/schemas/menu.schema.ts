import z from "zod";

export const menuRequestSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
    path: z.string().nullable().optional(),
    paginaId: z.coerce.number().nullable().optional(),
    padreId: z.coerce.number().nullable().optional(),
    orden: z.coerce.number().min(1, 'El orden debe ser al menos 1'),
});

export const menuUpdateSchema = menuRequestSchema.partial();

const menuBaseResponseSchema = menuRequestSchema.extend({
    id: z.number(),
    estado: z.boolean(),
    responsable: z.string(),
    fechaCreacion: z.string(),
    fechaModificacion: z.string(),
});

export const menuResponseSchema = menuBaseResponseSchema.extend({
    hijos: z.array(menuBaseResponseSchema).optional(),
});

export type MenuRequest = z.infer<typeof menuRequestSchema>;
export type MenuResponse = z.infer<typeof menuResponseSchema>;
export type MenuUpdate = z.infer<typeof menuUpdateSchema>;
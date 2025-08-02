import z from "zod";

export const eventoSchemaBase = z.object({
    fecha: z.string().min(1, 'La fecha es requerida'),
    titulo: z.string().min(1, 'El título es requerido'),
    categoria : z.string().min(1, 'La categoría es requerida'),
    descripcion: z.string().min(1, 'La descripción es requerida'),
    horaInicio: z.string().min(1, 'La hora de inicio es requerida'),
    horaFin: z.string().min(1, 'La hora de fin es requerida'),
    ubicacion: z.string().min(1, 'La ubicación es requerida'),
})

export const eventoEditForm = eventoSchemaBase.extend({
    direccionImagen: z.instanceof(File, {message: "Debe subir una imagen"}).optional(),
})

export const eventoForm = eventoSchemaBase.extend({
    direccionImagen: z.instanceof(File, {message: "Debe subir una imagen"})
})

export const eventoResponse = eventoSchemaBase.extend({
    eventoId: z.number(),
    direccionImagen: z.string(),
})

export type EventoEditForm = z.infer<typeof eventoEditForm>;
export type EventoForm = z.infer<typeof eventoForm>;
export type EventoResponse = z.infer<typeof eventoResponse>;
export type EventoRequest = z.infer<typeof eventoForm>;
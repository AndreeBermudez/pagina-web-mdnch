import { z } from 'zod';

export const popupSchema = z.object({
    titulo: z.string().min(1, 'El título es obligatorio').max(255, 'El título es muy largo'),
    direccionImagen: z.any().refine(
        (file) => file instanceof File,
        'La imagen es obligatoria'
    ).refine(
        (file) => file?.size <= 10 * 1024 * 1024,
        'La imagen debe ser menor a 10MB'
    ).refine(
        (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file?.type),
        'Solo se permiten imágenes PNG, JPG o JPEG'
    ),
});

export const popupEditSchema = z.object({
    titulo: z.string().min(1, 'El título es obligatorio').max(255, 'El título es muy largo'),
    direccionImagen: z.any().refine(
        (file) => file instanceof File,
        'La imagen es obligatoria'
    ).refine(
        (file) => file?.size <= 10 * 1024 * 1024,
        'La imagen debe ser menor a 10MB'
    ).refine(
        (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file?.type),
        'Solo se permiten imágenes PNG, JPG o JPEG'
    ).optional(),
});

export type PopupRequest = z.infer<typeof popupSchema>;
export type PopupEditRequest = z.infer<typeof popupEditSchema>;

export interface PopupResponse {
    popupId: number;
    titulo: string;
    direccionImagen: string;
    fechaCreacion?: string;
    estado?: boolean;
}
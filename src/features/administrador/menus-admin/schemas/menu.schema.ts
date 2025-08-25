//  {
//       "id": 5,
//       "nombre": "Menu Raiz 2",
//       "path": null,
//       "paginaId": null,
//       "padreId": null,
//       "orden": 1,
//       "estado": true,
//       "responsable": "Admin",
//       "fechaCreacion": "2025-08-11",
//       "fechaModificacion": "2025-08-11",
//       "hijos": [
//         {
//           "id": 7,
//           "nombre": "Submenu 3",
//           "path": "pagina/submenu-3",
//           "paginaId": null,
//           "padreId": 5,
//           "orden": 1,
//           "estado": true,
//           "responsable": "Admin",
//           "fechaCreacion": "2025-08-25",
//           "fechaModificacion": "2025-08-25",
//           "hijos": []
//         }
//       ]
//     },
import z from "zod";

export const menuRequestSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
    path : z.string().nullable().optional(),
    paginaId: z.number().nullable().optional(),
    padreId: z.number().nullable().optional(),
    orden: z.number().min(1, 'El orden debe ser al menos 1'),
})

const menuBaseResponseSchema = menuRequestSchema.extend({
    id: z.number(),
    estado: z.boolean(),
    responsable: z.string(),
    fechaCreacion: z.string(),
    fechaModificacion: z.string(),
})

export const menuResponseSchema = menuBaseResponseSchema.extend({
    hijos: z.array(menuBaseResponseSchema).optional(),
})

export type MenuRequest = z.infer<typeof menuRequestSchema>;
export type MenuResponse = z.infer<typeof menuResponseSchema>;
export type MenuUpdate = Partial<MenuRequest>;
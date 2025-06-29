
export interface Miembro {
  id: number;
  nombre: string;
  apellido: string;
}

export interface Consejo {
  consejoMuniId?: number;
  nombre: string;
  apellido: string;
  cargo: string;
  area: string;
  direccionImagen?: string;
  fechaCreacion?: string;
  miembros?: Miembro[];
}

export const createConsejo = async (formData: FormData): Promise<boolean> => {
  try {
    const res = await fetch(
      'http://localhost:8080/api/authentication/consejo-muni/registrar',
      {
        method: 'POST',
        body: formData,
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  } catch (err) {
    console.error('Error al crear consejo:', err);
    return false;
  }
};

export const editarConsejo = async (
  id: number,
  formData: FormData
): Promise<boolean> => {
  try {
    const res = await fetch(`http://localhost:8080/api/authentication/consejo-muni/${id}`, {
      method: "PUT", // O PATCH si tu backend lo requiere
      body: formData,
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return true;
  } catch (err) {
    console.error("Error al editar consejo:", err);
    return false;
  }
};

export const getAllConsejos = async (): Promise<Consejo[]> => {
  try {
    const res = await fetch(
      'http://localhost:8080/api/authentication/consejo-muni'
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json.data;

    return data.map((c: any) => ({
      consejoMuniId: c.consejoMuniId,
      nombre: c.nombre,
      apellido: c.apellido,
      cargo: c.cargo,
      area: c.area,
      direccionImagen: c.direccionImagen,
      fechaCreacion: c.fechaCreacion,
      miembros: Array.isArray(c.miembros)
        ? c.miembros.map((m: any) => ({
            id: m.id,
            nombre: m.nombre,
            apellido: m.apellido,
          }))
        : [],
    }));
  } catch (err) {
    console.error('Error al obtener todos los consejos:', err);
    return [];
  }
};

export const registrarMiembroEquipo = async (
  consejoMuniId: number,
  miembro: { nombre: string; apellido: string }
): Promise<boolean> => {
  try {
    const res = await fetch("http://localhost:8080/api/authentication/equipo-trabajo/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        consejoMuniId,
        nombre: miembro.nombre,
        apellido: miembro.apellido,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("Error al registrar miembro:", err);
    return false;
  }
};
export const getConsejoById = async (id: number): Promise<Consejo | null> => {
  try {
    const res = await fetch(`http://localhost:8080/api/authentication/consejo-muni/${id}`);
    if (!res.ok) throw new Error("Error al obtener consejo por ID");
    const json = await res.json();

    const data = json.data;
    return {
      consejoMuniId: data.consejoMuniId,
      nombre: data.nombre,
      apellido: data.apellido,
      cargo: data.cargo,
      area: data.area,
      direccionImagen: data.direccionImagen,
      fechaCreacion: data.fechaCreacion,
      miembros: data.equipos.map((e: any) => ({
        id: e.equipoId,
        nombre: e.nombre,
        apellido: e.apellido,
      })),
    };
  } catch (error) {
    console.error("Error al obtener consejo:", error);
    return null;
  }
};

export async function eliminarConsejo(id: number): Promise<boolean> {
  try {
    const res = await fetch(`http://localhost:8080/api/authentication/consejo-muni/${id}`, {
      method: "DELETE",
    });

    return res.ok;
  } catch (error) {
    console.error("Error eliminando consejo:", error);
    return false;
  }
}

//END POINT PARA EDITAR MIEMBRO DE EQUIPO DE MANERA INDEPENDIENTE 

export const editarMiembroEquipo = async (
  equipoId: number,
  miembro: { nombre: string; apellido: string }
): Promise<boolean> => {
  try {
    const res = await fetch(`http://localhost:8080/api/authentication/equipo-trabajo-edit/${equipoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: miembro.nombre,
        apellido: miembro.apellido,
      }),
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return true;
  } catch (err) {
    console.error("Error al editar miembro:", err);
    return false;
  }
};



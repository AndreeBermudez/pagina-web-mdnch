export interface Organigrama {
  organigramaId: number;
  direccionImagen: string;
  fechaCreacion: string;
  responsable: string;
}

export const registrarOrganigrama = async (formData: FormData): Promise<boolean> => {
  try {
    const res = await fetch("http://localhost:8080/api/authentication/organigrama/registrar", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return true;
  } catch (error) {
    console.error("Error al registrar organigrama:", error);
    return false;
  }
};

export const ListaOrganigramas = async (): Promise<Organigrama[]> => {
  try {
    const res = await fetch("http://localhost:8080/api/authentication/organigrama");
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error al obtener organigramas:", error);
    return [];
  }
};

export const eliminarOrganigrama = async (id: number): Promise<boolean> => {
  try {
    const res = await fetch(`http://localhost:8080/api/authentication/organigrama/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    console.error("Error al eliminar organigrama:", error);
    return false;
  }
};
export const actualizarOrganigrama = async (
  id: number,
  formData: FormData
): Promise<boolean> => {
  try {
    const res = await fetch(`http://localhost:8080/api/authentication/organigrama/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return true;
  } catch (error) {
    console.error("Error al actualizar organigrama:", error);
    return false;
  }
};

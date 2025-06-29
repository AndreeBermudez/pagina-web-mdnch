export const crearAlcalde = async (formData: FormData): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:8080/api/authentication/alcaldes/crear", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return true;
  } catch (error) {
    console.error("Error al crear alcalde:", error);
    return false;
  }
};

export interface Alcalde {
  alcaldeId: number;
  nombre: string;
  apellido: string;
  descripcion: string;
  numeroObras: number;
  presupuesto: number;
  aprobacionCiudadana: string;
  experiencia: string;
  reconocimientos: string;
  compromiso: string;
  direccionImagen: string;
  fechaCreacion: string;
  periodo: string;
}

export const obtenerAlcaldes = async (): Promise<Alcalde[]> => {
  try {
    const res = await fetch("http://localhost:8080/api/authentication/alcaldes");
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error al obtener alcaldes:", error);
    return [];
  }
};

export const editarAlcalde = async (id: number, formData: FormData): Promise<boolean> => {
  try {
    const res = await fetch(`http://localhost:8080/api/authentication/alcaldeedit/${id}`, {
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    return true;
  } catch (error) {
    console.error("Error al editar alcalde:", error);
    return false;
  }
};

export const eliminarAlcalde = async (id: number): Promise<boolean> => {
  try {
    const res = await fetch(`http://localhost:8080/api/authentication/alcaldes/${id}`, {
      method: "DELETE",
    });

    return res.ok;
  } catch (error) {
    console.error("Error al eliminar alcalde:", error);
    return false;
  }
};


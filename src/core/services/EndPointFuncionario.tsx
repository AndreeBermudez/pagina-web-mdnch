interface Funcionario {
    id: number;
    nombre: string;
    apellido: string;
    cargo: string;
    contacto: string;
    direccionImagen?: string;
}
export interface UpdatePayload {
  nombre: string;
  apellido: string;
  cargo: string;
  contacto: string;
  direccionImagen?: string;
}

export const getFuncionarios = async (): Promise<Funcionario[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/authentication/funcionarios');
        const json = await response.json();

        const rawList: any[] = Array.isArray(json.data) ? json.data : [];

        const funcionarios: Funcionario[] = rawList.map(item => ({
            id: item.funcionarioId,
            nombre: item.nombre,
            apellido: item.apellido,
            cargo: item.cargo,
            contacto: item.contacto,
            direccionImagen: item.direccionImagen,
        }));
        return funcionarios;
    } catch (error) {
        return [];
    }
};

export const deleteFuncionario = async (id: number): Promise<boolean> => {
    try {
        const res = await fetch(
            `http://localhost:8080/api/authentication/funcionarios/${id}`,
            { method: 'DELETE' }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return true;
    } catch (err) {
        console.error('Error al eliminar funcionario:', err);
        return false;
    }
};

export const createFuncionario = async (formData: FormData): Promise<boolean> => {
    try {
        const res = await fetch(
            "http://localhost:8080/api/authentication/funcionarios/crear",
            {
                method: "POST",
                body: formData,

            }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return true;
    } catch (err) {
        console.error("Error al crear funcionario:", err);
        return false;
    }
};

export const updateFuncionarioJson = async (
  id: number,
  payload: UpdatePayload
): Promise<boolean> => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/authentication/funcionarios/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  } catch (err) {
    console.error("Error al actualizar funcionario (JSON):", err);
    return false;
  }
};
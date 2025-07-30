import { axiosInstance } from "../../api/axiosInstance";

export const editarTurismo = async (turismoId: number, formData: FormData): Promise<boolean> => {
    try {
        await axiosInstance.put(`turismo/${turismoId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return true;
    } catch (error) {
        console.error("Error al actualizar Turismo:", error);
        return false;
    }
}
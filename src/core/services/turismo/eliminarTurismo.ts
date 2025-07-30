import { axiosInstance } from "../../api/axiosInstance";

export const eliminarTurismo = async (turismoId: number): Promise<boolean> => {
    try {
        await axiosInstance.delete(`turismo/${turismoId}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar Turismo:", error);
        return false;
    }
}
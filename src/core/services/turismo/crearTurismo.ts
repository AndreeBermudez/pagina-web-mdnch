import { axiosInstance } from "../../api/axiosInstance";

export const crearTurismo = async (formData: FormData): Promise<boolean> => {
    try {
        await axiosInstance.post("turismo/crear", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return true;
    } catch (error) {
        console.error("Error al crear Turismo:", error);
        return false;
    }
};
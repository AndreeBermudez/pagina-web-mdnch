import { axiosInstance } from "../../api/axiosInstance";
import type { Turismo } from "./turismo.interface";

export const listarTurismo = async (): Promise<Turismo[]> => {
    try {
        const response = await axiosInstance.get("turismo/listar");
        const data = Array.isArray(response.data) ? response.data : 
                    Array.isArray(response.data.data) ? response.data.data : 
                    [];
        return data;
    } catch (error) {
        console.error("Error al listar Turismo:", error);
        return [];
    }
};
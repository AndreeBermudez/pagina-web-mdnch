import { axiosInstance } from "../../api/axiosInstance";

export const CrearPdu = async (formData: FormData): Promise<boolean> => {
    try {
        await axiosInstance.post("pdu/crear", formData);
        return true;
    } catch (error) {
        console.error("Error al crear PDU:", error);
        return false;
    }
};
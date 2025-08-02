import { axiosInstance } from "../../api/axiosInstance";

export const editarPdu = async (pduId: number, formData: FormData): Promise<boolean> => {
    try {
        await axiosInstance.put(`pdu/${pduId}`, formData);
        return true;
    } catch (error) {
        console.error("Error al actualizar PDU:", error);
        return false;
    }
};
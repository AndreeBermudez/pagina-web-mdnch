import { axiosWithoutMultipart } from "../../api/axiosInstance";

export const eliminarPdu = async (pduId: number): Promise<boolean> => {
    try {
        await axiosWithoutMultipart.delete(`pdu/${pduId}`);
        return true;
    } catch (error) {
        console.error("Error al eliminar PDU:", error);
        return false;
    }
};

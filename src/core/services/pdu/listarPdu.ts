import { axiosWithoutMultipart } from "../../api/axiosInstance";
import type { Pdu } from "./pdu.interface";

export interface PduResponse extends Pdu {
    pduId: number;
    fechaCreacion: string;
    fechaModificacion: string;
    responsable: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: PduResponse[];
}

export const listarPdu = async (): Promise<PduResponse[]> => {
    try {
        const response = await axiosWithoutMultipart.get<ApiResponse>("pdu/listar");  
        if (response.data.success && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.warn("API retornó success: false o data no es un array:", response.data);
            return [];
        }
    } catch (error) {
        console.error("Error al listar PDUs:", error);
        return [];
    }
};

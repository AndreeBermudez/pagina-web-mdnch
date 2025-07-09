import { axiosWithoutMultipart } from "../../api/axiosInstance";
import type { pdu } from "./pdu.interface";

export const CrearPdu = async (data: pdu): Promise<boolean> => {
    try {
        await axiosWithoutMultipart.post("pdu/crear", data);
        return true;
    } catch (error) {
        console.error("Algo a salido mal", error);
        return false;
    }
};
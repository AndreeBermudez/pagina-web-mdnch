import { axiosInstance } from '../../../../core/api/axiosInstance';

export interface ActualizarControlFormData {
    titulo: string;
    rutaPdf?: File | null; 
}

export const actualizarControl = async (
    controlInternoId: number, 
    data: ActualizarControlFormData
): Promise<boolean> => {
    try {
       
        const formData = new FormData();
        formData.append('titulo', data.titulo);
        
        if (data.rutaPdf) {
            formData.append('rutaPdf', data.rutaPdf);
        }

        await axiosInstance.put(
            `controlInterno/${controlInternoId}`, 
            formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        
        return true;
    } catch (error) {
        return false;
    }
};
import { axiosInstance } from '../../../../core/api/axiosInstance';

export interface ControlFormData {
    titulo: string;
    rutaPdf: File | null;
}
export const crearControl = async (data: ControlFormData): Promise<boolean> => {
    try {
     
        const formData = new FormData();
        formData.append('titulo', data.titulo);
        
        if (data.rutaPdf) {
            formData.append('rutaPdf', data.rutaPdf);
        }

        // Usar el endpoint correcto basado en tu imagen
        await axiosInstance.post('controlInterno/crear', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return true;
    } catch (error) {
        console.error('Error al crear control interno:', error);
        return false;
    }
};




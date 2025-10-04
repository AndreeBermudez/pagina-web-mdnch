
import type { 
    ControlInternoResponse, 
    ControlInternoRequest,
    ControlInternoEditForm 
} from '../schema/controlInterno.schema';

export type Control = ControlInternoResponse;
export type CreateControlRequest = ControlInternoRequest;
export type UpdateControlRequest = ControlInternoEditForm;


export interface ControlResponse {
    success: boolean;
    message?: string;
    data?: Control;
}

export interface ControlListResponse {
    success: boolean;
    message?: string;
    data: Control[];
}

export interface ControlFormData {
    titulo: string;
    rutaPdf: File | null;
}

export interface ActualizarControlFormData {
    titulo: string;
    rutaPdf?: File | null;
}

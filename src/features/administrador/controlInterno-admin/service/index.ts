
export { crearControl } from './crearControl';
export { actualizarControl } from './actualizarControl';
export { eliminarControl } from './eliminarControl';
export { 
    obtenerControles, 
    obtenerControlesCompleta,
    type ObtenerControlesResponse 
} from './obtenerControles';
export { 
    obtenerControlPorId, 
    obtenerControlPorIdCompleta,
    type ObtenerControlResponse 
} from './obtenerControlPorId';

export type { 
    Control, 
    ControlResponse, 
    CreateControlRequest,
    UpdateControlRequest,
    ControlListResponse,
    ControlFormData,
    ActualizarControlFormData
} from './control.interface';

export {
    controlInternoRequest,
    controlInternoEditForm,
    controlInternoResponse,
    controlInternoIdSchema,
    type ControlInternoForm,
    type ControlInternoEditForm,
    type ControlInternoRequest,
    type ControlInternoResponse,
    type ControlInternoId
} from '../schema/controlInterno.schema';
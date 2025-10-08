import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormInput, FormLabel } from '../../../../core/components/common/form';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import {
    numeroEmergenciaSchema,
    type NumeroEmergenciaRequest,
    type NumeroEmergenciaResponse,
} from '../schemas/numeroEmergencia.schema';
import { useNumeroEmergenciaMutations } from '../hooks/useNumeroEmergenciaMutations';

interface NumeroEmergenciaModalProps {
    handleModal: () => void;
    numeroEmergenciaEditable?: NumeroEmergenciaResponse | null;
}

export const NumeroEmergenciaForm = ({ handleModal, numeroEmergenciaEditable }: NumeroEmergenciaModalProps) => {
    const isEditing = Boolean(numeroEmergenciaEditable);
    const { register, handleSubmit, reset } = useForm<NumeroEmergenciaRequest>({
        resolver: zodResolver(numeroEmergenciaSchema),
        defaultValues: {
            titulo: numeroEmergenciaEditable?.titulo || '',
            numero: numeroEmergenciaEditable?.numero || '',
        },
    });
    const { success, error } = useNotifications();
    const { onError } = useFormatErrors();
    const { crearNumeroEmergencia, actualizarNumeroEmergencia } = useNumeroEmergenciaMutations();

    function onSubmit(data: NumeroEmergenciaRequest) {
        if (isEditing && numeroEmergenciaEditable) {
            actualizarNumeroEmergencia.mutate(
                { id: numeroEmergenciaEditable.id, data },
                {
                    onSuccess: () => {
                        success('Número de emergencia actualizado exitosamente');
                        handleModal();
                    },
                    onError: () => error('Error al actualizar el número de emergencia'),
                }
            );
        } else {
            crearNumeroEmergencia.mutate(data, {
                onSuccess: () => {
                    reset();
                    success('Número de emergencia creado exitosamente');
                    handleModal();
                },
                onError: () => error('Error al crear el número de emergencia'),
            });
        }
    }

    return (
        <>
            <div className='flex flex-col h-[calc(95vh-theme(spacing.28))]'>
                <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col h-full'>
                    <div className='flex-1 overflow-y-auto'>
                        <div className='p-6 space-y-6'>
                            <div className='grid grid-cols-1 gap-4'>
                                <div>
                                    <FormLabel label='Título' required />
                                    <FormInput 
                                        {...register('titulo')} 
                                        placeholder='Ingrese el título del número de emergencia (ej: Policía Nacional)' 
                                    />
                                </div>
                                <div>
                                    <FormLabel label='Número de Teléfono' required />
                                    <FormInput 
                                        {...register('numero')} 
                                        placeholder='Ingrese el número de emergencia (ej: 105)' 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sticky bottom-0 p-6 border-t rounded-b-xl bg-slate-50 border-slate-200'>
                        <div className='flex justify-end space-x-3 text-sm'>
                            <button
                                type='button'
                                onClick={handleModal}
                                className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
                                Cancelar
                            </button>
                            <button
                                type='submit'
                                className='px-4 py-2 text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800'>
                                {numeroEmergenciaEditable ? 'Actualizar' : 'Crear'} Número de Emergencia
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

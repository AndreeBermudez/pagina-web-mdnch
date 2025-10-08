import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormFileInput, FormInput, FormLabel } from '../../../../core/components/common/form';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import {
    popupSchema,
    popupEditSchema,
    type PopupRequest,
    type PopupEditRequest,
    type PopupResponse,
} from '../schemas/popup.schema';
import { usePopupMutations } from '../hooks/usePopupMutations';

interface PopupModalProps {
    handleModal: () => void;
    popupEditable?: PopupResponse | null;
}

export const PopupForm = ({ handleModal, popupEditable }: PopupModalProps) => {
    const isEditing = Boolean(popupEditable);
    const { register, handleSubmit, reset, setValue } = useForm<PopupRequest | PopupEditRequest>({
        resolver: zodResolver(isEditing ? popupEditSchema : popupSchema),
        defaultValues: {
            titulo: popupEditable?.titulo || '',
        },
    });
    const { success, error } = useNotifications();
    const { onError } = useFormatErrors();
    const { crearPopup, actualizarPopup } = usePopupMutations();

    function setImageHookForm(file: File | null) {
        if (file) {
            setValue('direccionImagen', file, { shouldValidate: true });
        }
    }

    function onSubmit(data: PopupRequest | PopupEditRequest) {
        const popupData = {
            titulo: data.titulo,
            direccionImagen: data.direccionImagen as File,
        };

        if (isEditing && popupEditable) {
            const updateData = data.direccionImagen
                ? popupData
                : { titulo: data.titulo };
            actualizarPopup.mutate(
                { popupId: popupEditable.popupId, data: updateData },
                {
                    onSuccess: () => {
                        success('Popup actualizado exitosamente');
                        handleModal();
                    },
                    onError: () => error('Error al actualizar el popup'),
                }
            );
        } else {
            crearPopup.mutate(popupData, {
                onSuccess: () => {
                    reset();
                    success('Popup creado exitosamente');
                    handleModal();
                },
                onError: () => error('Error al crear el popup'),
            });
        }
    }

    return (
        <>
            <div className='flex flex-col h-[calc(95vh-theme(spacing.28))]'>
                <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col h-full'>
                    <div className='flex-1 overflow-y-auto'>
                        <div className='p-6 space-y-6'>
                            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                <div>
                                    <FormLabel label='Título' required />
                                    <FormInput {...register('titulo')} placeholder='Ingrese el título del popup' />
                                </div>
                                <div>
                                    <FormLabel label='Imagen' required={!isEditing} />
                                    <FormFileInput
                                        id='imagen-input'
                                        accept='image/jpeg,image/png,image/jpg'
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            setImageHookForm(file);
                                        }}
                                    />
                                    <p className='mt-1 text-xs text-slate-500'>
                                        Formatos permitidos: PNG, JPG, JPEG. Máximo 10MB.
                                    </p>
                                    {popupEditable?.direccionImagen && (
                                        <div className='mt-3 p-3 border rounded-lg bg-slate-50 border-slate-200'>
                                            <div className='flex items-center justify-between'>
                                                <span className='text-sm text-slate-700'>Imagen actual:</span>
                                                <img 
                                                    src={popupEditable.direccionImagen} 
                                                    alt="Popup actual" 
                                                    className='w-16 h-16 object-cover rounded border'
                                                />
                                            </div>
                                        </div>
                                    )}
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
                                {popupEditable ? 'Actualizar' : 'Crear'} Popup
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

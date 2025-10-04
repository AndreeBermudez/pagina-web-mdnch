import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormFileInput, FormInput, FormLabel, ImagePreview } from '../../../../core/components/common/form';
import { FormTextArea } from '../../../../core/components/common/form/FormTextArea';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useImagePreview } from '../../../../core/hooks/useImagePreview';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useAlcaldeBannerMutations } from '../hooks/useAlcaldeBannerMutations';
import {
    alcaldeBannerEditForm,
    alcaldeBannerRequest,
    type AlcaldeBannerEditForm,
    type AlcaldeBannerRequest,
    type AlcaldeBanner,
} from '../schemas/alcaldeBanner.schema';

interface AlcaldeBannerModalProps {
    handleModal: () => void;
    alcaldeBannerEditable?: AlcaldeBanner | null;
}

export const AlcaldeBannerForm = ({ handleModal, alcaldeBannerEditable }: AlcaldeBannerModalProps) => {
    const isEditing = Boolean(alcaldeBannerEditable);
    const { register, handleSubmit, reset, setValue } = useForm<AlcaldeBannerRequest | AlcaldeBannerEditForm>({
        resolver: zodResolver(isEditing ? alcaldeBannerEditForm : alcaldeBannerRequest),
        defaultValues: {
            nombre: alcaldeBannerEditable?.nombre || '',
            apellido: alcaldeBannerEditable?.apellido || '',
            tituloBannerPage: alcaldeBannerEditable?.tituloBannerPage || '',
            descripcionBannerPage: alcaldeBannerEditable?.descripcionBannerPage || '',
        },
    });
    const { success, error } = useNotifications();
    const { onError } = useFormatErrors();
    const { createAlcaldeBanner, updateAlcaldeBanner } = useAlcaldeBannerMutations();
    const { previewImage, handleImageChange, removeImage } = useImagePreview({
        setValue: setImageHookForm,
        initialImage: alcaldeBannerEditable?.direccionImagen,
    });
    const [descripcionBanner, setDescripcionBanner] = React.useState(alcaldeBannerEditable?.descripcionBannerPage || '');

    function setImageHookForm(file: File | null) {
        if (file) {
            setValue('direccionImagen', file, { shouldValidate: true });
        }
    }

    function onSubmit(data: AlcaldeBannerRequest | AlcaldeBannerEditForm) {
        const alcaldeBannerData = {
            nombre: data.nombre,
            apellido: data.apellido,
            tituloBannerPage: data.tituloBannerPage,
            descripcionBannerPage: data.descripcionBannerPage,
        };
        
        if (isEditing && alcaldeBannerEditable) {
            const updateData = data.direccionImagen
                ? { ...alcaldeBannerData, direccionImagen: data.direccionImagen }
                : alcaldeBannerData;
            updateAlcaldeBanner.mutate(
                { id: alcaldeBannerEditable.alcaldeId, data: updateData },
                {
                    onSuccess: () => {
                        success('Alcalde Banner actualizado exitosamente');
                        handleModal();
                    },
                    onError: () => error('Error al actualizar el alcalde banner'),
                }
            );
        } else {
            createAlcaldeBanner.mutate(
                { ...alcaldeBannerData, direccionImagen: data.direccionImagen as File },
                {
                    onSuccess: () => {
                        reset();
                        removeImage();
                        success('Alcalde Banner creado exitosamente');
                        handleModal();
                    },
                    onError: () => error('Error al crear el alcalde banner'),
                }
            );
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
                                    <FormLabel label='Nombre' required />
                                    <FormInput {...register('nombre')} placeholder='Ingrese el nombre del alcalde' />
                                </div>
                                <div>
                                    <FormLabel label='Apellido' required />
                                    <FormInput {...register('apellido')} placeholder='Ingrese el apellido del alcalde' />
                                </div>
                            </div>
                            <div>
                                <FormLabel label='Título del Banner' required />
                                <FormInput {...register('tituloBannerPage')} placeholder='Ingrese el título para el banner' />
                            </div>
                            <div>
                                <FormLabel label='Descripción del Banner' required />
                                <div className="text-right text-xs text-slate-500 mb-1">
                                    {descripcionBanner.length}/500 caracteres
                                </div>
                                <FormTextArea
                                    value={descripcionBanner}
                                    onChange={e => {
                                        if (e.target.value.length <= 500) {
                                            setDescripcionBanner(e.target.value);
                                            setValue('descripcionBannerPage', e.target.value, { shouldValidate: true });
                                        }
                                    }}
                                    placeholder='Escriba la descripción para el banner del alcalde...'
                                    rows={4}
                                />
                            </div>
                            <div>
                                <FormLabel label='Imagen' required />
                                <div className='space-y-3'>
                                    <FormFileInput id='imagen-input' accept='image/*' onChange={handleImageChange} />
                                    {previewImage && <ImagePreview src={previewImage} alt='Vista previa' onRemove={removeImage} />}
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
                                {alcaldeBannerEditable ? 'Actualizar' : 'Crear'} Alcalde Banner
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

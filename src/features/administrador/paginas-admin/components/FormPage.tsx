import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RichTextEditor } from '../../../../core/components/common/editor/RichTextEditor';
import { FormFileInput, FormInput, FormLabel, ImagePreview } from '../../../../core/components/common/form';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useImagePreview } from '../../../../core/hooks/useImagePreview';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { paginaRequestSchema, type PaginaRequest, type PaginaResponse } from '../schemas/page.schema';
import { useCreatePage, useUpdatePage } from '../hooks/usePagesMutation';


interface FormPageProps {
    handleModal: () => void;
    paginaEditable?: PaginaResponse | null;
}

export const FormPage = ({ handleModal, paginaEditable }: FormPageProps) => {
    const isEditing = Boolean(paginaEditable);
    const { register, handleSubmit, reset, setValue, watch } = useForm<PaginaRequest>({
        resolver: zodResolver(paginaRequestSchema),
        defaultValues: {
            titulo: paginaEditable?.titulo || '',
            slug: paginaEditable?.slug || '',
            contenido: paginaEditable?.contenido || '',
        },
    });
    const { success, error } = useNotifications();
    const { onError } = useFormatErrors();
    const {mutate: crearPagina } = useCreatePage();
    const { mutate: actualizarPagina } = useUpdatePage();
    const { previewImage, handleImageChange, removeImage } = useImagePreview({
        setValue: setImageHookForm,
        initialImage: paginaEditable?.url,
    });

    function setImageHookForm(file: File | null) {
        if (file) {
            setValue('imagen', file, { shouldValidate: true });
        }
    }

    function onSubmit(data: PaginaRequest) {
        if (isEditing && paginaEditable) {
            const updateData = data.imagen ? { ...data, imagen: data.imagen } : data;
            actualizarPagina(
                { id: paginaEditable.id, data: updateData },
                {
                    onSuccess: () => {
                        success('Página actualizada exitosamente');
                        handleModal();
                    },
                    onError: () => error('Error al actualizar la página'),
                }
            );
        } else {
            crearPagina(
                { ...data, imagen: data.imagen as File },
                {
                    onSuccess: () => {
                        reset();
                        removeImage();
                        success('Página creada exitosamente');
                        handleModal();
                    },
                    onError: () => error('Error al crear la página'),
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
                                    <FormLabel label='Título' required />
                                    <FormInput {...register('titulo')} placeholder='Ingrese el título de la página' />
                                </div>
                                <div>
                                    <FormLabel label='Slug' required />
                                    <FormInput {...register('slug')} placeholder='Ingrese el slug de la página' />
                                </div>
                            </div>
                            <div>
                                <RichTextEditor
                                    value={watch('contenido') || ''}
                                    onBlur={(content) => setValue('contenido', content, { shouldValidate: true })}
                                    label='Descripción'
                                    required
                                    height={400}
                                    showPreview={false}
                                    placeholder='Escriba el contenido de la página...'
                                />
                            </div>
                            <div>
                                <FormLabel label='Imagen' />
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
                                {paginaEditable ? 'Actualizar' : 'Crear'} Página
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

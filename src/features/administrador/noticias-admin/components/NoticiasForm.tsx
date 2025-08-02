import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RichTextEditor } from '../../../../core/components/common/editor/RichTextEditor';
import { FormFileInput, FormInput, FormLabel, ImagePreview } from '../../../../core/components/common/form';
import { FormDateInput } from '../../../../core/components/common/form/FormDateInput';
import { FormSelect } from '../../../../core/components/common/form/FormSelect';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useImagePreview } from '../../../../core/hooks/useImagePreview';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useNoticiasMutations } from '../hooks/useNoticiasMutation';
import {
	noticiaEditForm,
	noticiaRequest,
	type NoticiaEditForm,
	type NoticiaForm,
	type NoticiaResponse,
} from '../schemas/noticia.schema';

interface NoticiaModalProps {
	handleModal: () => void;
	noticiaEditable?: NoticiaResponse | null;
}

export const NoticiasForm = ({ handleModal, noticiaEditable }: NoticiaModalProps) => {
	const isEditing = Boolean(noticiaEditable);
	const { register, handleSubmit, reset, setValue, watch } = useForm<NoticiaForm | NoticiaEditForm>({
		resolver: zodResolver(isEditing ? noticiaEditForm : noticiaRequest),
		defaultValues: {
			titulo: noticiaEditable?.titulo || '',
			categoria: noticiaEditable?.categoria || '',
			descripcion: noticiaEditable?.descripcion || '',
			fechaManual: noticiaEditable?.fechaManualCruda || '',
		},
	});
	const { success, error } = useNotifications();
	const { onError } = useFormatErrors();
	const { crearNoticia, actualizarNoticia } = useNoticiasMutations();
	const { previewImage, handleImageChange, removeImage } = useImagePreview({
		setValue: setImageHookForm,
		initialImage: noticiaEditable?.direccionImagen,
	});

	function setImageHookForm(file: File | null) {
		if (file) {
			setValue('imagen', file, { shouldValidate: true });
		}
	}

	function onSubmit(data: NoticiaForm | NoticiaEditForm) {
		const noticiaData = {
			titulo: data.titulo,
			categoria: data.categoria,
			descripcion: data.descripcion,
			fechaManual: data.fechaManual,
		};
		if (isEditing && noticiaEditable) {
			const updateData = data.imagen ? { ...noticiaData, imagen: data.imagen } : noticiaData;
			actualizarNoticia.mutate(
				{ id: noticiaEditable.noticiaId, data: updateData },
				{
					onSuccess: () => {
						success('Noticia actualizada exitosamente');
						handleModal();
					},
					onError: () => error('Error al actualizar la noticia'),
				}
			);
		} else {
			crearNoticia.mutate(
				{ ...noticiaData, imagen: data.imagen as File },
				{
					onSuccess: () => {
						reset();
						removeImage();
						success('Noticia creada exitosamente');
						handleModal();
					},
					onError: () => error('Error al crear la noticia'),
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
									<FormInput {...register('titulo')} placeholder='Ingrese el título de la noticia' />
								</div>
								<div>
									<FormLabel label='Categoría' required />
									<FormSelect {...register('categoria')}>
										<option value=''>Seleccionar categoría</option>
										<option value='Anuncios'>Anuncios</option>
										<option value='Eventos'>Eventos</option>
										<option value='Obras'>Obras</option>
										<option value='Servicios'>Servicios</option>
										<option value='Cultura'>Cultura</option>
										<option value='Deportes'>Deportes</option>
										<option value='Salud'>Salud</option>
										<option value='Educación'>Educación</option>
									</FormSelect>
								</div>
							</div>
							<div>
								<FormLabel label='Fecha de Publicación' required />
								<FormDateInput {...register('fechaManual')} />
							</div>
							<div>
								<RichTextEditor
									value={watch('descripcion') || ''}
									onBlur={(content) => setValue('descripcion', content, { shouldValidate: true })}
									label='Descripción'
									required
									height={250}
									showPreview={false}
									placeholder='Escriba la descripción de la noticia...'
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
								{noticiaEditable ? 'Actualizar' : 'Crear'} Noticia
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

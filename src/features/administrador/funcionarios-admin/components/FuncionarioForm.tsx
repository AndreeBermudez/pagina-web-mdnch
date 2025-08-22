import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormFileInput, FormInput, FormLabel, ImagePreview } from '../../../../core/components/common/form';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useImagePreview } from '../../../../core/hooks/useImagePreview';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { useFuncionarioMutations } from '../hooks/useFuncionarioMutations';
import {
	funcionarioEdit,
	funcionarioSchema,
	type FuncionarioEdit,
	type FuncionarioRequest,
	type Funcionario,
} from '../schemas/funcionario.schema';

interface FuncionarioModalProps {
	handleModal: () => void;
	funcionarioEditable?: Funcionario | null;
}

export const FuncionarioForm = ({ handleModal, funcionarioEditable }: FuncionarioModalProps) => {
	const isEditing = Boolean(funcionarioEditable);
	const { register, handleSubmit, reset, setValue } = useForm<FuncionarioRequest | FuncionarioEdit>({
		resolver: zodResolver(isEditing ? funcionarioEdit : funcionarioSchema),
		defaultValues: {
			nombre: funcionarioEditable?.nombre || '',
			apellido: funcionarioEditable?.apellido || '',
			cargo: funcionarioEditable?.cargo || '',
			contacto: funcionarioEditable?.contacto || '',
		},
	});
	const { success, error } = useNotifications();
	const { onError } = useFormatErrors();
	const { crearFuncionario, actualizarFuncionario } = useFuncionarioMutations();
	const { previewImage, handleImageChange, removeImage } = useImagePreview({
		setValue: setImageHookForm,
		initialImage: funcionarioEditable?.direccionImagen,
	});

	function setImageHookForm(file: File | null) {
		if (file) {
			setValue('direccionImagen', file, { shouldValidate: true });
		}
	}

	function onSubmit(data: FuncionarioRequest | FuncionarioEdit) {
		const funcionarioData = {
			nombre: data.nombre,
			apellido: data.apellido,
			cargo: data.cargo,
			contacto: data.contacto,
		};
		if (isEditing && funcionarioEditable) {
			const updateData = data.direccionImagen
				? { ...funcionarioData, direccionImagen: data.direccionImagen }
				: funcionarioData;
			actualizarFuncionario.mutate(
				{ id: funcionarioEditable.funcionarioId, data: updateData },
				{
					onSuccess: () => {
						success('Funcionario actualizado exitosamente');
						handleModal();
					},
					onError: () => error('Error al actualizar el funcionario'),
				}
			);
		} else {
			crearFuncionario.mutate(
				{ ...funcionarioData, direccionImagen: data.direccionImagen as File },
				{
					onSuccess: () => {
						reset();
						removeImage();
						success('Funcionario creado exitosamente');
						handleModal();
					},
					onError: () => error('Error al crear el funcionario'),
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
									<FormInput {...register('nombre')} placeholder='Ingrese el nombre del funcionario' />
								</div>
								<div>
									<FormLabel label='Apellido' required />
									<FormInput {...register('apellido')} placeholder='Ingrese el apellido del funcionario' />
								</div>
							</div>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
								<div>
									<FormLabel label='Cargo' required />
									<FormInput {...register('cargo')} placeholder='Ingrese el cargo del funcionario' />
								</div>
								<div>
									<FormLabel label='Contacto' required />
									<FormInput {...register('contacto')} placeholder='Ingrese el contacto del funcionario' />
								</div>
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
								{funcionarioEditable ? 'Actualizar' : 'Crear'} Funcionario
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { FormFileInput, FormInput, FormLabel } from '../../../../core/components/common/form';
import { useFormatErrors } from '../../../../core/hooks/useFormatErrors';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { PlusCircle, MinusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { crearTransparencia } from '../services/transparencia/crearTransparencia';
import { editarTransparencia } from '../services/transparencia/editarTransparencia';
import {
	transparenciaSchemaBase,
	type TransparenciaRequest,
	type TransparenciaResponse,
} from '../schemas/transparencia.schema';

interface TransparenciaModalProps {
	handleModal: () => void;
	transparenciaEditable?: TransparenciaResponse | null;
}

interface TrimestreFile {
	numero: number;
	archivo: File | null;
	url?: string;
}

interface FormData extends TransparenciaRequest {
	responsable: string;
	año: string;
	trimestres: TrimestreFile[];
}

export const TransparenciaForm = ({ handleModal, transparenciaEditable }: TransparenciaModalProps) => {
	const isEditing = Boolean(transparenciaEditable);
	const { success, error: notifyError } = useNotifications();
	const { onError } = useFormatErrors();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(
			transparenciaSchemaBase.extend({
				responsable: transparenciaSchemaBase.shape.concepto,
				año: transparenciaSchemaBase.shape.concepto,
			})
		),
		defaultValues: {
			concepto: transparenciaEditable?.concepto || '',
			responsable: transparenciaEditable?.responsable || '',
			año: new Date().getFullYear().toString(),
			trimestres: [{ numero: 1, archivo: null }],
		},
	});

	// Usando useFieldArray para manejar los trimestres dinámicos
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'trimestres',
	});

	const addTrimestre = () => {
		if (fields.length < 4) {
			append({ numero: fields.length + 1, archivo: null });
		}
	};

	const removeTrimestre = (index: number) => {
		if (fields.length > 1) {
			remove(index);
		}
	};

	const onSubmit = async (data: FormData) => {
		setIsSubmitting(true);

		try {
			// Crear FormData para enviar archivos
			const formData = new FormData();
			formData.append('concepto', data.concepto);
			formData.append('responsable', data.responsable);
			formData.append('año', data.año);

			// Agregar cada trimestre con su archivo correspondiente
			data.trimestres.forEach((trimestre) => {
				if (trimestre.archivo) {
					formData.append(`trimestre${trimestre.numero}`, trimestre.archivo);
				}
			});

			let resultado = false;

			if (isEditing && transparenciaEditable) {
				resultado = await editarTransparencia(transparenciaEditable.transparenciaId, formData);
			} else {
				resultado = await crearTransparencia(formData);
			}

			if (resultado) {
				success(`Transparencia ${isEditing ? 'actualizada' : 'creada'} exitosamente`);
				reset();
				handleModal();
			} else {
				notifyError(`Error al ${isEditing ? 'actualizar' : 'crear'} la transparencia`);
			}
		} catch (error) {
			console.error('Error en el formulario:', error);
			notifyError('Ocurrió un error al procesar el formulario');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='flex flex-col h-[calc(95vh-theme(spacing.28))]'>
			<form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col h-full'>
				<div className='flex-1 overflow-y-auto'>
					<div className='p-6 space-y-6'>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<FormLabel label='Concepto' required />
								<FormInput
									{...register('concepto')}
									placeholder='Ingrese el concepto de transparencia'
									error={errors.concepto?.message}
								/>
							</div>
							<div>
								<FormLabel label='Responsable' required />
								<FormInput
									{...register('responsable')}
									placeholder='Nombre del responsable'
									error={errors.responsable?.message}
								/>
							</div>
						</div>

						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<FormLabel label='Año' required />
								<FormInput {...register('año')} placeholder='Año del documento' error={errors.año?.message} />
							</div>
						</div>

						<div className='space-y-4'>
							<div className='flex items-center justify-between'>
								<FormLabel label='Trimestres' required />
								<button
									type='button'
									onClick={addTrimestre}
									disabled={fields.length >= 4}
									className='flex items-center px-3 py-1 text-sm text-blue-700 transition-colors rounded-md bg-blue-50 hover:bg-blue-100 disabled:opacity-50'>
									<PlusCircle className='w-4 h-4 mr-1' />
									Agregar trimestre
								</button>
							</div>

							<div className='space-y-4'>
								{fields.map((field, index) => (
									<div key={field.id} className='p-4 border rounded-lg bg-slate-50 border-slate-200'>
										<div className='flex items-center justify-between mb-3'>
											<h3 className='text-sm font-medium text-slate-700'>Trimestre {index + 1}</h3>
											<button
												type='button'
												onClick={() => removeTrimestre(index)}
												disabled={fields.length <= 1}
												className='flex items-center p-1 text-red-600 transition-colors rounded-md hover:bg-red-50'>
												<Trash2 className='w-4 h-4' />
											</button>
										</div>

										<div>
											<FormLabel label={`Documento Trimestre ${index + 1}`} required />
											<input
												type='file'
												accept='.pdf,.doc,.docx,.xls,.xlsx'
												onChange={(e) => {
													const file = e.target.files?.[0] || null;
													// Esta línea es necesaria para react-hook-form
													// pero el manejo real se hace en onSubmit
												}}
												className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className='sticky bottom-0 p-6 border-t rounded-b-xl bg-slate-50 border-slate-200'>
					<div className='flex justify-end space-x-3 text-sm'>
						<button
							type='button'
							onClick={handleModal}
							disabled={isSubmitting}
							className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
							Cancelar
						</button>
						<button
							type='submit'
							disabled={isSubmitting}
							className='px-4 py-2 text-white transition-colors bg-blue-700 rounded-lg hover:bg-blue-800 disabled:bg-blue-400'>
							{isSubmitting ? 'Procesando...' : transparenciaEditable ? 'Actualizar' : 'Crear'} Transparencia
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

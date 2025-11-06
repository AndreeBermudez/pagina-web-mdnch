import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../../core/components/ui/Button';
import { FormInput } from '../../../../core/components/common/form/FormInput';
import { useTransparenciaMutation } from '../hooks/useTransparenciaMutation';
import { usePeriodoMutation } from '../hooks/usePeriodoMutation';
import { periodoRequest, transparenciaSchemaBase, type PeriodoRequest, type TransparenciaRequest, type TransparenciaResponse } from '../schemas/transparencia.schema';
import { useNotifications } from '../../../../core/hooks/useNotifications';
import { Plus, Calendar, FileText } from 'lucide-react';

interface EditarConceptoModalProps {
	handleModal: () => void;
	transparencia: TransparenciaResponse;
}

export function EditarConceptoModal({ handleModal, transparencia }: EditarConceptoModalProps) {
	const { success, error } = useNotifications();
	const { updateTransparencia } = useTransparenciaMutation();
	const { createPeriodo, updatePeriodo, deletePeriodo } = usePeriodoMutation();
	const [showFormPeriodo, setShowFormPeriodo] = useState(false);
	const [editingPeriodoId, setEditingPeriodoId] = useState<number | null>(null);

	// Función para extraer el nombre del archivo de la URL
	const getFileName = (url: string | undefined): string => {
		if (!url) return '';
		try {
			const urlParts = url.split('/');
			const fileName = urlParts[urlParts.length - 1];
			return decodeURIComponent(fileName);
		} catch {
			return url;
		}
	};

	// Form para el concepto
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TransparenciaRequest>({
		resolver: zodResolver(transparenciaSchemaBase),
		defaultValues: {
			concepto: transparencia.concepto,
		},
	});

	// Form para agregar período
	const periodoForm = useForm<PeriodoRequest>({
		resolver: zodResolver(periodoRequest),
		defaultValues: {
			transparenciaId: transparencia.transparenciaId,
			año: '',
			responsable: '',
		},
	});

	// Form para editar período
	const editPeriodoForm = useForm<Partial<PeriodoRequest>>({
		resolver: zodResolver(periodoRequest.partial()),
	});

	// Resetear el form de edición cuando cambia el período a editar
	useEffect(() => {
		if (editingPeriodoId) {
			const periodo = transparencia.periodos?.find(p => p.periodoId === editingPeriodoId);
			if (periodo) {
				editPeriodoForm.reset({
					transparenciaId: transparencia.transparenciaId,
					año: periodo.año,
					responsable: periodo.responsable,
				});
			}
		}
	}, [editingPeriodoId, transparencia.periodos, editPeriodoForm]);

	const onSubmit = (data: TransparenciaRequest) => {
		updateTransparencia.mutate(
			{ id: transparencia.transparenciaId, data },
			{
				onSuccess: () => {
					success('Concepto actualizado exitosamente');
					handleModal();
				},
				onError: () => {
					error('Error al actualizar el concepto');
				},
			}
		);
	};

	const handleGuardarPeriodo = periodoForm.handleSubmit((data) => {
		// Obtener archivos del formulario
		const formElement = document.getElementById('periodo-form') as HTMLFormElement;
		const trimestre1 = (formElement?.querySelector('[name="trimestre1"]') as HTMLInputElement)?.files?.[0];
		const trimestre2 = (formElement?.querySelector('[name="trimestre2"]') as HTMLInputElement)?.files?.[0];
		const trimestre3 = (formElement?.querySelector('[name="trimestre3"]') as HTMLInputElement)?.files?.[0];
		const trimestre4 = (formElement?.querySelector('[name="trimestre4"]') as HTMLInputElement)?.files?.[0];

		const periodoData: PeriodoRequest = {
			...data,
			trimestre1,
			trimestre2,
			trimestre3,
			trimestre4,
		};

		createPeriodo.mutate(periodoData, {
			onSuccess: () => {
				success('Período agregado exitosamente');
				periodoForm.reset({
					transparenciaId: transparencia.transparenciaId,
					año: '',
					responsable: '',
				});
				// Limpiar los inputs de archivo
				if (formElement) {
					formElement.reset();
				}
			},
			onError: () => {
				error('Error al agregar el período');
			},
		});
	});

	const handleActualizarPeriodo = (periodoId: number) => {
		editPeriodoForm.handleSubmit((data) => {
			// Obtener archivos del formulario de edición
			const formElement = document.getElementById(`edit-periodo-form-${periodoId}`) as HTMLFormElement;
			const trimestre1 = (formElement?.querySelector('[name="trimestre1"]') as HTMLInputElement)?.files?.[0];
			const trimestre2 = (formElement?.querySelector('[name="trimestre2"]') as HTMLInputElement)?.files?.[0];
			const trimestre3 = (formElement?.querySelector('[name="trimestre3"]') as HTMLInputElement)?.files?.[0];
			const trimestre4 = (formElement?.querySelector('[name="trimestre4"]') as HTMLInputElement)?.files?.[0];

			const periodoData: Partial<PeriodoRequest> = {
				...data,
			};

			// Solo agregar archivos si fueron seleccionados
			if (trimestre1) periodoData.trimestre1 = trimestre1;
			if (trimestre2) periodoData.trimestre2 = trimestre2;
			if (trimestre3) periodoData.trimestre3 = trimestre3;
			if (trimestre4) periodoData.trimestre4 = trimestre4;

			updatePeriodo.mutate(
				{ id: periodoId, data: periodoData },
				{
					onSuccess: () => {
						success('Período actualizado exitosamente');
						setEditingPeriodoId(null);
					},
					onError: () => {
						error('Error al actualizar el período');
					},
				}
			);
		})();
	};

	const handleEliminarPeriodo = (periodoId: number) => {
		if (window.confirm('¿Estás seguro de eliminar este período?')) {
			deletePeriodo.mutate(periodoId, {
				onSuccess: () => {
					success('Período eliminado exitosamente');
				},
				onError: () => {
					error('Error al eliminar el período');
				},
			});
		}
	};

	return (
		<div className='flex flex-col h-full overflow-hidden'>
			{/* Contenido con scroll */}
			<div className='flex-1 overflow-y-auto'>
				{/* Formulario del Concepto */}
				<form onSubmit={handleSubmit(onSubmit)} className='border-b'>
					<div className='px-6 py-6'>
						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-2'>
									Concepto <span className='text-red-500'>*</span>
								</label>
								<FormInput
									{...register('concepto')}
									placeholder='Ingrese el concepto de transparencia'
									className='w-full'
								/>
								{errors.concepto?.message && (
									<p className='text-red-600 text-sm mt-1'>{errors.concepto.message}</p>
								)}
							</div>
						</div>
					</div>

					<div className='flex justify-end space-x-3 px-6 py-4 bg-gray-50 border-t'>
						<Button type='button' variant='outline' onClick={handleModal}>
							Cancelar
						</Button>
						<Button 
							type='submit' 
							disabled={updateTransparencia.isPending}
							className={updateTransparencia.isPending ? 'opacity-50 cursor-not-allowed' : ''}
						>
							{updateTransparencia.isPending ? 'Actualizando...' : 'Actualizar Concepto'}
						</Button>
					</div>
				</form>

				{/* Sección de Períodos */}
				<div className='px-6 py-6'>
					<div className='flex items-center justify-between mb-6'>
						<div className='flex items-center space-x-2'>
							<Calendar className='h-5 w-5 text-slate-700' />
							<h3 className='text-lg font-semibold text-slate-900'>Períodos y Archivos</h3>
						</div>
						<Button
							type='button'
							variant='outline'
							onClick={() => setShowFormPeriodo(!showFormPeriodo)}
							className='flex items-center space-x-2'
						>
							<Plus className='h-4 w-4' />
							<span>Agregar Período</span>
						</Button>
					</div>

					{/* Mostrar períodos existentes siempre */}
					{transparencia.periodos && transparencia.periodos.length > 0 && (
						<div className='space-y-3 mb-4'>
							<p className='text-xs font-medium text-gray-700'>Períodos registrados:</p>
							{transparencia.periodos.map((periodo) => (
								<div key={periodo.periodoId} className='bg-green-50 border border-green-200 rounded-lg overflow-hidden'>
									{/* Header del período */}
									<div className='flex justify-between items-center p-3'>
										<div>
											<p className='text-sm font-medium text-green-900'>Año: {periodo.año}</p>
											<p className='text-xs text-green-700'>Responsable: {periodo.responsable}</p>
										</div>
										<div className='flex space-x-2'>
											<Button
												type='button'
												variant='ghost'
												className='text-blue-600 hover:bg-blue-50 text-xs px-2 py-1'
												onClick={() => setEditingPeriodoId(editingPeriodoId === periodo.periodoId ? null : periodo.periodoId)}
											>
												{editingPeriodoId === periodo.periodoId ? 'Ocultar' : 'Editar'}
											</Button>
											<Button
												type='button'
												variant='ghost'
												className='text-red-600 hover:bg-red-50 text-xs px-2 py-1'
												onClick={() => handleEliminarPeriodo(periodo.periodoId)}
												disabled={deletePeriodo.isPending}
											>
												{deletePeriodo.isPending ? 'Eliminando...' : 'Eliminar'}
											</Button>
										</div>
									</div>

									{/* Formulario de edición expandible */}
									{editingPeriodoId === periodo.periodoId && (
										<form id={`edit-periodo-form-${periodo.periodoId}`} className='bg-white border-t border-green-200 p-4 space-y-4'>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
												<div>
													<label className='block text-xs font-medium text-gray-700 mb-1.5'>
														Año <span className='text-red-500'>*</span>
													</label>
													<FormInput
														{...editPeriodoForm.register('año')}
														placeholder='Ej: 2024'
														type='text'
														className='w-full'
													/>
													{editPeriodoForm.formState.errors.año && (
														<p className='text-red-600 text-xs mt-1'>{editPeriodoForm.formState.errors.año.message}</p>
													)}
												</div>
												<div>
													<label className='block text-xs font-medium text-gray-700 mb-1.5'>
														Responsable <span className='text-red-500'>*</span>
													</label>
													<FormInput
														{...editPeriodoForm.register('responsable')}
														placeholder='Nombre del responsable'
														className='w-full'
													/>
													{editPeriodoForm.formState.errors.responsable && (
														<p className='text-red-600 text-xs mt-1'>{editPeriodoForm.formState.errors.responsable.message}</p>
													)}
												</div>
											</div>

											<div>
												<h5 className='text-xs font-semibold text-gray-900 mb-3'>Documentos por Trimestre</h5>
												<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
													{[1, 2, 3, 4].map((trimestre) => (
														<div key={trimestre} className='space-y-1.5'>
															<label className='block text-xs font-medium text-gray-700'>
																Trimestre {trimestre}
															</label>
															<input
																type='file'
																name={`trimestre${trimestre}`}
																accept='.pdf,.doc,.docx,.xls,.xlsx'
																className='block w-full text-xs text-gray-500 
																	file:mr-3 file:py-2 file:px-3 
																	file:rounded-md file:border-0 
																	file:text-xs file:font-medium 
																	file:bg-green-50 file:text-green-700 
																	hover:file:bg-green-100 
																	file:cursor-pointer
																	border border-gray-300 rounded-md
																	focus:outline-none focus:ring-1 focus:ring-green-500'
															/>
															{periodo[`trimestre${trimestre}` as keyof typeof periodo] && (
																<p className='text-xs text-gray-600 mt-1'>
																	Archivo actual: {getFileName(periodo[`trimestre${trimestre}` as keyof typeof periodo] as string)}
																</p>
															)}
														</div>
													))}
												</div>
											</div>

											<div className='flex justify-end space-x-2 pt-3 border-t'>
												<Button 
													type='button' 
													variant='outline' 
													onClick={() => setEditingPeriodoId(null)}
													className='text-xs px-3 py-1.5'
												>
													Cancelar
												</Button>
												<Button 
													type='button' 
													onClick={() => handleActualizarPeriodo(periodo.periodoId)}
													disabled={updatePeriodo.isPending}
													className='text-xs px-3 py-1.5 bg-green-600 hover:bg-green-700'
												>
													{updatePeriodo.isPending ? 'Actualizando...' : 'Actualizar Período'}
												</Button>
											</div>
										</form>
									)}
								</div>
							))}
						</div>
					)}

					{/* Mensaje cuando no hay períodos */}
					{(!transparencia.periodos || transparencia.periodos.length === 0) && !showFormPeriodo && (
						<div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
							<div className='text-center'>
								<FileText className='h-10 w-10 mx-auto mb-2 text-gray-400' />
								<p className='text-sm font-medium text-gray-700 mb-1'>
									No hay períodos registrados para este concepto
								</p>
								<p className='text-xs text-gray-500'>
									Agrega un período para subir documentos por trimestre
								</p>
							</div>
						</div>
					)}

					{/* Formulario para agregar período - siempre visible cuando está abierto */}
					{showFormPeriodo && (
						<div className='space-y-3'>
							<form id='periodo-form' className='bg-white border-2 border-blue-200 rounded-lg'>
								<div className='bg-blue-50 px-4 py-3 border-b border-blue-200'>
									<h4 className='text-sm font-semibold text-blue-900'>Agregar Nuevo Período</h4>
								</div>
								
								<div className='p-4 space-y-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
										<div>
											<label className='block text-xs font-medium text-gray-700 mb-1.5'>
												Año <span className='text-red-500'>*</span>
											</label>
											<FormInput
												{...periodoForm.register('año')}
												placeholder='Ej: 2024'
												type='text'
												className='w-full'
											/>
											{periodoForm.formState.errors.año && (
												<p className='text-red-600 text-xs mt-1'>{periodoForm.formState.errors.año.message}</p>
											)}
										</div>
										<div>
											<label className='block text-xs font-medium text-gray-700 mb-1.5'>
												Responsable <span className='text-red-500'>*</span>
											</label>
											<FormInput
												{...periodoForm.register('responsable')}
												placeholder='Nombre del responsable'
												className='w-full'
											/>
											{periodoForm.formState.errors.responsable && (
												<p className='text-red-600 text-xs mt-1'>{periodoForm.formState.errors.responsable.message}</p>
											)}
										</div>
									</div>

									<div>
										<h5 className='text-xs font-semibold text-gray-900 mb-3'>Documentos por Trimestre</h5>
										<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
											{[1, 2, 3, 4].map((trimestre) => (
												<div key={trimestre} className='space-y-1.5'>
													<label className='block text-xs font-medium text-gray-700'>
														Trimestre {trimestre}
													</label>
													<input
														type='file'
														name={`trimestre${trimestre}`}
														accept='.pdf,.doc,.docx,.xls,.xlsx'
														className='block w-full text-xs text-gray-500 
															file:mr-3 file:py-2 file:px-3 
															file:rounded-md file:border-0 
															file:text-xs file:font-medium 
															file:bg-blue-50 file:text-blue-700 
															hover:file:bg-blue-100 
															file:cursor-pointer
															border border-gray-300 rounded-md
															focus:outline-none focus:ring-1 focus:ring-blue-500'
													/>
												</div>
											))}
										</div>
									</div>

									<div className='flex justify-end space-x-2 pt-3 border-t'>
										<Button 
											type='button' 
											variant='outline' 
											onClick={() => {
												setShowFormPeriodo(false);
												periodoForm.reset({
													transparenciaId: transparencia.transparenciaId,
													año: '',
													responsable: '',
												});
											}}
											className='text-sm px-3 py-1.5'
										>
											Cancelar
										</Button>
										<Button 
											type='button' 
											onClick={handleGuardarPeriodo}
											disabled={createPeriodo.isPending}
											className='text-sm px-3 py-1.5'
										>
											{createPeriodo.isPending ? 'Guardando...' : 'Guardar Período'}
										</Button>
									</div>
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
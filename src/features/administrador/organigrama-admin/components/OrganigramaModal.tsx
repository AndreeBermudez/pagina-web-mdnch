import { useState, useEffect } from 'react';
import { X, Trash2, Upload } from 'lucide-react';
import { registrarOrganigrama, actualizarOrganigrama } from '../../../../core/services/organigrama';
import type { Organigrama } from '../../../../core/services/organigrama';
interface FuncionarioModalProps {
	isOpen: boolean;
	onClose: () => void;
	onRefresh: () => void;
	initialData?: Organigrama | null;
}

export default function OrganigramaModal({ isOpen, onClose, onRefresh, initialData }: FuncionarioModalProps) {
	const [file, setFile] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	useEffect(() => {
		if (initialData && initialData.direccionImagen) {
			setPreviewImage(initialData.direccionImagen);
			setFile(null);
		}
	}, [initialData]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0] ?? null;
		setFile(f);
		if (f && f.type.match('image.*')) {
			const reader = new FileReader();
			reader.onload = (ev) => {
				if (ev.target?.result) setPreviewImage(ev.target.result as string);
			};
			reader.readAsDataURL(f);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file && !initialData?.direccionImagen) {
			alert('Selecciona una imagen antes de guardar.');
			return;
		}

		const formData = new FormData();
		if (file) formData.append('direccionImagen', file);

		let ok = false;
		if (initialData) {
			ok = await actualizarOrganigrama(initialData.organigramaId!, formData);
		} else {
			ok = await registrarOrganigrama(formData);
		}

		if (ok) {
			resetForm();
			onClose();
			onRefresh();
		} else {
			alert('Error al guardar organigrama.');
		}
	};

	const resetForm = () => {
		setFile(null);
		setPreviewImage(null);
	};

	const handleClose = () => {
		resetForm();
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-200'>
					<h3 className='text-xl font-semibold text-slate-900'>
						{initialData ? 'Editar Organigrama' : 'Nuevo Organigrama'}
					</h3>
					<button onClick={handleClose} className='p-2 transition-colors rounded-lg hover:bg-slate-100'>
						<X className='w-5 h-5 text-slate-500' />
					</button>
				</div>

				{/* Content - Scrollable */}
				<div className='flex-1 p-6 overflow-y-auto'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						{/* Imagen */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Imagen del Organigrama <span className='text-red-500'>*</span>
							</label>
							<div className='space-y-3'>
								<div className='flex items-center justify-center w-full'>
									<label className='flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors'>
										<div className='flex flex-col items-center justify-center pt-5 pb-6'>
											<Upload className='w-8 h-8 mb-2 text-slate-400' />
											<p className='mb-2 text-sm text-slate-500'>
												<span className='font-semibold'>Haz clic para cargar</span> o arrastra y suelta
											</p>
											<p className='text-xs text-slate-500'>PNG, JPG, JPEG (MAX. 10MB)</p>
										</div>
										<input
											type='file'
											accept='image/*'
											onChange={handleImageChange}
											required={!initialData}
											className='hidden'
										/>
									</label>
								</div>
								{previewImage && (
									<div className='flex items-start space-x-3 p-4 bg-slate-50 rounded-lg'>
										<img
											src={previewImage}
											alt='Vista previa'
											className='object-cover w-24 h-24 border rounded-lg border-slate-200 shadow-sm'
										/>
										<div className='flex-1'>
											<p className='text-sm font-medium text-slate-900 mb-1'>Vista previa del organigrama</p>
											<p className='text-xs text-slate-500 mb-3'>
												La imagen se mostrará en la tabla de organigramas
											</p>
											<button
												onClick={() => {
													setPreviewImage(null);
													setFile(null);
												}}
												className='flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 transition-colors'
												type='button'>
												<Trash2 className='w-4 h-4' />
												<span>Eliminar imagen</span>
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					</form>
				</div>

				{/* Footer - Fixed */}
				<div className='flex justify-end p-6 space-x-3 border-t border-slate-200 bg-slate-50 rounded-b-xl'>
					<button
						type='button'
						onClick={handleClose}
						className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
						Cancelar
					</button>
					<button
						onClick={handleSubmit}
						className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'>
						{initialData ? 'Actualizar' : 'Crear'} Organigrama
					</button>
				</div>
			</div>
		</div>
	);
}

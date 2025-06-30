import { useState, useEffect } from 'react';
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
			onClose();
			setFile(null);
			setPreviewImage(null);
			onRefresh();
		} else {
			alert('Error al guardar organigrama.');
		}
	};

	if (!isOpen) return null;
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/50'>
			<div className='w-full max-w-2xl bg-white rounded-lg shadow-xl'>
				<div className='p-4 border-b border-gray-300'>
					<h3 className='text-lg font-medium'>Formulario de Organigrama</h3>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='grid gap-4 p-4'>
						<div className='grid gap-2'>
							<label className='text-sm font-medium'>Imagen</label>
							<input
								type='file'
								accept='image/*'
								onChange={handleImageChange}
								className='border-2 p-1.5 rounded-md'
							/>
							{previewImage && (
								<div>
									<p className='mb-1 text-sm font-medium'>Vista previa:</p>
									<img
										src={previewImage}
										alt='Vista previa'
										className='max-w-[100px] max-h-[100px] object-contain rounded-md border border-gray-300 shadow-sm'
									/>
									<button
										onClick={() => setPreviewImage(null)}
										className='text-xs text-red-600 cursor-pointer hover:text-red-800'
										type='button'>
										Eliminar imagen
									</button>
								</div>
							)}
						</div>
					</div>
					<div className='flex justify-end gap-2 p-4 border-t border-gray-300'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-400'>
							Cancelar
						</button>
						<button
							type='submit'
							className='px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700'>
							Guardar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

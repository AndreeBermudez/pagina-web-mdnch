import { useState, useEffect } from 'react';
import { Trash2, X } from 'lucide-react';
import { createConsejo, editarConsejo } from '../../../../core/services/consejo';
import type { Consejo } from '../../../../core/services/consejo';

interface CreateConsejoModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave?: () => void;
	initialData?: Consejo | null;
}

export default function CreateConsejoModal({ isOpen, onClose, onSave, initialData }: CreateConsejoModalProps) {
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [cargo, setCargo] = useState('');
	const [area, setArea] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	useEffect(() => {
		if (initialData) {
			setNombre(initialData.nombre || '');
			setApellido(initialData.apellido || '');
			setCargo(initialData.cargo || '');
			setArea(initialData.area || '');
			setPreviewImage(initialData.direccionImagen || null);
			setFile(null); // limpiamos el file seleccionado
		}
	}, [initialData]);

	if (!isOpen) return null;

	const handleSave = async () => {
		const form = new FormData();
		form.append('nombre', nombre);
		form.append('apellido', apellido);
		form.append('cargo', cargo);
		form.append('area', area);
		if (file) form.append('direccionImagen', file);

		let ok = false;

		if (initialData?.consejoMuniId) {
			ok = await editarConsejo(initialData.consejoMuniId, form);
		} else {
			ok = await createConsejo(form);
		}

		if (ok) {
			onSave?.();
			onClose();
			setNombre('');
			setApellido('');
			setCargo('');
			setArea('');
			setFile(null);
			setPreviewImage(null);
		} else {
			alert('Error al guardar el consejo');
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-200'>
					<h3 className='text-xl font-semibold text-slate-900'>
						{initialData ? 'Editar Consejo' : 'Nuevo Consejo'}
					</h3>
					<button onClick={onClose} className='p-2 transition-colors rounded-lg hover:bg-slate-100'>
						<X className='w-5 h-5 text-slate-500' />
					</button>
				</div>

				{/* Content - Scrollable */}
				<div className='flex-1 p-6 overflow-y-auto'>
					<div className='space-y-6'>
						{/* Row 1: Nombre y Apellido */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Nombre <span className='text-red-500'>*</span>
								</label>
								<input
									id='nombre'
									value={nombre}
									onChange={(e) => setNombre(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el nombre'
								/>
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Apellido <span className='text-red-500'>*</span>
								</label>
								<input
									id='apellido'
									value={apellido}
									onChange={(e) => setApellido(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el apellido'
								/>
							</div>
						</div>

						{/* Row 2: Cargo y Área */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Cargo <span className='text-red-500'>*</span>
								</label>
								<input
									id='cargo'
									value={cargo}
									onChange={(e) => setCargo(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el cargo'
								/>
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Área <span className='text-red-500'>*</span>
								</label>
								<input
									id='area'
									value={area}
									onChange={(e) => setArea(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el área'
								/>
							</div>
						</div>

						{/* Row 3: Imagen */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Imagen {!initialData && <span className='text-red-500'>*</span>}
							</label>
							<div className='space-y-3'>
								<input
									id='direccionImagen'
									name='direccionImagen'
									type='file'
									accept='image/*'
									required={!initialData}
									className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
									onChange={(e) => {
										const f = e.target.files?.[0] || null;
										setFile(f);
										if (f) {
											const reader = new FileReader();
											reader.onloadend = () => setPreviewImage(reader.result as string);
											reader.readAsDataURL(f);
										} else {
											setPreviewImage(null);
										}
									}}
								/>
								{previewImage && (
									<div className='flex items-start space-x-3'>
										<img
											src={previewImage}
											alt='Vista previa'
											className='object-cover w-24 h-24 border rounded-lg border-slate-200'
										/>
										<button
											onClick={() => {
												setFile(null);
												setPreviewImage(null);
											}}
											className='flex items-center space-x-1 text-sm text-red-600 hover:text-red-800'
											type='button'>
											<Trash2 className='w-4 h-4' />
											<span>Eliminar</span>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Footer - Fixed */}
				<div className='flex justify-end p-6 space-x-3 border-t border-slate-200 bg-slate-50 rounded-b-xl'>
					<button
						type='button'
						onClick={onClose}
						className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
						Cancelar
					</button>
					<button
						onClick={handleSave}
						className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'>
						{initialData ? 'Actualizar' : 'Crear'} Consejo
					</button>
				</div>
			</div>
		</div>
	);
}

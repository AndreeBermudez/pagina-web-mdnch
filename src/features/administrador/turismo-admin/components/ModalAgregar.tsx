import { useState, useEffect } from 'react';
import { X,Upload,Trash2 } from 'lucide-react';
import { crearTurismo } from "../../../../core/services/turismo/crearTurismo";
import { editarTurismo } from "../../../../core/services/turismo/editarTurismo";
import type { Turismo } from "../../../../core/services/turismo/turismo.interface";
interface TurismoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Turismo | null;
}

export default function ModalAgregar({ isOpen, onClose, onSuccess, initialData }: TurismoModalProps) {
	const [titulo, setTitulo] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [lugar, setLugar] = useState('');
	const [ubicacion, setUbicacion] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	useEffect(() => {
		if (initialData) {
			setTitulo(initialData.titulo);
			setDescripcion(initialData.descripcion);
			setLugar(initialData.lugar);
			setUbicacion(initialData.ubicacion);
			setPreviewImage(initialData.direccionImagen);
		} else {
			setTitulo('');
			setDescripcion('');
			setLugar('');
			setUbicacion('');
			setFile(null);
			setPreviewImage(null);
		}
	}, [initialData]);
	if (!isOpen) return null;

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

		const form = new FormData();
		form.append('titulo', titulo);
		form.append('descripcion', descripcion);
		form.append('lugar', lugar);
		form.append('ubicacion', ubicacion);
		if (file) form.append('direccionImagen', file);

		console.log("Enviando datos:", {
			titulo,
			descripcion,
			lugar,
			ubicacion,
			file: file?.name || 'No file'
		});

		const success = initialData ? 
			await editarTurismo(initialData.turismoId!, form) : 
			await crearTurismo(form);

		console.log("Resultado de la operación:", success);

		if (success) {
			resetForm();
			onSuccess();
			onClose();
		} else {
			alert("Error al guardar. Por favor intenta de nuevo.");
		}
	};

	const resetForm = () => {
		setTitulo('');
		setDescripcion('');
		setLugar('');
		setUbicacion('');
		setFile(null);
		setPreviewImage(null);
	};

	const handleClose = () => {
		if (!initialData) resetForm();
		onClose();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-200'>
					<h3 className='text-xl font-semibold text-slate-900'>
						{initialData ? 'Editar Turismo' : 'Nuevo Turismo'}
					</h3>
					<button onClick={handleClose} className='p-2 transition-colors rounded-lg hover:bg-slate-100'>
						<X className='w-5 h-5 text-slate-500' />
					</button>
				</div>

				{/* Content - Scrollable */}
				<div className='flex-1 p-6 overflow-y-auto'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						{/* Row 1: Título y Descripción */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Título <span className='text-red-500'>*</span>
								</label>
								<input
									value={titulo}
									onChange={(e) => setTitulo(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el título'
								/>
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Descripción <span className='text-red-500'>*</span>
								</label>
								<input
									value={descripcion}
									onChange={(e) => setDescripcion(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese la descripción'
								/>
							</div>
                            <div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Lugar <span className='text-red-500'>*</span>
								</label>
								<input
									value={lugar}
									onChange={(e) => setLugar(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el lugar'
								/>
							</div>
                            <div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Ubicación <span className='text-red-500'>*</span>
								</label>
								<input
									value={ubicacion}
									onChange={(e) => setUbicacion(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese la ubicación'
								/>
							</div>
						</div>

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
									onChange={handleImageChange}
									required={!initialData}
									className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
								/>
								{previewImage && (
									<div className='flex items-start space-x-3'>
										<img
											src={previewImage}
											alt='Vista previa'
											className='object-cover w-24 h-24 border rounded-lg border-slate-200'
										/>
										<button
											onClick={() => setPreviewImage(null)}
											className='flex items-center space-x-1 text-sm text-red-600 hover:text-red-800'
											type='button'>
											<Trash2 className='w-4 h-4' />
											<span>Eliminar</span>
										</button>
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
						{initialData ? 'Actualizar' : 'Crear'} Turismo
					</button>
				</div>
			</div>
		</div>
	);
}

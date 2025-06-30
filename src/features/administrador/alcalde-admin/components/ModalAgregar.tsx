import { useState, useEffect } from 'react';
import { X, Trash2, Upload } from 'lucide-react';
import { crearAlcalde, editarAlcalde, type Alcalde } from '../../../../core/services/alcalde';
interface FuncionarioModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
	initialData?: Alcalde | null;
}

export default function ModalAgregar({ isOpen, onClose, onSuccess, initialData }: FuncionarioModalProps) {
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [numeroObras, setNumeroObras] = useState('');
	const [presupuesto, setPresupuesto] = useState('');
	const [aprobacion, setAprobacion] = useState('');
	const [experiencia, setExperiencia] = useState('');
	const [reconocimiento, setReconocimiento] = useState('');
	const [compromiso, setCompromiso] = useState('');
	const [periodo, setPeriodo] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	useEffect(() => {
		if (initialData) {
			setNombre(initialData.nombre);
			setApellido(initialData.apellido);
			setDescripcion(initialData.descripcion);
			setNumeroObras(initialData.numeroObras.toString());
			setPresupuesto(initialData.presupuesto.toString());
			setAprobacion(initialData.aprobacionCiudadana);
			setExperiencia(initialData.experiencia);
			setReconocimiento(initialData.reconocimientos);
			setCompromiso(initialData.compromiso);
			setPeriodo(initialData.periodo);
			setPreviewImage(initialData.direccionImagen);
		} else {
			setNombre('');
			setApellido('');
			setDescripcion('');
			setNumeroObras('');
			setPresupuesto('');
			setAprobacion('');
			setExperiencia('');
			setReconocimiento('');
			setCompromiso('');
			setPeriodo('');
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
		form.append('nombre', nombre);
		form.append('apellido', apellido);
		form.append('descripcion', descripcion);
		form.append('numeroObras', numeroObras);
		form.append('presupuesto', presupuesto);
		form.append('aprobacionCiudadana', aprobacion);
		form.append('atencionCiudadana', '24/7');
		form.append('periodo', periodo);
		form.append('experiencia', experiencia);
		form.append('reconocimientos', reconocimiento);
		form.append('compromiso', compromiso);
		if (file) form.append('direccionImagen', file);

		const success = initialData ? await editarAlcalde(initialData.alcaldeId, form) : await crearAlcalde(form);

		if (success) {
			resetForm();
			onSuccess();
			onClose();
		}
	};

	const resetForm = () => {
		setNombre('');
		setApellido('');
		setDescripcion('');
		setNumeroObras('');
		setPresupuesto('');
		setAprobacion('');
		setExperiencia('');
		setReconocimiento('');
		setCompromiso('');
		setPeriodo('');
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
						{initialData ? 'Editar Alcalde' : 'Nuevo Alcalde'}
					</h3>
					<button onClick={handleClose} className='p-2 transition-colors rounded-lg hover:bg-slate-100'>
						<X className='w-5 h-5 text-slate-500' />
					</button>
				</div>

				{/* Content - Scrollable */}
				<div className='flex-1 p-6 overflow-y-auto'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						{/* Row 1: Nombre y Apellido */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Nombre <span className='text-red-500'>*</span>
								</label>
								<input
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
									value={apellido}
									onChange={(e) => setApellido(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el apellido'
								/>
							</div>
						</div>

						{/* Row 2: Descripción y Período */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
									Período <span className='text-red-500'>*</span>
								</label>
								<input
									value={periodo}
									onChange={(e) => setPeriodo(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ej: 2022-2026'
								/>
							</div>
						</div>

						{/* Row 3: Obras y Presupuesto */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Número de Obras <span className='text-red-500'>*</span>
								</label>
								<input
									value={numeroObras}
									onChange={(e) => setNumeroObras(e.target.value)}
									required
									type='number'
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el número de obras'
								/>
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Presupuesto <span className='text-red-500'>*</span>
								</label>
								<input
									value={presupuesto}
									onChange={(e) => setPresupuesto(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el presupuesto'
								/>
							</div>
						</div>

						{/* Row 4: Aprobación y Experiencia */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Aprobación Ciudadana <span className='text-red-500'>*</span>
								</label>
								<input
									value={aprobacion}
									onChange={(e) => setAprobacion(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ej: 85%'
								/>
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Experiencia <span className='text-red-500'>*</span>
								</label>
								<input
									value={experiencia}
									onChange={(e) => setExperiencia(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese la experiencia'
								/>
							</div>
						</div>

						{/* Row 5: Reconocimientos y Compromiso */}
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Reconocimientos <span className='text-red-500'>*</span>
								</label>
								<input
									value={reconocimiento}
									onChange={(e) => setReconocimiento(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese los reconocimientos'
								/>
							</div>
							<div>
								<label className='block mb-2 text-sm font-medium text-slate-700'>
									Compromiso <span className='text-red-500'>*</span>
								</label>
								<input
									value={compromiso}
									onChange={(e) => setCompromiso(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el compromiso'
								/>
							</div>
						</div>

						{/* Row 6: Imagen */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Imagen del Alcalde {!initialData && <span className='text-red-500'>*</span>}
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
											<p className='text-sm font-medium text-slate-900 mb-1'>Vista previa de la imagen</p>
											<p className='text-xs text-slate-500 mb-3'>
												Esta imagen se mostrará en el perfil del alcalde
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
						{initialData ? 'Actualizar' : 'Crear'} Alcalde
					</button>
				</div>
			</div>
		</div>
	);
}

import { useState, useEffect } from 'react';
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
			onSuccess();
			onClose();
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/50'>
			<div className='w-full max-w-2xl bg-white rounded-lg shadow-xl'>
				<div className='p-2 border-b border-gray-300'>
					<h3 className='text-lg font-medium'>
						{initialData ? 'Formulario Editar Alcalde' : 'Formulario de Alcalde'}
					</h3>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='grid gap-2 p-2'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='grid gap-2'>
								<label className='text-sm font-medium'>Nombre</label>
								<input
									value={nombre}
									onChange={(e) => setNombre(e.target.value)}
									required
									className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'
									placeholder='Ingrese el nombre'
								/>
							</div>
							<div className='grid gap-2'>
								<label className='text-sm font-medium'>Apellido</label>
								<input
									value={apellido}
									onChange={(e) => setApellido(e.target.value)}
									required
									className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'
									placeholder='Ingrese el apellido'
								/>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div className='grid gap-2'>
								<label className='text-sm font-medium'>Descripción</label>
								<input
									value={descripcion}
									onChange={(e) => setDescripcion(e.target.value)}
									required
									className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'
									placeholder='Ingrese la descripción'
								/>
							</div>
							<div className='grid gap-2'>
								<label className='text-sm font-medium'>Obras</label>
								<input
									value={numeroObras}
									onChange={(e) => setNumeroObras(e.target.value)}
									required
									className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'
									placeholder='Ingrese el número de obras'
								/>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div className='grid gap-2'>
								<label className='text-sm font-medium'>Presupuesto</label>
								<input
									value={presupuesto}
									onChange={(e) => setPresupuesto(e.target.value)}
									required
									className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'
									placeholder='Ingrese el presupuesto'
								/>
							</div>
							<div className='grid gap-2'>
								<label className='text-sm font-medium'>Aprobación</label>
								<input
									value={aprobacion}
									onChange={(e) => setAprobacion(e.target.value)}
									required
									className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'
									placeholder='Ingrese la aprobación'
								/>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div className='grid gap-2'>
								<label className='text-sm font-medium'>Experiencia</label>
								<input
									value={experiencia}
									onChange={(e) => setExperiencia(e.target.value)}
									required
									className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'
									placeholder='Ingrese la experiencia'
								/>
							</div>
							<div className='grid gap-2'>
								<label className='text-sm font-medium'>Reconocimiento</label>
								<input
									value={reconocimiento}
									onChange={(e) => setReconocimiento(e.target.value)}
									required
									className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'
									placeholder='Ingrese el reconocimiento'
								/>
							</div>
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div className='grid gap-2'>
								<label className='text-sm font-medium'>Compromiso</label>
								<input
									value={compromiso}
									onChange={(e) => setCompromiso(e.target.value)}
									required
									className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'
									placeholder='Ingrese la Compromiso'
								/>
							</div>
							<div className='grid gap-2'>
								<label className='text-sm font-medium'>Periodo</label>
								<input
									value={periodo}
									onChange={(e) => setPeriodo(e.target.value)}
									required
									className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'
									placeholder='Ingrese el Periodo'
								/>
							</div>
						</div>
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
					<div className='flex justify-end gap-2 p-2 border-t border-gray-300'>
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

import { useState, useEffect } from 'react';
import { createFuncionario, ActualizarFuncionario } from '../../../../../services/EndPointFuncionario';

interface Funcionario {
	id: number;
	nombre: string;
	apellido: string;
	cargo: string;
	contacto: string;
	direccionImagen?: string;
}

interface FuncionarioModalProps {
	isOpen: boolean;
	onClose: () => void;
	modalType: 'add' | 'edit';
	initialData?: Funcionario | null;
	initialPreviewImage?: string | null;
	onSuccess?: () => void;
}

const FuncionarioModal = ({
	isOpen,
	onClose,
	modalType,
	initialData = null,
	onSuccess,
	initialPreviewImage = null,
}: FuncionarioModalProps) => {
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [cargo, setCargo] = useState('');
	const [contacto, setContacto] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(initialPreviewImage);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (modalType === 'edit' && initialData) {
			setNombre(initialData.nombre);
			setApellido(initialData.apellido);
			setCargo(initialData.cargo);
			setContacto(initialData.contacto);
			setPreviewImage(initialData.direccionImagen ?? null);
			setFile(null);
		}
	}, [isOpen, modalType, initialData]);

	if (!isOpen) return null;

	const title = modalType === 'add' ? 'Agregar Nuevo Funcionario' : 'Editar Funcionario';
	const confirmButtonText = modalType === 'add' ? 'Agregar Funcionario' : 'Guardar Cambios';

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
		setLoading(true);

		let ok: boolean;

		if (modalType === 'add') {
			const formData = new FormData();
			formData.append('nombre', nombre);
			formData.append('apellido', apellido);
			formData.append('cargo', cargo);
			formData.append('contacto', contacto);
			if (file) formData.append('direccionImagen', file);

			ok = await createFuncionario(formData);
		} else {
			const formData = new FormData();

			// Solo enviar campos modificados
			if (nombre !== initialData?.nombre) {
				formData.append('nombre', nombre);
			}
			if (apellido !== initialData?.apellido) {
				formData.append('apellido', apellido);
			}
			if (cargo !== initialData?.cargo) {
				formData.append('cargo', cargo);
			}
			if (contacto !== initialData?.contacto) {
				formData.append('contacto', contacto);
			}

			// Si hay nueva imagen seleccionada, enviarla
			if (file) {
				formData.append('direccionImagen', file);
			}

			ok = await ActualizarFuncionario(initialData!.id, formData);
		}

		setLoading(false); // ✅ MOVER AQUÍ

		if (ok) {
			onClose();
			onSuccess?.();
		}
	};

	return (
		<div className='fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg shadow-xl w-full max-w-2xl'>
				<div className='p-4 border-b border-gray-300'>
					<h3 className='text-lg font-medium'>{title}</h3>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='p-4'>
						<div className='grid gap-4'>
							<div className='grid grid-cols-2 gap-4'>
								<div className='grid gap-2'>
									<label htmlFor='nombre' className='text-sm font-medium'>
										Nombre
									</label>
									<input
										id='nombre'
										name='nombre'
										value={nombre}
										onChange={(e) => setNombre(e.target.value)}
										required
										className='flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='Ingrese el nombre'
									/>
								</div>
								<div className='grid gap-2'>
									<label htmlFor='apellido' className='text-sm font-medium'>
										Apellido
									</label>
									<input
										id='apellido'
										name='apellido'
										value={apellido}
										onChange={(e) => setApellido(e.target.value)}
										required
										className='flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
										placeholder='Ingrese el apellido'
									/>
								</div>
							</div>
							<div className='grid gap-2'>
								<label htmlFor='cargo' className='text-sm font-medium'>
									Cargo
								</label>
								<input
									id='cargo'
									name='cargo'
									value={cargo}
									onChange={(e) => setCargo(e.target.value)}
									required
									className='flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el cargo'
								/>
							</div>
							<div className='grid gap-2'>
								<label htmlFor='contacto' className='text-sm font-medium'>
									Contacto
								</label>
								<input
									id='contacto'
									name='contacto'
									type='email'
									value={contacto}
									onChange={(e) => setContacto(e.target.value)}
									required
									className='flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el email'
								/>
							</div>
							<div className='grid gap-2'>
								<label htmlFor='direccionImagen' className='text-sm font-medium'>
									Imagen:
								</label>
								<input
									id='direccionImagen'
									name='direccionImagen'
									type='file'
									accept='image/*'
									onChange={handleImageChange}
									className='border-2 p-1.5 rounded-md'
								/>
								{previewImage && (
									<div>
										<p className='text-sm font-medium mb-1'>Vista previa:</p>
										<img
											src={previewImage}
											alt='Vista previa'
											className='max-w-[100px] max-h-[100px] object-contain rounded-md border border-gray-300 shadow-sm'
										/>
										<button
											onClick={() => setPreviewImage(null)}
											className='text-xs text-red-600 hover:text-red-800 cursor-pointer'
											type='button'>
											Eliminar imagen
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className='p-4 border-t border-gray-300 flex justify-end gap-2'>
						<button
							type='button'
							onClick={onClose}
							className='inline-flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-300'>
							Cancelar
						</button>
						<button
							type='submit'
							disabled={loading}
							className='inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'>
							{loading ? 'Guardando...' : confirmButtonText}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FuncionarioModal;

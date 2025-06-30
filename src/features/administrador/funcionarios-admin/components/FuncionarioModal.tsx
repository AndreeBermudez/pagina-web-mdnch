import { useState, useEffect } from 'react';
import { Trash2, X } from 'lucide-react';
import {
	createFuncionario,
	actualizarFuncionario,
	type Funcionario,
} from '../../../../core/services/funcionarios';

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

			ok = await actualizarFuncionario(initialData!.funcionarioId, formData);
		}

		setLoading(false); // ✅ MOVER AQUÍ

		if (ok) {
			onClose();
			onSuccess?.();
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
			<div className='bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-slate-200'>
					<h3 className='text-xl font-semibold text-slate-900'>{title}</h3>
					<button onClick={onClose} className='p-2 transition-colors rounded-lg hover:bg-slate-100'>
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
									id='nombre'
									name='nombre'
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
									name='apellido'
									value={apellido}
									onChange={(e) => setApellido(e.target.value)}
									required
									className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									placeholder='Ingrese el apellido'
								/>
							</div>
						</div>

						{/* Row 2: Cargo */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Cargo <span className='text-red-500'>*</span>
							</label>
							<input
								id='cargo'
								name='cargo'
								value={cargo}
								onChange={(e) => setCargo(e.target.value)}
								required
								className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='Ingrese el cargo'
							/>
						</div>

						{/* Row 3: Contacto */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Contacto <span className='text-red-500'>*</span>
							</label>
							<input
								id='contacto'
								name='contacto'
								type='email'
								value={contacto}
								onChange={(e) => setContacto(e.target.value)}
								required
								className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								placeholder='Ingrese el email'
							/>
						</div>

						{/* Row 4: Imagen */}
						<div>
							<label className='block mb-2 text-sm font-medium text-slate-700'>
								Imagen {modalType === 'add' && <span className='text-red-500'>*</span>}
							</label>
							<div className='space-y-3'>
								<input
									id='direccionImagen'
									name='direccionImagen'
									type='file'
									accept='image/*'
									onChange={handleImageChange}
									required={modalType === 'add'}
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
						onClick={onClose}
						className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'>
						Cancelar
					</button>
					<button
						onClick={handleSubmit}
						disabled={loading}
						className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'>
						{loading ? 'Guardando...' : confirmButtonText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default FuncionarioModal;

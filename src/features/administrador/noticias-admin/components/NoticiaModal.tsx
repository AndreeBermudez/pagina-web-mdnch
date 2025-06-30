import { useState } from 'react';
import type { NoticiaRequest, NoticiaResponse } from '../../../../core/services/noticias/noticia.interface';
import { RichTextEditor } from '../../../../core/components/common/editor/RichTextEditor';

interface NoticiaModalProps {
	isOpen: boolean;
	handleModal: () => void;
	noticiaEditable?: NoticiaResponse | null;
	createNoticia: (data: NoticiaRequest) => Promise<boolean>;
	updateNoticia: (id: number, data: NoticiaRequest) => Promise<boolean>;
}

export const NoticiaModal = ({
	isOpen,
	handleModal,
	noticiaEditable,
	createNoticia,
	updateNoticia,
}: NoticiaModalProps) => {
	const [titulo, setTitulo] = useState(noticiaEditable?.titulo || '');
	const [categoria, setCategoria] = useState(noticiaEditable?.categoria || '');
	const [descripcion, setDescripcion] = useState(noticiaEditable?.descripcion || '');
	const [fechaManual, setFechaManual] = useState(noticiaEditable?.fechaManual || '');
	const [previewImage, setPreviewImage] = useState<string | null>(noticiaEditable?.direccionImagen || null);
	const [file, setFile] = useState<File | null>();

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

	const handleAction = async (): Promise<boolean> => {
		const noticiaData: NoticiaRequest = {
			titulo: titulo.trim(),
			categoria,
			descripcion: descripcion.trim(),
			fechaManual,
		};
		if (file) {
			noticiaData.imagen = file;
		}

		try {
			let success: boolean;
			if (noticiaEditable && noticiaEditable.noticiaId) {
				success = await updateNoticia(noticiaEditable.noticiaId, noticiaData);
				if (success) {
					alert('Noticia actualizada exitosamente');
				} else {
					alert('Error al actualizar la noticia');
				}
			} else {
				success = await createNoticia(noticiaData);
				if (success) {
					alert('Noticia creada exitosamente');
				} else {
					alert('Error al crear la noticia');
				}
			}
			if (success) {
				resetForm();
				handleModal();
			}
			return success;
		} catch (error) {
			console.error('Error en handleAction:', error);
			alert(`Error al ${noticiaEditable ? 'actualizar' : 'crear'} la noticia`);
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleAction();
	};

	const resetForm = () => {
		setTitulo('');
		setCategoria('');
		setDescripcion('');
		setPreviewImage(null);
		setFile(null);
	};

	const handleClose = () => {
		resetForm();
		handleModal();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/50'>
			<div className='bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
				{' '}
				{/* ← Hacer modal más grande */}
				<div className='p-4 border-b border-gray-300'>
					<h3 className='text-lg font-medium'>Formulario de Noticia</h3>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='grid gap-4 p-4'>
						<div className='grid gap-2'>
							<label className='text-sm font-medium'>Título</label>
							<input
								value={titulo}
								onChange={(e) => setTitulo(e.target.value)}
								required
								className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'
								placeholder='Ingrese el título de la noticia'
							/>
						</div>
						<div className='grid gap-2'>
							<label className='text-sm font-medium'>Categoría</label>
							<select
								value={categoria}
								onChange={(e) => setCategoria(e.target.value)}
								required
								className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md'>
								<option value=''>Seleccione una categoría</option>
								<option value='Anuncios'>Anuncios</option>
								<option value='Eventos'>Eventos</option>
								<option value='Obras'>Obras</option>
								<option value='Servicios'>Servicios</option>
								<option value='Cultura'>Cultura</option>
								<option value='Deportes'>Deportes</option>
								<option value='Salud'>Salud</option>
								<option value='Educación'>Educación</option>
							</select>
						</div>
						<div className='grid gap-2'>
							<label className='text-sm font-medium'>
								Fecha de Publicación <span className='text-red-500'>*</span>
							</label>
							<input
								type='date'
								value={fechaManual}
								onChange={(e) => setFechaManual(e.target.value)}
								required
								className='w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed'
							/>
						</div>

						<RichTextEditor
							value={descripcion}
							onChange={setDescripcion}
							label='Descripción'
							required
							height={300}
							showPreview={true}
							placeholder='Escriba la descripción de la noticia...'
						/>

						<div className='grid gap-2'>
							<label className='text-sm font-medium'>Imagen</label>
							<input
								type='file'
								accept='image/*'
								onChange={handleImageChange}
								required={!noticiaEditable}
								className='border-2 p-1.5 rounded-md'
							/>
							{previewImage && (
								<div>
									<p className='mb-1 text-sm font-medium'>Vista previa:</p>
									<img
										src={previewImage}
										alt='Vista previa'
										className='max-w-[200px] max-h-[150px] object-cover rounded-md border border-gray-300 shadow-sm'
									/>
									<button
										onClick={() => {
											setPreviewImage(null);
											setFile(null);
										}}
										className='block mt-1 text-xs text-red-600 cursor-pointer hover:text-red-800'
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
							onClick={handleClose}
							className='px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-400'>
							Cancelar
						</button>
						<button
							type='submit'
							className='px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700'>
							{noticiaEditable ? 'Actualizar Noticia' : 'Crear Noticia'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

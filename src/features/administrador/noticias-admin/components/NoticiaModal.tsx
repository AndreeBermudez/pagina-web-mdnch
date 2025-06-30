import { Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { RichTextEditor } from '../../../../core/components/common/editor/RichTextEditor';
import type { NoticiaRequest, NoticiaResponse } from '../../../../core/services/noticias/noticia.interface';

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
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
            <div className='bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col'>
                {/* Header */}
                <div className='flex items-center justify-between p-6 border-b border-slate-200'>
                    <h3 className='text-xl font-semibold text-slate-900'>
                        {noticiaEditable ? 'Editar Noticia' : 'Nueva Noticia'}
                    </h3>
                    <button
                        onClick={handleClose}
                        className='p-2 transition-colors rounded-lg hover:bg-slate-100'
                    >
                        <X className='w-5 h-5 text-slate-500' />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className='flex-1 p-6 overflow-y-auto'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Row 1: Título y Categoría */}
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
                                    placeholder='Título de la noticia'
                                />
                            </div>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-slate-700'>
                                    Categoría <span className='text-red-500'>*</span>
                                </label>
                                <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    required
                                    className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                >
                                    <option value=''>Seleccionar categoría</option>
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
                        </div>

                        {/* Row 2: Fecha */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Fecha de Publicación <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='date'
                                value={fechaManual}
                                onChange={(e) => setFechaManual(e.target.value)}
                                required
                                className='w-full max-w-xs px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                        </div>

                        {/* Row 3: Descripción */}
                        <div>
                            <RichTextEditor
                                value={descripcion}
                                onBlur={setDescripcion}
                                label='Descripción'
                                required
                                height={250}
                                showPreview={false}
                                placeholder='Escriba la descripción de la noticia...'
                            />
                        </div>

                        {/* Row 4: Imagen */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Imagen {!noticiaEditable && <span className='text-red-500'>*</span>}
                            </label>
                            <div className='space-y-3'>
                                <input
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    required={!noticiaEditable}
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
                                            onClick={() => {
                                                setPreviewImage(null);
                                                setFile(null);
                                            }}
                                            className='flex items-center space-x-1 text-sm text-red-600 hover:text-red-800'
                                            type='button'
                                        >
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
                        className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50'
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'
                    >
                        {noticiaEditable ? 'Actualizar' : 'Crear'} Noticia
                    </button>
                </div>
            </div>
        </div>
    );
};
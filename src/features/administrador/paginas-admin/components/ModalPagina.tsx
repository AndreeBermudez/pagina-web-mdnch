import { Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { RichTextEditor } from '../../../../core/components/common/editor/RichTextEditor';

interface ModalPaginaProps {
    isOpen: boolean;
    handleModal: () => void;
    elementoEditable?: any | null;
    createElement: (data: any) => Promise<boolean>;
    updateElement: (id: number, data: any) => Promise<boolean>;
}

export const ModalPagina = ({
    isOpen,
    handleModal,
    elementoEditable,
    createElement,
    updateElement,
}: ModalPaginaProps) => {
    const [titulo, setTitulo] = useState(elementoEditable?.titulo || '');
    const [categoria, setCategoria] = useState(elementoEditable?.categoria || '');
    const [descripcion, setDescripcion] = useState(elementoEditable?.descripcion || '');
    const [fechaManual, setFechaManual] = useState(elementoEditable?.fechaManual || '');
    const [previewImage, setPreviewImage] = useState<string | null>(elementoEditable?.direccionImagen || null);
    const [file, setFile] = useState<File | null>();
    const [campoExtra1, setCampoExtra1] = useState(elementoEditable?.campoExtra1 || '');
    const [campoExtra2, setCampoExtra2] = useState(elementoEditable?.campoExtra2 || '');
    const [estado, setEstado] = useState(elementoEditable?.estado || 'activo');
    const [prioridad, setPrioridad] = useState(elementoEditable?.prioridad || 'media');
    const [publicarAutomaticamente, setPublicarAutomaticamente] = useState(elementoEditable?.publicarAutomaticamente || false);
    const [enviarNotificaciones, setEnviarNotificaciones] = useState(elementoEditable?.enviarNotificaciones || false);
    const [destacarPortada, setDestacarPortada] = useState(elementoEditable?.destacarPortada || false);
    const [notasInternas, setNotasInternas] = useState(elementoEditable?.notasInternas || '');
    const [loading, setLoading] = useState(false);

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
        const elementData = {
            titulo: titulo.trim(),
            categoria,
            descripcion: descripcion.trim(),
            fechaManual,
            campoExtra1: campoExtra1.trim(),
            campoExtra2: campoExtra2.trim(),
            estado,
            prioridad,
            publicarAutomaticamente,
            enviarNotificaciones,
            destacarPortada,
            notasInternas: notasInternas.trim(),
        };
        
        if (file) {
            elementData.imagen = file;
        }

        try {
            setLoading(true);
            let success: boolean;
            
            if (elementoEditable && elementoEditable.id) {
                success = await updateElement(elementoEditable.id, elementData);
                if (success) {
                    alert('Elemento actualizado exitosamente');
                } else {
                    alert('Error al actualizar el elemento');
                }
            } else {
                success = await createElement(elementData);
                if (success) {
                    alert('Elemento creado exitosamente');
                } else {
                    alert('Error al crear el elemento');
                }
            }
            
            if (success) {
                resetForm();
                handleModal();
            }
            return success;
        } catch (error) {
            console.error('Error en handleAction:', error);
            alert(`Error al ${elementoEditable ? 'actualizar' : 'crear'} el elemento`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loading) {
            await handleAction();
        }
    };

    const handleSaveAsDraft = async () => {
        if (!loading) {
            setEstado('borrador');
            await handleAction();
        }
    };

    const resetForm = () => {
        setTitulo('');
        setCategoria('');
        setDescripcion('');
        setFechaManual('');
        setPreviewImage(null);
        setFile(null);
        setCampoExtra1('');
        setCampoExtra2('');
        setEstado('activo');
        setPrioridad('media');
        setPublicarAutomaticamente(false);
        setEnviarNotificaciones(false);
        setDestacarPortada(false);
        setNotasInternas('');
    };

    const handleClose = () => {
        if (!loading) {
            resetForm();
            handleModal();
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
            <div className='bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col'>
                {/* Header */}
                <div className='flex items-center justify-between p-6 border-b border-slate-200'>
                    <h3 className='text-xl font-semibold text-slate-900'>
                        {elementoEditable ? 'Editar Elemento' : 'Nuevo Elemento'}
                    </h3>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className='p-2 transition-colors rounded-lg hover:bg-slate-100 disabled:opacity-50'
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
                                    disabled={loading}
                                    className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50'
                                    placeholder='Título del elemento'
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
                                    disabled={loading}
                                    className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50'
                                >
                                    <option value=''>Seleccionar categoría</option>
                                    <option value='Categoria1'>Categoría 1</option>
                                    <option value='Categoria2'>Categoría 2</option>
                                    <option value='Categoria3'>Categoría 3</option>
                                    <option value='Categoria4'>Categoría 4</option>
                                    <option value='Categoria5'>Categoría 5</option>
                                    <option value='Categoria6'>Categoría 6</option>
                                    <option value='Categoria7'>Categoría 7</option>
                                    <option value='Categoria8'>Categoría 8</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 2: Fecha */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Fecha <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='date'
                                value={fechaManual}
                                onChange={(e) => setFechaManual(e.target.value)}
                                required
                                disabled={loading}
                                className='w-full max-w-xs px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50'
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
                                placeholder='Escriba la descripción del elemento...'
                                disabled={loading}
                            />
                        </div>

                        {/* Row 4: Imagen */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Imagen {!elementoEditable && <span className='text-red-500'>*</span>}
                            </label>
                            <div className='space-y-3'>
                                <input
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    required={!elementoEditable}
                                    disabled={loading}
                                    className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50'
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
                                            disabled={loading}
                                            className='flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 disabled:opacity-50'
                                            type='button'
                                        >
                                            <Trash2 className='w-4 h-4' />
                                            <span>Eliminar</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Campos adicionales opcionales */}
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-slate-700'>
                                    Campo Extra 1
                                </label>
                                <input
                                    type='text'
                                    value={campoExtra1}
                                    onChange={(e) => setCampoExtra1(e.target.value)}
                                    disabled={loading}
                                    className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50'
                                    placeholder='Información adicional'
                                />
                            </div>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-slate-700'>
                                    Campo Extra 2
                                </label>
                                <input
                                    type='text'
                                    value={campoExtra2}
                                    onChange={(e) => setCampoExtra2(e.target.value)}
                                    disabled={loading}
                                    className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50'
                                    placeholder='Información adicional'
                                />
                            </div>
                        </div>

                        {/* Estado y Prioridad */}
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-slate-700'>
                                    Estado
                                </label>
                                <select 
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                    disabled={loading}
                                    className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50'
                                >
                                    <option value='activo'>Activo</option>
                                    <option value='inactivo'>Inactivo</option>
                                    <option value='borrador'>Borrador</option>
                                    <option value='revision'>En Revisión</option>
                                </select>
                            </div>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-slate-700'>
                                    Prioridad
                                </label>
                                <select 
                                    value={prioridad}
                                    onChange={(e) => setPrioridad(e.target.value)}
                                    disabled={loading}
                                    className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50'
                                >
                                    <option value='baja'>Baja</option>
                                    <option value='media'>Media</option>
                                    <option value='alta'>Alta</option>
                                    <option value='urgente'>Urgente</option>
                                </select>
                            </div>
                        </div>

                        {/* Checkbox de opciones */}
                        <div className='space-y-3'>
                            <label className='block text-sm font-medium text-slate-700'>
                                Opciones
                            </label>
                            <div className='space-y-2'>
                                <label className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        checked={publicarAutomaticamente}
                                        onChange={(e) => setPublicarAutomaticamente(e.target.checked)}
                                        disabled={loading}
                                        className='w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 disabled:opacity-50'
                                    />
                                    <span className='ml-2 text-sm text-slate-700'>Publicar automáticamente</span>
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        checked={enviarNotificaciones}
                                        onChange={(e) => setEnviarNotificaciones(e.target.checked)}
                                        disabled={loading}
                                        className='w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 disabled:opacity-50'
                                    />
                                    <span className='ml-2 text-sm text-slate-700'>Enviar notificaciones</span>
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        checked={destacarPortada}
                                        onChange={(e) => setDestacarPortada(e.target.checked)}
                                        disabled={loading}
                                        className='w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 disabled:opacity-50'
                                    />
                                    <span className='ml-2 text-sm text-slate-700'>Destacar en portada</span>
                                </label>
                            </div>
                        </div>

                        {/* Textarea para notas */}
                        <div>
                            <label className='block mb-2 text-sm font-medium text-slate-700'>
                                Notas Internas
                            </label>
                            <textarea
                                rows={3}
                                value={notasInternas}
                                onChange={(e) => setNotasInternas(e.target.value)}
                                disabled={loading}
                                className='w-full px-3 py-2 border rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50'
                                placeholder='Notas internas para el equipo (no visible públicamente)'
                            />
                        </div>
                    </form>
                </div>

                {/* Footer - Fixed */}
                <div className='flex justify-end p-6 space-x-3 border-t border-slate-200 bg-slate-50 rounded-b-xl'>
                    <button
                        type='button'
                        onClick={handleClose}
                        disabled={loading}
                        className='px-4 py-2 transition-colors bg-white border rounded-lg text-slate-700 border-slate-300 hover:bg-slate-50 disabled:opacity-50'
                    >
                        Cancelar
                    </button>
                    <button
                        type='button'
                        onClick={handleSaveAsDraft}
                        disabled={loading}
                        className='px-4 py-2 transition-colors border rounded-lg text-slate-700 border-slate-300 bg-slate-100 hover:bg-slate-200 disabled:opacity-50'
                    >
                        {loading ? 'Guardando...' : 'Guardar como Borrador'}
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className='px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50'
                    >
                        {loading ? 'Procesando...' : (elementoEditable ? 'Actualizar' : 'Crear')} Elemento
                    </button>
                </div>
            </div>
        </div>
    );
};
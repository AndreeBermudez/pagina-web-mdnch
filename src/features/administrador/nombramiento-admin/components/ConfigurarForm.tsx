import type { FormEvent } from 'react';
import { useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '../../../../core/components/ui/Button';
import type { DocumentoUI } from '../types/documento.types';
import { useDocumento } from '../hooks/useDocumento';

interface ConfigurarFormProps {
  item: DocumentoUI;
  convocatoriaId: number;
  onClose: () => void;
  onSave: (item: DocumentoUI) => void;
}

export const ConfigurarForm = ({ item, convocatoriaId, onClose, onSave }: ConfigurarFormProps) => {
  const {
    archivo,
    archivoNombre,
    errors,
    handleArchivoChange,
    guardarDocumento
  } = useDocumento(item);

  const [urlEnlace, setUrlEnlace] = useState(item.url ?? '');

  const shouldUseFileUpload = item.categoria !== 'enlace';
  const isFileRequired = shouldUseFileUpload && item.categoria !== 'comunicado';

  const helperText = shouldUseFileUpload
    ? isFileRequired
      ? 'Sube un archivo en formato PDF u otro permitido (máximo 10 MB).'
      : 'Opcional. Adjunta un archivo si deseas compartir un documento.'
    : 'Pega el enlace de Google Forms u otro servicio externo.';

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (!shouldUseFileUpload) {
        const itemConUrl = { ...item, url: urlEnlace || null };
        await guardarDocumento(itemConUrl, convocatoriaId);

        onSave({
          ...item,
          url: urlEnlace || null,
        });
        return;
      }

      const nuevaUrl = await guardarDocumento(item, convocatoriaId);

      onSave({
        ...item,
        archivo,
        archivoNombre: archivo?.name ?? archivoNombre,
        url: nuevaUrl ?? item.url ?? null,
      });
    } catch (error) {
      console.error('Error al configurar documento:', error);
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      <section className='rounded-2xl border border-slate-200 bg-slate-50/60 p-6 space-y-6'>
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div className='space-y-1'>
            <p className='text-[11px] font-semibold tracking-[0.35em] text-blue-400 uppercase'>Estado</p>
            <div className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${
              item.habilitado
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : 'text-slate-500 bg-slate-100 border-slate-200'
            }`}>
              {item.habilitado ? 'Habilitado' : 'Deshabilitado'}
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='space-y-1'>
            {shouldUseFileUpload ? (
              <>
                <label className='text-sm font-medium text-slate-700' htmlFor='cfg-archivo'>
                  Archivo del documento {isFileRequired && <span className='text-red-500'>*</span>}
                </label>
                <input
                  id='cfg-archivo'
                  type='file'
                  accept='.pdf,.doc,.docx'
                  onChange={handleArchivoChange}
                  disabled={!item.habilitado}
                  className={`w-full rounded-2xl border px-3 py-2 text-sm bg-white file:mr-4 file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${
                    errors.archivo ? 'border-red-300' : 'border-slate-200'
                  }`}
                />
                {archivoNombre && (
                  <p className='text-xs text-slate-500'>Archivo seleccionado: {archivoNombre}</p>
                )}
                <div className='flex items-center gap-1.5 text-xs text-slate-500'>
                  <Info className='w-3.5 h-3.5 text-slate-400' />
                  <p>{helperText}</p>
                </div>
                {errors.archivo && <p className='text-xs text-red-600'>{errors.archivo}</p>}
              </>
            ) : (
              <>
                <label className='text-sm font-medium text-slate-700' htmlFor='cfg-enlace'>
                  Enlace externo <span className='text-red-500'>*</span>
                </label>
                <input
                  id='cfg-enlace'
                  type='url'
                  value={urlEnlace}
                  onChange={e => setUrlEnlace(e.target.value)}
                  disabled={!item.habilitado}
                  placeholder='Pega aquí el enlace de Google Forms'
                  className='w-full rounded-2xl border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 border-slate-200'
                  required
                />
                <div className='flex items-center gap-1.5 text-xs text-slate-500'>
                  <Info className='w-3.5 h-3.5 text-slate-400' />
                  <p>{helperText}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {!item.habilitado && (
          <div className='rounded-2xl border border-slate-200 bg-slate-100/80 p-3 text-sm text-slate-600'>
            Este elemento está deshabilitado. No se pueden subir archivos ni enlaces mientras esté en este estado.
          </div>
        )}
      </section>

      <div className='flex justify-end gap-4 border-t border-slate-200 px-6 py-4'>
        <Button variant='outline' type='button' onClick={onClose}>
          Cancelar
        </Button>
        <Button type='submit' disabled={!item.habilitado || Object.keys(errors).length > 0}>
          Guardar cambios
        </Button>
      </div>
    </form>
  );
};

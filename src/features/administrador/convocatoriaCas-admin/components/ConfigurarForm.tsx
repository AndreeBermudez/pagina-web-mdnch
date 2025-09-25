import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";
import { Info, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "../../../../core/components/ui/Button";

interface DocumentoItemConfig {
  id: string;
  tipo: "documento" | "enlace" | "comunicado" | "evaluacion";
  titulo: string;
  descripcion: string;
  habilitado: boolean;
  url?: string;
  archivo?: File | null;
  archivoNombre?: string;
}


interface ConfigurarFormProps {
  item: DocumentoItemConfig;
  onClose: () => void;
  onSave: (item: DocumentoItemConfig) => void;
}

const URL_PATTERN =
  /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/[\w\-.~:?#[\]@!$&'()*+,;=%]*)?$/i;

export const ConfigurarForm = ({ item, onClose, onSave }: ConfigurarFormProps) => {
  const [enabled, setEnabled] = useState(item.habilitado);
  const [titulo, setTitulo] = useState(item.titulo ?? "");
  const [descripcion, setDescripcion] = useState(item.descripcion ?? "");
  const [url, setUrl] = useState(item.url ?? "");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [archivoNombre, setArchivoNombre] = useState(item.archivoNombre ?? item.url ?? "");
  const [errors, setErrors] = useState<{
    titulo?: string;
    descripcion?: string;
    url?: string;
    archivo?: string;
  }>({});

  const shouldUseFileUpload = item.tipo !== "enlace";
  const isFileRequired = shouldUseFileUpload && item.tipo !== "comunicado";
  const isUrlRequired = !shouldUseFileUpload;
  const statusLabel = enabled ? "Habilitado" : "Deshabilitado";
  const statusClasses = useMemo(
    () =>
      enabled
        ? "text-emerald-700 bg-emerald-50 border-emerald-200"
        : "text-slate-500 bg-slate-100 border-slate-200",
    [enabled]
  );

  const validate = () => {
    const next: typeof errors = {};
    const trimmedTitulo = titulo.trim();
    const trimmedDescripcion = descripcion.trim();
    const trimmedUrl = url.trim();
    const hasArchivo = Boolean(archivo || archivoNombre);

    if (!trimmedTitulo) next.titulo = "Ingresa un titulo.";
    if (!trimmedDescripcion) next.descripcion = "Describe brevemente el recurso.";

    if (shouldUseFileUpload) {
      if (isFileRequired && !hasArchivo) {
        next.archivo = "Sube un archivo para este recurso.";
      }
    } else {
      if (!trimmedUrl) next.url = "La URL es obligatoria.";
      else if (!URL_PATTERN.test(trimmedUrl)) next.url = "Formato de URL no valido.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleArchivoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setArchivo(null);
      return;
    }

    setArchivo(file);
    setArchivoNombre(file.name);
    setErrors((prev) => {
      if (!prev.archivo) return prev;
      const { archivo: _omit, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const trimmedUrl = url.trim();
    const nextItem: DocumentoItemConfig = {
      ...item,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      habilitado: enabled,
    };

    if (shouldUseFileUpload) {
      const existingArchivo = item.archivo ?? null;
      const selectedArchivo = archivo ?? existingArchivo;
      if (selectedArchivo !== undefined) {
        nextItem.archivo = selectedArchivo;
      }

      const nombre = archivo?.name ?? (archivoNombre || item.archivoNombre || item.url || '');
      if (nombre) {
        nextItem.archivoNombre = nombre;
      } else if ('archivoNombre' in nextItem) {
        delete nextItem.archivoNombre;
      }

      if (item.url) {
        nextItem.url = item.url;
      } else if ('url' in nextItem) {
        delete nextItem.url;
      }
    } else {
      nextItem.url = trimmedUrl;
      if ('archivo' in nextItem) {
        delete nextItem.archivo;
      }
      if ('archivoNombre' in nextItem) {
        delete nextItem.archivoNombre;
      }
    }

    onSave(nextItem);
  };

  const helperText = shouldUseFileUpload
    ? isFileRequired
      ? "Sube un archivo en formato PDF u otro permitido (maximo 10 MB)."
      : "Opcional. Adjunta un archivo si deseas compartir un documento."
    : isUrlRequired
    ? "Ingresa una URL publica (por ejemplo, https://dominio.com/archivo.pdf)."
    : "Opcional. Usa este campo si deseas enlazar un recurso externo.";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold tracking-[0.35em] text-blue-400 uppercase">Estado</p>
            <p className="text-sm text-slate-600">
              Visible para los usuarios cuando este habilitado.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label={`Cambiar estado. Actualmente ${statusLabel}`}
            onClick={() => setEnabled((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm font-semibold border rounded-full transition-colors ${statusClasses}`}
          >
            {statusLabel}
            <span className="inline-flex items-center justify-center w-10 h-5 rounded-full border border-current bg-white">
              {enabled ? <ToggleRight className="w-3 h-3" /> : <ToggleLeft className="w-3 h-3" />}
            </span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="cfg-titulo">
              Titulo
            </label>
            <input
              id="cfg-titulo"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              onBlur={(event) => setTitulo(event.target.value.trim())}
              disabled={!enabled}
              placeholder="Nombre mostrado al usuario"
              className={`w-full rounded-2xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100 disabled:text-slate-400 ${
                errors.titulo ? "border-red-300" : "border-slate-200"
              }`}
              required
            />
            {errors.titulo && <p className="text-xs text-red-600">{errors.titulo}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="cfg-descripcion">
              Descripcion breve
            </label>
            <input
              id="cfg-descripcion"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              onBlur={(event) => setDescripcion(event.target.value.trim())}
              disabled={!enabled}
              placeholder="Ej. Documento PDF"
              className={`w-full rounded-2xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100 disabled:text-slate-400 ${
                errors.descripcion ? "border-red-300" : "border-slate-200"
              }`}
              required
            />
            {errors.descripcion && <p className="text-xs text-red-600">{errors.descripcion}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor={shouldUseFileUpload ? 'cfg-archivo' : 'cfg-url'}>
              {shouldUseFileUpload ? 'Archivo del documento' : 'URL del documento'}{' '}
              {(shouldUseFileUpload ? isFileRequired : isUrlRequired) && <span className="text-red-500">*</span>}
            </label>
            {shouldUseFileUpload ? (
              <>
                <input
                  id="cfg-archivo"
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  onChange={handleArchivoChange}
                  disabled={!enabled}
                  className={`w-full rounded-2xl border px-3 py-2 text-sm bg-white file:mr-4 file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${
                    errors.archivo ? "border-red-300" : "border-slate-200"
                  }`}
                />
                {archivoNombre && (
                  <p className="text-xs text-slate-500">Archivo seleccionado: {archivoNombre}</p>
                )}
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <p>{helperText}</p>
                </div>
                {errors.archivo && <p className="text-xs text-red-600">{errors.archivo}</p>}
              </>
            ) : (
              <>
                <input
                  id="cfg-url"
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  onBlur={(event) => setUrl(event.target.value.trim())}
                  disabled={!enabled}
                  placeholder="https://dominio.com/archivo.pdf"
                  className={`w-full rounded-2xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100 disabled:text-slate-400 ${
                    errors.url ? "border-red-300" : "border-slate-200"
                  }`}
                  required={isUrlRequired}
                />
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <p>{helperText}</p>
                </div>
                {errors.url && <p className="text-xs text-red-600">{errors.url}</p>}
              </>
            )}
          </div>
        </div>

        {!enabled && (
          <div className="rounded-2xl border border-slate-200 bg-slate-100/80 p-3 text-sm text-slate-600">
            Este elemento esta deshabilitado. Activalo para editar su contenido y mostrarlo a los ciudadanos.
          </div>
        )}
      </section>

      <div className="flex justify-end gap-4 border-t border-slate-200 px-6 py-4">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" disabled={!enabled || Object.keys(errors).length > 0}>
          Guardar cambios
        </Button>
      </div>
    </form>
  );
};


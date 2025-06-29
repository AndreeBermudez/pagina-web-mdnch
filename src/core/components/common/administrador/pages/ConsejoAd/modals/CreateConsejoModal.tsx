import { useState, useEffect } from "react";
import { createConsejo,  editarConsejo } from "../../../../../../services/EndPointConsejo";
import type { Consejo } from "../../../../../../services/EndPointConsejo";

interface CreateConsejoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  initialData?: Consejo | null;
}

export default function CreateConsejoModal({ isOpen, onClose, onSave, initialData }: CreateConsejoModalProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cargo, setCargo] = useState("");
  const [area, setArea] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || "");
      setApellido(initialData.apellido || "");
      setCargo(initialData.cargo || "");
      setArea(initialData.area || "");
      setPreviewImage(initialData.direccionImagen || null);
      setFile(null); // limpiamos el file seleccionado
    }
  }, [initialData]);

  if (!isOpen) return null;

const handleSave = async () => {
  const form = new FormData();
  form.append('nombre', nombre);
  form.append('apellido', apellido);
  form.append('cargo', cargo);
  form.append('area', area);
  if (file) form.append('direccionImagen', file);

  let ok = false;

  if (initialData?.consejoMuniId) {
    ok = await editarConsejo(initialData.consejoMuniId, form);
  } else {
    ok = await createConsejo(form);
  }

  if (ok) {
    onSave?.();
    onClose();
    setNombre("");
    setApellido("");
    setCargo("");
    setArea("");
    setFile(null);
    setPreviewImage(null);
  } else {
    alert('Error al guardar el consejo');
  }
};


  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {initialData ? "Editar Consejo" : "Crear Consejo"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="nombre" className="text-sm font-medium">Nombre</label>
                <input
                  id="nombre"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese el nombre"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="apellido" className="text-sm font-medium">Apellido</label>
                <input
                  id="apellido"
                  value={apellido}
                  onChange={e => setApellido(e.target.value)}
                  required
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese el apellido"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="cargo" className="text-sm font-medium">Cargo</label>
              <input
                id="cargo"
                value={cargo}
                onChange={e => setCargo(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese el cargo"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="area" className="text-sm font-medium">Area</label>
              <input
                id="area"
                value={area}
                onChange={e => setArea(e.target.value)}
                required
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese el área"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="direccionImagen" className="text-sm font-medium">Imagen</label>
              <input
                id="direccionImagen"
                name="direccionImagen"
                type="file"
                accept="image/*"
                className="border-2 p-1.5 rounded-md"
                onChange={e => {
                  const f = e.target.files?.[0] || null;
                  setFile(f);
                  if (f) {
                    const reader = new FileReader();
                    reader.onloadend = () => setPreviewImage(reader.result as string);
                    reader.readAsDataURL(f);
                  } else {
                    setPreviewImage(null);
                  }
                }}
              />
              {previewImage && (
                <div>
                  <p className="text-sm font-medium mb-1">Vista previa:</p>
                  <img src={previewImage} alt="Vista previa" className="max-w-[100px] max-h-[100px] object-contain rounded-md border border-gray-300 shadow-sm" />
                  <button
                    onClick={() => { setFile(null); setPreviewImage(null); }}
                    className="text-xs text-red-600 hover:text-red-800 cursor-pointer"
                    type="button"
                  >Eliminar imagen</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-end space-x-2 border-t">
          <button onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Guardar</button>
        </div>
      </div>
    </div>
  );
}

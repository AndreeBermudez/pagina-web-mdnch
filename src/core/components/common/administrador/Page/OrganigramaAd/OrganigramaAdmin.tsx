import { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import OrganigramaModal from './OrganigramaModal';
import { ListaOrganigramas } from '../../../../../services/EndPointOrganigrama';
import type { Organigrama } from '../../../../../services/EndPointOrganigrama';
import { eliminarOrganigrama } from '../../../../../services/EndPointOrganigrama';
import ConfirmModal from './ConfirmModal';

export default function OrganigramaAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organigramas, setOrganigramas] = useState<Organigrama[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [organigramaToDelete, setOrganigramaToDelete] = useState<number | null>(null);
  const [editingOrganigrama, setEditingOrganigrama] = useState<Organigrama | null>(null);

  useEffect(() => {
  fetchOrganigramas();
}, []);

const fetchOrganigramas = async () => {
  const res = await ListaOrganigramas();
  setOrganigramas(res);
};

const handleDelete = async () => {
  if (organigramaToDelete === null) return;

  const ok = await eliminarOrganigrama(organigramaToDelete);
  if (ok) {
    fetchOrganigramas(); 
  } else {
    alert("Error al eliminar organigrama.");
  }
  setOrganigramaToDelete(null);
};


  return (
    <>
      <div className="bg-white shadow-sm rounded-lg border border-gray-300">
        <div className="border-b p-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Organigrama</h2>
            <button
              onClick={() => {
                setEditingOrganigrama(null);
                setIsModalOpen(true);
              }}

              className="inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Agregar Organigrama
            </button>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
              <input
                placeholder="Buscar organigrama..."
                className="flex h-8 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 py-1.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
              {organigramas.length} organigramas encontrados
            </span>
          </div>
        </div>

        <div className="overflow-y-auto overflow-x-auto" style={{ maxHeight: '420px', border: '1px solid #f3f4f6' }}>
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th>Fecha</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {organigramas.map((o) => (
                <tr key={o.organigramaId}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">{o.fechaCreacion}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <img
                        src={o.direccionImagen || "/placeholder.svg"}
                        alt="Organigrama"
                        className="w-10 h-10 object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingOrganigrama(o); // state que debes manejar
                          setIsModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-yellow-500 cursor-pointer p-1 text-sm text-gray-700 hover:bg-yellow-300"
                      >
                        <Edit className="w-3.5 h-3.5 text-white" />
                      </button>

                      <button
                        onClick={() => {
                          setOrganigramaToDelete(o.organigramaId);
                          setIsConfirmOpen(true);
                        }}
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-red-500 cursor-pointer p-1 text-sm text-gray-700 hover:bg-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <OrganigramaModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOrganigrama(null);
        }}
        onRefresh={fetchOrganigramas}
        initialData={editingOrganigrama}

      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setOrganigramaToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Confirmar eliminación"
        message="¿Estás seguro de que deseas eliminar este organigrama?"
      />

    </>
  );
}

import { Edit, Plus, Search, Trash2, Eye, AlertCircle, FileText } from "lucide-react"
import { useState, useEffect } from "react"
import ModalAgregar from "../components/ModalAgregar"
import ConfirmModal from "../components/ConfirmModal"
import { listarTurismo } from "../../../../core/services/turismo/listarTurismo"
import { eliminarTurismo } from "../../../../core/services/turismo/eliminarTurismo"
import type { Turismo } from "../../../../core/services/turismo/turismo.interface"

export default function TurismoAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [turismoData, setTurismoData] = useState<Turismo[]>([]);
  const [editingTurismo, setEditingTurismo] = useState<Turismo | null>(null);

  // Estados para el modal de confirmación
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [turismoToDelete, setTurismoToDelete] = useState<Turismo | null>(null);

  // Cargar datos de turismo
  const cargarTurismo = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listarTurismo();
      setTurismoData(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Error al cargar los elementos de turismo");
      setTurismoData([]); // Asegurar que siempre sea un array
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTurismo();
  }, []);

  // Filtrar datos según el término de búsqueda
  const filteredData = (turismoData || []).filter(item =>
    item.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lugar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const openModal = () => {
    setEditingTurismo(null);
    setIsModalOpen(true);
  };

  const openEditModal = (turismo: Turismo) => {
    setEditingTurismo(turismo);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    cargarTurismo(); // Recargar datos después de crear/editar
  };

  const handleDelete = (turismo: Turismo) => {
    setTurismoToDelete(turismo);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!turismoToDelete) return;

    try {
      const success = await eliminarTurismo(turismoToDelete.turismoId!);
      if (success) {
        console.log("Turismo eliminado exitosamente");
        cargarTurismo(); // Recargar la lista
      } else {
        alert("Error al eliminar el elemento. Por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el elemento. Por favor intenta de nuevo.");
    }
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setTurismoToDelete(null);
  };



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border shadow-sm rounded-xl border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Gestión de Turismo</h1>
                <p className="mt-1 text-slate-600">Administra los elementos del sistema municipal</p>
              </div>
            </div>
            <button
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
              onClick={openModal}
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo elemento</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                <input
                  placeholder="Buscar por título, categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200">
              <span className="font-medium text-slate-700">{filteredData.length}</span>
              <span className="ml-1 text-slate-500">elementos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-hidden bg-white border shadow-sm rounded-xl border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-slate-50 border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Fecha</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Titulo</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Descripción</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Lugar</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Ubicación</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Imagen</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">

              {loading && (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-8 h-8 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                      <p className="text-slate-600">Cargando elementos...</p>
                    </div>
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 rounded-full bg-red-50">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-red-900">Error al cargar los elementos</p>
                        <p className="mt-1 text-sm text-red-600">{error}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && !error && filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 rounded-full bg-slate-100">
                        <Search className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">No se encontraron elementos</p>
                        <p className="mt-1 text-sm text-slate-500">Intenta con otros términos de búsqueda</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                filteredData.map((item, index) => (
                  <tr key={item.turismoId || index} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{item.fechaCreacion}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-slate-900 line-clamp-2">{item.titulo}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div
                        className="max-w-md text-sm text-slate-600 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item.descripcion }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-slate-900 line-clamp-2">{item.lugar}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-slate-900 line-clamp-2">{item.ubicacion}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        {item.direccionImagen && (
                          <img
                            src={item.direccionImagen}
                            alt={item.titulo}
                            className="w-12 h-12 object-cover rounded-lg border border-slate-300"
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                          title="Ver elemento"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                          onClick={() => openEditModal(item)}
                          title="Editar elemento"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(item)}
                          title="Eliminar elemento"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

            </tbody>
          </table>
        </div>
      </div>
      <ModalAgregar
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        initialData={editingTurismo}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmDelete}
        title="Eliminar Elemento de Turismo"
        message={`¿Estás seguro de que deseas eliminar "${turismoToDelete?.titulo}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>

  )
}

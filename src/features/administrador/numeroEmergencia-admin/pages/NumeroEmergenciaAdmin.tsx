import { Edit, Plus, Search, Trash2, AlertCircle, Phone } from "lucide-react"
import { useState } from "react"
import { useModal } from "../../../../core/hooks/useModal"
import { useNumeroEmergenciaQuery } from "../hooks/useNumeroEmergenciaQuery"
import { useNumeroEmergenciaMutations } from "../hooks/useNumeroEmergenciaMutations"
import { NumeroEmergenciaForm } from "../components/NumeroEmergenciaForm"
import { Modal } from "../../../../core/components/common/modal/Modal"
import ConfirmModal from "../components/ConfirmModal"
import type { NumeroEmergenciaResponse } from "../schemas/numeroEmergencia.schema"

export default function NumeroEmergenciaAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [numeroEmergenciaEditable, setNumeroEmergenciaEditable] = useState<NumeroEmergenciaResponse | null>(null);
  const [numeroEmergenciaAEliminar, setNumeroEmergenciaAEliminar] = useState<NumeroEmergenciaResponse | null>(null);
  
  const { numerosEmergencia, isLoading, error } = useNumeroEmergenciaQuery();
  const { eliminarNumeroEmergencia } = useNumeroEmergenciaMutations();
  const { isModalOpen, handleModal } = useModal();

  // Filtrar datos según el término de búsqueda
  const filteredData = numerosEmergencia.filter((numero: NumeroEmergenciaResponse) =>
    numero.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    numero.numero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setNumeroEmergenciaEditable(null);
    handleModal();
  }

  const handleEdit = (numero: NumeroEmergenciaResponse) => {
    setNumeroEmergenciaEditable(numero);
    handleModal();
  }

  const handleDelete = (numero: NumeroEmergenciaResponse) => {
    setNumeroEmergenciaAEliminar(numero);
  }

  const confirmarEliminacion = () => {
    if (numeroEmergenciaAEliminar) {
      eliminarNumeroEmergencia.mutate(numeroEmergenciaAEliminar.id);
      setNumeroEmergenciaAEliminar(null);
    }
  }

  const cancelarEliminacion = () => {
    setNumeroEmergenciaAEliminar(null);
  }



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border shadow-sm rounded-xl border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Gestión de Números de Emergencia</h1>
                <p className="mt-1 text-slate-600">Administra los números de emergencia del sistema</p>
              </div>
            </div>
            <button
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
              onClick={handleAdd}
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo número de emergencia</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                <input
                  placeholder="Buscar por título o número..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200">
              <span className="font-medium text-slate-700">{filteredData.length}</span>
              <span className="ml-1 text-slate-500">números de emergencia</span>
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
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">ID</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Título</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Número</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading && (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-8 h-8 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                      <p className="text-slate-600">Cargando números de emergencia...</p>
                    </div>
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 rounded-full bg-red-50">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-red-900">Error al cargar los números de emergencia</p>
                        <p className="mt-1 text-sm text-red-600">{error.message}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading && !error && filteredData.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 rounded-full bg-slate-100">
                        <Search className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">No se encontraron números de emergencia</p>
                        <p className="mt-1 text-sm text-slate-500">Intenta con otros términos de búsqueda</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading &&
                filteredData.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">#{item.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-slate-900 line-clamp-2">{item.titulo}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-slate-900">{item.numero}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                          onClick={() => handleEdit(item)}
                          title="Editar número de emergencia"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(item)}
                          title="Eliminar número de emergencia"
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
      
      {/* Modal para formulario */}
      {isModalOpen && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={handleModal} 
          title={numeroEmergenciaEditable ? 'Editar Número de Emergencia' : 'Crear Número de Emergencia'}
        >
          <NumeroEmergenciaForm 
            handleModal={handleModal} 
            numeroEmergenciaEditable={numeroEmergenciaEditable} 
          />
        </Modal>
      )}

      {/* Modal de confirmación para eliminar */}
      <ConfirmModal
        isOpen={numeroEmergenciaAEliminar !== null}
        onClose={cancelarEliminacion}
        onConfirm={confirmarEliminacion}
        title="Eliminar Número de Emergencia"
        message={`¿Estás seguro de que deseas eliminar el número de emergencia "${numeroEmergenciaAEliminar?.titulo}" (${numeroEmergenciaAEliminar?.numero})?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>

  )
}

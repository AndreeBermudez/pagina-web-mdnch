import { Edit, Plus, Search, Trash2, Eye, AlertCircle, FileText } from "lucide-react"
import { useState, useEffect } from "react"
import ConfirmModal from "../components/ConfirmModal"
import ControlForm from "../components/ControlForm"
import { obtenerControles, eliminarControl, type Control } from "../service"

export default function ControlAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [controles, setControles] = useState<Control[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingControl, setEditingControl] = useState<Control | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; control: Control | null }>({
    show: false,
    control: null
  })

  const filteredData = Array.isArray(controles) 
    ? controles.filter((control) =>
        control.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  useEffect(() => {
    fetchControles()
  }, [])

  const fetchControles = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await obtenerControles()
      if (data && Array.isArray(data)) {
       
        setControles(data)
      } else {
        setControles([])
        setError("No se pudieron cargar los controles internos")
      }
    } catch (err) {
      setError("Error al cargar los controles internos")
      setControles([]) // Establecer array vacío en caso de error
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingControl(null)
    setIsModalOpen(true)
  }

  const handleEdit = (control: Control) => {
    setEditingControl(control)
    setIsModalOpen(true)
  }

  const handleDelete = (control: Control) => {
    setDeleteConfirm({ show: true, control })
  }

  const confirmDelete = async () => {
    if (!deleteConfirm.control) return
    
    try {
      const success = await eliminarControl(deleteConfirm.control.controlInternoId)
      if (success) {
        await fetchControles() 
        setDeleteConfirm({ show: false, control: null })
      } else {
        alert("Error al eliminar el control interno")
      }
    } catch (err) {
      alert("Error al eliminar el control interno")
    }
  }

  const handleView = (control: Control) => {
    if (control.rutaPdf) {
      window.open(control.rutaPdf, '_blank')
    }
  }



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
                <h1 className="text-2xl font-bold text-slate-900">Gestión de Control Interno</h1>
                <p className="mt-1 text-slate-600">Administra los controles internos del sistema municipal</p>
              </div>
            </div>
            <div className="flex space-x-2">
              
              <button
                className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
                onClick={handleAdd}
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Control</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                <input
                  placeholder="Buscar por título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200">
              <span className="font-medium text-slate-700">{filteredData.length}</span>
              <span className="ml-1 text-slate-500">controles</span>
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
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Archivo PDF</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading && (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-8 h-8 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                      <p className="text-slate-600">Cargando controles internos...</p>
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
                        <p className="font-medium text-red-900">Error al cargar los controles internos</p>
                        <p className="mt-1 text-sm text-red-600">{error}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!loading && !error && filteredData.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 rounded-full bg-slate-100">
                        <Search className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">No se encontraron controles internos</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay controles internos registrados'}
                        </p>

                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                filteredData.map((control) => (
                  <tr key={control.controlInternoId} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">#{control.controlInternoId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <p className="text-sm font-medium text-slate-900 line-clamp-2">{control.titulo}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-slate-600">
                          {control.rutaPdf ? 'PDF disponible' : 'Sin archivo'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                          onClick={() => handleView(control)}
                          title="Ver PDF"
                          disabled={!control.rutaPdf}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                          onClick={() => handleEdit(control)}
                          title="Editar control"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(control)}
                          title="Eliminar control"
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

      {/* Modal de formulario */}
      <ControlForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingControl(null)
        }}
        onSave={() => {
          fetchControles()
        }}
        initialData={editingControl}
      />

      {/* Modal de confirmación de eliminación */}
      <ConfirmModal
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, control: null })}
        onConfirm={confirmDelete}
        title="Eliminar Control Interno"
        message={`¿Estás seguro de que deseas eliminar el control "${deleteConfirm.control?.titulo}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      
    </div>

  )
}

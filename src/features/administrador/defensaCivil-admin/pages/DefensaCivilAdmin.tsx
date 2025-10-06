import { Edit, Plus, Search, Trash2, Eye, AlertCircle, Shield, Download } from "lucide-react"
import { useState } from "react"
import { useDefensaQuery } from '../hooks/useDefensaQuery'
import { useDefensaMutations } from '../hooks/useDefensaMutations'
import { useNotifications } from '../../../../core/hooks/useNotifications'
import DefensaForm from '../components/DefensaForm'
import ConfirmModal from '../components/ConfirmModal'
import type { DefensaCivil } from '../services/defensa.interface'

export default function DefensaCivilAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [selectedDefensa, setSelectedDefensa] = useState<DefensaCivil | null>(null)
  const [defensaToDelete, setDefensaToDelete] = useState<number | null>(null)
  
  const { defensas, isLoading, error } = useDefensaQuery()
  const { eliminarDefensa } = useDefensaMutations()
  const { success, error: errorNotification } = useNotifications()

  // Filtrar defensas por búsqueda
  const filteredData = defensas?.filter(defensa =>
    defensa.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    defensa.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    defensa.numeroSerenazgo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    defensa.numeroSalud?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    defensa.numeroBomberos?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleAdd = () => {
    setSelectedDefensa(null)
    setIsModalOpen(true)
  }

  const handleEdit = (defensa: DefensaCivil) => {
    setSelectedDefensa(defensa)
    setIsModalOpen(true)
  }

  const handleDelete = (defensaId: number) => {
    setDefensaToDelete(defensaId)
    setIsConfirmModalOpen(true)
  }

  const confirmDelete = async () => {
    if (defensaToDelete) {
      try {
        await eliminarDefensa.mutateAsync(defensaToDelete)
        success('Información de Defensa Civil eliminada exitosamente')
      } catch (err: any) {
        errorNotification(err.message || 'Error al eliminar la información de Defensa Civil')
      } finally {
        setIsConfirmModalOpen(false)
        setDefensaToDelete(null)
      }
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDefensa(null)
  }

  const handleDownloadPdf = (rutaPdf: string, titulo: string) => {
    if (rutaPdf) {
      const link = document.createElement('a')
      link.href = rutaPdf
      link.download = `${titulo}.pdf`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
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
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Gestión de Defensa Civil</h1>
                <p className="mt-1 text-slate-600">Administra la información de Defensa Civil y números de emergencia</p>
              </div>
            </div>
            <button
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
              onClick={handleAdd}
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Defensa Civil</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                <input
                  placeholder="Buscar por título, descripción, números..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200">
              <span className="font-medium text-slate-700">{filteredData.length}</span>
              <span className="ml-1 text-slate-500">registros</span>
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
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Descripción</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Números de Emergencia</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Archivo PDF</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading && (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-8 h-8 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                      <p className="text-slate-600">Cargando información de Defensa Civil...</p>
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
                        <p className="font-medium text-red-900">Error al cargar la información</p>
                        <p className="mt-1 text-sm text-red-600">{error?.message || 'Error desconocido'}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading && !error && filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 rounded-full bg-slate-100">
                        <Search className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">No se encontraron registros</p>
                        <p className="mt-1 text-sm text-slate-500">Intenta con otros términos de búsqueda</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading &&
                filteredData.map((defensa) => (
                  <tr key={defensa.defensaCivilId || (defensa as any).id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {defensa.defensaCivilId || (defensa as any).id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-slate-900 line-clamp-2">{defensa.titulo}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md text-sm text-slate-600 line-clamp-3">
                        {defensa.descripcion}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-blue-600" />
                          <span className="font-medium">Serenazgo:</span>
                          <span>{defensa.numeroSerenazgo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-green-500 rounded-full" />
                          <span className="font-medium">Salud:</span>
                          <span>{defensa.numeroSalud}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-3 h-3 bg-red-500 rounded-full" />
                          <span className="font-medium">Bomberos:</span>
                          <span>{defensa.numeroBomberos}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {defensa.rutaPdf ? (
                        <button
                          onClick={() => handleDownloadPdf(defensa.rutaPdf, defensa.titulo)}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
                        >
                          <Download className="w-3 h-3" />
                          Descargar PDF
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">Sin archivo</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                          onClick={() => defensa.rutaPdf && handleDownloadPdf(defensa.rutaPdf, defensa.titulo)}
                          title="Ver PDF"
                          disabled={!defensa.rutaPdf}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                          onClick={() => handleEdit(defensa)}
                          title="Editar registro"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(defensa.defensaCivilId || (defensa as any).id)}
                          title="Eliminar registro"
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
      <DefensaForm 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={selectedDefensa}
      />

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Registro de Defensa Civil"
        message="¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>

  )
}

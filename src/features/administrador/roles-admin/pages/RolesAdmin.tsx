import { Search, AlertCircle, Shield } from "lucide-react"
import { useState, useMemo } from "react"
import { useRolesQuery } from "../hooks/useRolesQuery"


export default function RolesAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const { roles, isLoading, error } = useRolesQuery()

  // Filtrar roles por término de búsqueda
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return roles;
    
    const searchLower = searchTerm.toLowerCase();
    return roles.filter(rol => 
      rol.nombre.toLowerCase().includes(searchLower)
    );
  }, [roles, searchTerm])



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border shadow-sm rounded-xl border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-50">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Roles del Sistema</h1>
              <p className="mt-1 text-slate-600">Visualiza los roles disponibles en el sistema</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                <input
                  placeholder="Buscar por nombre de rol..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center px-3 py-2 text-sm border rounded-lg bg-slate-50 border-slate-200">
              <span className="font-medium text-slate-700">{filteredData.length}</span>
              <span className="ml-1 text-slate-500">{filteredData.length === 1 ? 'rol' : 'roles'}</span>
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
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-center uppercase text-slate-600">#</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-center uppercase text-slate-600">Nombre del Rol</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-center uppercase text-slate-600">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading && (
                <tr>
                  <td colSpan={3} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-8 h-8 border-2 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
                      <p className="text-slate-600">Cargando roles...</p>
                    </div>
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={3} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 rounded-full bg-red-50">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-red-900">Error al cargar los roles</p>
                        <p className="mt-1 text-sm text-red-600">No se pudieron obtener los roles del sistema</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading && !error && filteredData.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-16 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 rounded-full bg-slate-100">
                        <Search className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">No se encontraron roles</p>
                        <p className="mt-1 text-sm text-slate-500">Intenta con otros términos de búsqueda</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading &&
                !error &&
                filteredData.map((rol, index) => (
                  <tr key={rol.nombre} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <span className="flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full bg-purple-100 text-purple-700">
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-slate-900">{rol.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                        <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500"></span>
                        Activo
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>

  )
}

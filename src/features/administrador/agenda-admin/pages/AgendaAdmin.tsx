import { Edit, Plus, Search, Trash2, Eye, AlertCircle, FileText } from "lucide-react"
import { useState } from "react"

export default function AgendaAdmin ()  {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Datos de ejemplo - reemplazar con tu hook personalizado
  const filteredData = [
    {
      id: 1,
      fecha: "2025-06-30",
      titulo: "Elemento de Ejemplo",
      categoria: "Categoria1",
      descripcion: "Esta es una descripción de ejemplo para el elemento",
      imagen: "/placeholder.svg"
    }
  ]

  const handleAdd = () => {
    // Lógica para agregar nuevo elemento
    console.log("Agregar nuevo elemento")
  }

//   const handleEdit = (item) => {
//     // Lógica para editar elemento
//     console.log("Editar elemento:", item)
//   }

//   const handleDelete = (id) => {
//     if (window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
//       // Lógica para eliminar elemento
//       console.log("Eliminar elemento:", id)
//     }
//   }

//   const getCategoryColor = (categoria) => {
//     const colors = {
//       Categoria1: "bg-blue-50 text-blue-700 border-blue-200",
//       Categoria2: "bg-purple-50 text-purple-700 border-purple-200",
//       Categoria3: "bg-orange-50 text-orange-700 border-orange-200",
//       Categoria4: "bg-emerald-50 text-emerald-700 border-emerald-200",
//       Categoria5: "bg-pink-50 text-pink-700 border-pink-200",
//     }
//     return colors[categoria] || "bg-slate-50 text-slate-700 border-slate-200"
//   }

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
                <h1 className="text-2xl font-bold text-slate-900">Gestión de Agenda</h1>
                <p className="mt-1 text-slate-600">Administra los elementos del sistema municipal</p>
              </div>
            </div>
            <button
              className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
              onClick={handleAdd}
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
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Dirección</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Categoría</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Fecha</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Hora Inicio</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left uppercase text-slate-600">Hora Fin </th>
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
                filteredData.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {item.fecha}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-slate-900 line-clamp-2">{item.titulo}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span>
                        <h1>Hola</h1>
                      </span> 
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="max-w-md text-sm text-slate-600 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item.descripcion }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="max-w-md text-sm text-slate-600 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item.descripcion }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="max-w-md text-sm text-slate-600 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item.descripcion }}
                      />
                    </td>
                  
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 overflow-hidden rounded-lg bg-slate-100">
                        <img
                          src={item.imagen || "/placeholder.svg"}
                          alt={item.titulo}
                          className="object-cover w-full h-full"
                        />
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
                         
                          title="Editar elemento"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                          
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
    </div>
  )
}
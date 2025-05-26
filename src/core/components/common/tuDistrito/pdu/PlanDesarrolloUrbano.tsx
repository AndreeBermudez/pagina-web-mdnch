
import { documentos } from './documentos';
import { FaCloudDownloadAlt } from 'react-icons/fa';

export default function PlanDesarrolloUrbano() {
  return (
    <div className="container mx-auto px-4">
      {/* Grid de documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        {documentos.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col justify-between bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 pb-2 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 text-white mb-4">
                <span className="font-bold">{doc.id}</span>
              </div>
              <h3 className="text-lg font-semibold">{doc.subtitulo}</h3>
            </div>

            {/* Contenido */}
            <div className="px-4 pb-4 flex-1">
              <p className="text-sm text-gray-700 min-h-[60px]">{doc.titulo}</p>
            </div>

            {/* Footer / Botón */}
            <div className="px-4 pb-4">
              <button
                className="cursor-pointer w-full flex items-center justify-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={() => window.open(doc.url || '#', '_blank')}
              >
                <FaCloudDownloadAlt className="mr-2 h-4 w-4" />
                DESCARGAR
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Información adicional */}
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Información Adicional</h2>
        <p className="text-gray-600">
          Estos documentos contienen la planificación urbana para Chimbote - Nuevo Chimbote para el período 2020-2030.
          Para más información, contacte con la oficina de planificación urbana.
        </p>
      </div>
    </div>
  );
}

interface NoticiaModalProps {
  noticia: {
    id: number;
    imagen: string;
    categoria: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    lugar?: string;
  } | null;
  onClose: () => void;
}

export default function NoticiaModal({ noticia, onClose }: NoticiaModalProps) {
  if (!noticia) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        {/* Contenido del modal */}
        <div>
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {noticia.categoria}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {noticia.fecha}
              </div>
              {noticia.lugar && (
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {noticia.lugar}
                </div>
              )}
            </div>

            <h2 className="text-3xl font-bold mb-4">{noticia.titulo}</h2>
            
            {/* Contenido detallado de la noticia */}
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">
                {noticia.descripcion}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Esta iniciativa representa un paso importante en el compromiso de nuestra administración municipal con el bienestar y desarrollo de nuestra comunidad. Los detalles de implementación han sido cuidadosamente planificados para asegurar el máximo beneficio para todos los ciudadanos.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                El proyecto cuenta con el respaldo técnico necesario y se ejecutará siguiendo los más altos estándares de calidad y transparencia. Se han establecido cronogramas específicos y puntos de seguimiento para garantizar el cumplimiento de los objetivos propuestos.
              </p>
              <p className="text-gray-600 leading-relaxed">
                La participación ciudadana es fundamental para el éxito de esta iniciativa. Invitamos a todos los vecinos a mantenerse informados y participar activamente en las actividades programadas. Juntos construimos una comunidad más próspera y unida.
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              <button 
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Cerrar
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

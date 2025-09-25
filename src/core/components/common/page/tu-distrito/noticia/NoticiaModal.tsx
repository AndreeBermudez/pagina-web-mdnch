import { Calendar, MapPin, Share2, X } from 'lucide-react';
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
          <X className="w-6 h-6" />
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
                <Calendar className="w-4 h-4 mr-1" />
                {noticia.fecha}
              </div>
              {noticia.lugar && (
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
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
                <Share2 className="w-5 h-5" />
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

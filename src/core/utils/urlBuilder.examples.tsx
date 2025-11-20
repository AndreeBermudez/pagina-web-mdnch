/**
 * EJEMPLO DE USO: Cómo usar las utilidades de URL en tus componentes
 * 
 * NOTA: Este archivo es solo de referencia/documentación.
 * No se importa en la aplicación.
 */

import { useState } from 'react';
import { getImageUrl, getDocumentUrl } from './urlBuilder';

// ============================================
// EJEMPLO 1: Renderizar una imagen
// ============================================
interface NoticiaProps {
  titulo: string;
  imagenPath: string; // Ej: "noticias/2024/foto1.jpg"
}

export const NoticiaCard = ({ titulo, imagenPath }: NoticiaProps) => {
  return (
    <div>
      <h2>{titulo}</h2>
      {/* La utilidad construye la URL completa automáticamente */}
      <img 
        src={getImageUrl(imagenPath)} 
        alt={titulo}
        // Producción: http://167.99.169.248:8080/imagenes/noticias/2024/foto1.jpg
        // Local: http://localhost:8080/imagenes/noticias/2024/foto1.jpg
      />
    </div>
  );
};

// ============================================
// EJEMPLO 2: Descargar un documento
// ============================================
interface DocumentoProps {
  nombre: string;
  rutaArchivo: string; // Ej: "presupuesto/2024/reporte.pdf"
}

export const DocumentoLink = ({ nombre, rutaArchivo }: DocumentoProps) => {
  const handleDescargar = () => {
    const url = getDocumentUrl(rutaArchivo);
    // Producción: http://167.99.169.248:8080/documentos/presupuesto/2024/reporte.pdf
    // Local: http://localhost:8080/documentos/presupuesto/2024/reporte.pdf
    
    // Abrir en nueva pestaña
    window.open(url, '_blank');
    
    // O forzar descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = nombre;
    link.click();
  };

  return (
    <button onClick={handleDescargar}>
      Descargar {nombre}
    </button>
  );
};

// ============================================
// EJEMPLO 3: Mostrar imagen con manejo de errores
// ============================================
interface ImagenConFallbackProps {
  imagenPath: string;
  alt: string;
}

export const ImagenConFallback = ({ imagenPath, alt }: ImagenConFallbackProps) => {
  const [error, setError] = useState(false);
  
  const imageUrl = getImageUrl(imagenPath);
  const fallbackUrl = getImageUrl('default/placeholder.jpg');

  return (
    <img 
      src={error ? fallbackUrl : imageUrl}
      alt={alt}
      onError={() => setError(true)}
      className="w-full h-auto"
    />
  );
};

// ============================================
// EJEMPLO 4: Lista de documentos
// ============================================
interface Documento {
  id: number;
  titulo: string;
  archivo: string; // Ej: "transparencia/acta-01-2024.pdf"
  fecha: string;
}

export const ListaDocumentos = ({ documentos }: { documentos: Documento[] }) => {
  return (
    <div className="space-y-2">
      {documentos.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
          <div>
            <h3 className="font-semibold">{doc.titulo}</h3>
            <p className="text-sm text-gray-500">{doc.fecha}</p>
          </div>
          <a
            href={getDocumentUrl(doc.archivo)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ver PDF
          </a>
        </div>
      ))}
    </div>
  );
};

// ============================================
// EJEMPLO 5: Slider con imágenes
// ============================================
interface Slide {
  id: number;
  imagen: string; // Ej: "slider/banner-1.jpg"
  titulo: string;
}

export const ImageSlider = ({ slides }: { slides: Slide[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative w-full h-96">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={getImageUrl(slide.imagen)}
            alt={slide.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
            <h3 className="text-xl font-bold">{slide.titulo}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// EJEMPLO 6: Galería de turismo
// ============================================
interface LugarTuristico {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string; // Ej: "turismo/machu-picchu.jpg"
}

export const GaleriaTurismo = ({ lugares }: { lugares: LugarTuristico[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lugares.map((lugar) => (
        <div key={lugar.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={getImageUrl(lugar.imagen)}
            alt={lugar.nombre}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{lugar.nombre}</h3>
            <p className="text-gray-600 text-sm">{lugar.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// EJEMPLO 7: Avatar de funcionario
// ============================================
interface FuncionarioProps {
  nombre: string;
  cargo: string;
  foto: string | null; // Ej: "funcionarios/juan-perez.jpg" o null
}

export const FuncionarioCard = ({ nombre, cargo, foto }: FuncionarioProps) => {
  const fotoUrl = foto ? getImageUrl(foto) : getImageUrl('default/avatar.png');

  return (
    <div className="text-center">
      <img
        src={fotoUrl}
        alt={nombre}
        className="w-32 h-32 rounded-full mx-auto mb-3 object-cover"
      />
      <h4 className="font-semibold">{nombre}</h4>
      <p className="text-sm text-gray-600">{cargo}</p>
    </div>
  );
};

// ============================================
// NOTAS IMPORTANTES:
// ============================================
/*
1. SIEMPRE usar getImageUrl() para imágenes
2. SIEMPRE usar getDocumentUrl() para documentos
3. NO hardcodear URLs completas en los componentes
4. Las rutas relativas se pasan SIN barra inicial
   ✅ Correcto: "slider/imagen.jpg"
   ❌ Incorrecto: "/slider/imagen.jpg"
5. La utilidad maneja automáticamente:
   - URLs completas (http://, https://)
   - Valores null/undefined
   - Barras duplicadas
*/

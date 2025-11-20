/**
 * Utilidad para construir URLs de recursos estáticos (imágenes y documentos)
 * Lee las URLs base desde las variables de entorno
 */

const IMAGENES_BASE_URL = import.meta.env.VITE_IMAGENES_URL || 'http://167.99.169.248:8080/imagenes/';
const DOCUMENTOS_BASE_URL = import.meta.env.VITE_DOCUMENTOS_URL || 'http://167.99.169.248:8080/documentos/';

/**
 * Construye la URL completa para una imagen
 * @param path - Ruta relativa de la imagen (ej: "slider/imagen1.jpg")
 * @returns URL completa de la imagen
 */
export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return '';
  
  // Si ya es una URL completa, devolverla tal cual
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Eliminar "/" inicial si existe para evitar duplicados
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${IMAGENES_BASE_URL}${cleanPath}`;
};

/**
 * Construye la URL completa para un documento
 * @param path - Ruta relativa del documento (ej: "presupuesto/2024/archivo.pdf")
 * @returns URL completa del documento
 */
export const getDocumentUrl = (path: string | null | undefined): string => {
  if (!path) return '';
  
  // Si ya es una URL completa, devolverla tal cual
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Eliminar "/" inicial si existe para evitar duplicados
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${DOCUMENTOS_BASE_URL}${cleanPath}`;
};

/**
 * Obtiene la URL base de la API
 * @returns URL base de la API
 */
export const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || 'http://167.99.169.248:8080';
};

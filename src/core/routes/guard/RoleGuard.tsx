import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { hasPermission } from '../../utils/rolePermissions';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredPath?: string;
}

/**
 * Guard que verifica si el usuario tiene permiso para acceder a una ruta específica
 * Si no tiene permiso, redirige a la primera ruta permitida según su rol
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({ children, requiredPath }) => {
  const { userRole, isAuthenticated } = useAuth();
  const location = useLocation();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Obtener la ruta a verificar (usar la actual si no se especifica)
  const pathToCheck = requiredPath || location.pathname;

  // Verificar si tiene permiso
  const hasAccess = hasPermission(userRole, pathToCheck);

  // Si no tiene permiso, redirigir a su primera ruta permitida
  if (!hasAccess) {
    const firstAllowedRoute = getFirstAllowedRoute(userRole);
    
    // Si tiene alguna ruta permitida, redirigir ahí
    if (firstAllowedRoute && firstAllowedRoute !== pathToCheck) {
      return <Navigate to={firstAllowedRoute} replace />;
    }
    
    // Si no tiene ninguna ruta permitida, redirigir al login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/**
 * Obtiene la primera ruta permitida para un rol
 */
const getFirstAllowedRoute = (userRole: string | null): string | null => {
  if (!userRole) return null;

  // Mapeo de rutas por defecto para cada rol
  const defaultRoutes: Record<string, string> = {
    'ADMINISTRADOR': '/admin/contenido/slider',
    'IMAGEN': '/admin/contenido/noticias',
    'ALCALDIA': '/admin/contenido/agenda',
  };

  return defaultRoutes[userRole] || null;
};

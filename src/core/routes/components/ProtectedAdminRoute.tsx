import { RoleGuard } from '../guard/RoleGuard';
import { LazyWrapper } from './LazyWrapper';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPath: string;
}

/**
 * Componente que combina LazyWrapper con RoleGuard
 * para proteger rutas del admin con verificación de permisos
 */
export const ProtectedAdminRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPath }) => {
  return (
    <RoleGuard requiredPath={requiredPath}>
      <LazyWrapper>
        {children}
      </LazyWrapper>
    </RoleGuard>
  );
};

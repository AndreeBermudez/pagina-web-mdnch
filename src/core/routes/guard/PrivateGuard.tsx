import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { ReactNode } from 'react';

interface PrivateGuardProps {
  children: ReactNode;
}

export const PrivateGuard = ({ children }: PrivateGuardProps) => {
	const { isAuthenticated, isLoading } = useAuth();

	// Mostrar loading mientras verifica autenticación
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="flex flex-col items-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
					<p className="text-gray-600">Verificando autenticación...</p>
				</div>
			</div>
		);
	}

	// Si no está autenticado, redirigir al login
	if (!isAuthenticated) {
		return <Navigate to="/admin/login" replace />;
	}

	// Si está autenticado, mostrar el contenido
	return <>{children}</>;
};

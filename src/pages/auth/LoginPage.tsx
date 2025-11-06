import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '../../core/components/auth/LoginForm';
import { useAuth } from '../../core/contexts/AuthContext';

export const LoginPage = () => {
  const { login, isAuthenticated, userRole } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    // Redirigir según el rol del usuario
    const defaultRoutes: Record<string, string> = {
      'ADMINISTRADOR': '/admin/contenido/slider',
      'IMAGEN': '/admin/contenido/noticias',
      'ALCALDIA': '/admin/contenido/agenda',
    };
    
    const redirectPath = userRole ? defaultRoutes[userRole] : '/admin/contenido/slider';
    return <Navigate to={redirectPath} replace />;
  }

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      
      if (!success) {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err: any) {
      // Manejar errores del servicio
      setError(err.message || 'Error al iniciar sesión. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      onLogin={handleLogin}
      error={error}
      isLoading={isLoading}
    />
  );
};
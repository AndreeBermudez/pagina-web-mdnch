import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '../../core/components/auth/LoginForm';
import { useAuth } from '../../core/contexts/AuthContext';

export const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Si ya está autenticado, redirigir al admin
  if (isAuthenticated) {
    return <Navigate to="/admin/contenido/slider" replace />;
  }

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      
      if (!success) {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Intente nuevamente.');
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
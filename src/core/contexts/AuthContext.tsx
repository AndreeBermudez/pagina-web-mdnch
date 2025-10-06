import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciales hardcodeadas
const ADMIN_CREDENTIALS = {
  username: 'Muni123',
  password: 'Muni123'
};

const AUTH_TOKEN_KEY = 'admin_auth_token';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      // Verificar que el token sea válido (simple validación)
      try {
        const tokenData = JSON.parse(atob(token));
        if (tokenData.username === ADMIN_CREDENTIALS.username && tokenData.timestamp) {
          // Token válido por 24 horas
          const now = Date.now();
          const tokenAge = now - tokenData.timestamp;
          const maxAge = 24 * 60 * 60 * 1000; // 24 horas

          if (tokenAge < maxAge) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem(AUTH_TOKEN_KEY);
          }
        }
      } catch (error) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Crear token simple
      const token = btoa(JSON.stringify({
        username,
        timestamp: Date.now()
      }));

      localStorage.setItem(AUTH_TOKEN_KEY, token);
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
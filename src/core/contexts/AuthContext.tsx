import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { logearUsuario, logout as logoutService, isAuthenticated as checkAuthentication, getUserRole, getUsername } from '../components/auth/services/logearUsuario';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  userRole: string | null;
  username: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Verificar autenticación al cargar
  useEffect(() => {
    const authenticated = checkAuthentication();
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      // Extraer datos del token decodificado
      setUserRole(getUserRole());
      setUsername(getUsername());
    }
    
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const response = await logearUsuario({ username, password });
      
      if (response.success) {
        setIsAuthenticated(true);
        // Extraer datos del token decodificado
        setUserRole(getUserRole());
        setUsername(getUsername());
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    logoutService();
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      isLoading,
      userRole,
      username
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

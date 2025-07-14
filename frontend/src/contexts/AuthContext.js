import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticación al cargar la app
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = authService.getCurrentUser();
        
        console.log('🔍 Verificando autenticación:', { token: !!token, userData: !!userData });
        
        if (token && userData) {
          console.log('✅ Usuario autenticado:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.log('❌ No hay autenticación válida');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función de login
  const login = async (credentials) => {
    try {
      setLoading(true);
      console.log('🔑 Intentando login con:', credentials.email);
      
      const response = await authService.login(credentials);
      console.log('📨 Respuesta del login:', response);
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      console.log('✅ Login exitoso, usuario guardado:', response.user);
      
      return { success: true, data: response };
    } catch (error) {
      console.error('❌ Error en login:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al iniciar sesión' 
      };
    } finally {
      setLoading(false);
    }
  };

  // Función de registro
  const register = async (userData) => {
    try {
      setLoading(true);
      console.log('📝 Intentando registro con:', userData.email);
      
      const response = await authService.register(userData);
      console.log('📨 Respuesta del registro:', response);
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      console.log('✅ Registro exitoso, usuario guardado:', response.user);
      
      return { success: true, data: response };
    } catch (error) {
      console.error('❌ Error en registro:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error al registrarse',
        errors: error.response?.data?.errors || []
      };
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Actualizar datos del usuario
  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

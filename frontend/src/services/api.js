import axios from 'axios';

// Configuración base de axios
const API_BASE_URL = 'http://localhost:5000/api'; // Hardcodeado temporalmente para debug

console.log('🔗 API Base URL configurada:', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos timeout
});

// Interceptor para agregar token automáticamente
apiClient.interceptors.request.use(
  (config) => {
    console.log('📤 Enviando request a:', config.baseURL + config.url);
    console.log('📤 Config de request:', config);
    
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Error en request interceptor:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
apiClient.interceptors.response.use(
  (response) => {
    console.log('📥 Respuesta recibida:', response);
    return response;
  },
  (error) => {
    console.error('❌ Error en response:', error);
    console.error('❌ Error config:', error.config);
    console.error('❌ Error request:', error.request);
    console.error('❌ Error response:', error.response);
    
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  // Registro de usuario
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // Login de usuario
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    const { user, token } = response.data;
    
    // Guardar en localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

// Servicios de usuario
export const userService = {
  // Obtener perfil
  getProfile: async () => {
    const response = await apiClient.get('/user/profile');
    return response.data;
  },

  // Actualizar username
  updateUsername: async (username) => {
    const response = await apiClient.put('/user/username', { username });
    
    // Actualizar usuario en localStorage
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...response.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return response.data;
  },

  // Actualizar contraseña
  updatePassword: async (passwordData) => {
    const response = await apiClient.put('/user/password', passwordData);
    return response.data;
  },

  // Eliminar cuenta
  deleteAccount: async () => {
    const response = await apiClient.delete('/user/account');
    
    // Limpiar localStorage
    authService.logout();
    
    return response.data;
  }
};

export default apiClient;

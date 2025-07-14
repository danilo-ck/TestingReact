import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/api';

const Home = () => {
  const { user, logout, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  
  // Estados para formularios
  const [usernameForm, setUsernameForm] = useState({
    newUsername: '',
    isEditing: false
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    isEditing: false
  });

  // Limpiar mensajes después de unos segundos
  useEffect(() => {
    if (message || errors.length > 0) {
      const timer = setTimeout(() => {
        setMessage('');
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, errors]);

  // Manejar cambio de username
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setMessage('');

    try {
      const response = await userService.updateUsername(usernameForm.newUsername);
      
      // Actualizar usuario en el contexto
      updateUser(response.user);
      
      setMessage('✅ Username actualizado correctamente');
      setUsernameForm({ newUsername: '', isEditing: false });
    } catch (error) {
      console.error('Error al actualizar username:', error);
      setErrors([error.response?.data?.error || 'Error al actualizar username']);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambio de contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setMessage('');

    // Validaciones frontend
    const validationErrors = [];
    if (!passwordForm.currentPassword) {
      validationErrors.push('La contraseña actual es requerida');
    }
    if (!passwordForm.newPassword) {
      validationErrors.push('La nueva contraseña es requerida');
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      validationErrors.push('Las contraseñas no coinciden');
    }
    if (passwordForm.newPassword.length < 6) {
      validationErrors.push('La nueva contraseña debe tener al menos 6 caracteres');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await userService.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      
      setMessage('✅ Contraseña actualizada correctamente');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        isEditing: false
      });
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      setErrors([error.response?.data?.error || 'Error al actualizar contraseña']);
    } finally {
      setLoading(false);
    }
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  ¡Hola, {user?.username}!
                </h1>
                <p className="text-sm text-gray-500">Bienvenido a tu panel</p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mensajes */}
        {message && (
          <div className="mb-6 p-4 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
            {message}
          </div>
        )}
        
        {errors.length > 0 && (
          <div className="mb-6 p-4 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200">
            <div className="space-y-2">
              <div className="font-semibold">❌ Errores encontrados:</div>
              {errors.map((error, index) => (
                <div key={index} className="text-sm pl-4">
                  • {error}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información del usuario */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📋 Información del perfil
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900 font-medium">{user?.email}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Username</label>
                <p className="text-gray-900 font-medium">{user?.username}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Miembro desde</label>
                <p className="text-gray-900 font-medium">
                  {user?.createdAt ? formatDate(user.createdAt) : 'No disponible'}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Última actualización</label>
                <p className="text-gray-900 font-medium">
                  {user?.updatedAt ? formatDate(user.updatedAt) : 'No disponible'}
                </p>
              </div>
            </div>
          </div>

          {/* Cambiar username */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              👤 Cambiar username
            </h2>
            
            {!usernameForm.isEditing ? (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Username actual: <strong>{user?.username}</strong></p>
                <button
                  onClick={() => setUsernameForm({ ...usernameForm, isEditing: true })}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Cambiar username
                </button>
              </div>
            ) : (
              <form onSubmit={handleUsernameSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nuevo username
                  </label>
                  <input
                    type="text"
                    value={usernameForm.newUsername}
                    onChange={(e) => setUsernameForm({ ...usernameForm, newUsername: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ingresa tu nuevo username"
                    required
                    minLength="3"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    {loading ? 'Guardando...' : 'Guardar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUsernameForm({ newUsername: '', isEditing: false })}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Cambiar contraseña */}
          <div className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              🔒 Cambiar contraseña
            </h2>
            
            {!passwordForm.isEditing ? (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">
                  Mantén tu cuenta segura actualizando tu contraseña regularmente
                </p>
                <button
                  onClick={() => setPasswordForm({ ...passwordForm, isEditing: true })}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Cambiar contraseña
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña actual
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Tu contraseña actual"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Tu nueva contraseña"
                    required
                    minLength="6"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Confirma tu nueva contraseña"
                    required
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    {loading ? 'Guardando...' : 'Actualizar contraseña'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPasswordForm({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                      isEditing: false
                    })}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

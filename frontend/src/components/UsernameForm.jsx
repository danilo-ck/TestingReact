import React, { useState } from 'react';
import { userService } from '../services/api';
import Button from './Button.jsx';
import TextInput from './TextInput.jsx';

const UsernameForm = ({ user, updateUser, onMessage, onError }) => {
  const [usernameForm, setUsernameForm] = useState({
    newUsername: '',
    isEditing: false
  });
  const [loading, setLoading] = useState(false);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await userService.updateUsername(usernameForm.newUsername);
      
      // Actualizar usuario en el contexto
      updateUser(response.user);
      
      onMessage('✅ Username actualizado correctamente');
      setUsernameForm({ newUsername: '', isEditing: false });
    } catch (error) {
      console.error('Error al actualizar username:', error);
      onError([error.response?.data?.error || 'Error al actualizar username']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        👤 Cambiar username
      </h2>
      
      {!usernameForm.isEditing ? (
        <div className="text-center py-4">
          <p className="text-gray-600 mb-4">
            Username actual: <strong>{user?.username}</strong>
          </p>
          <Button
            text="Cambiar username"
            onClick={() => setUsernameForm({ ...usernameForm, isEditing: true })}
            variant="primary"
            fullWidth={false}
          />
        </div>
      ) : (
        <form onSubmit={handleUsernameSubmit} className="space-y-4">
          <TextInput
            label="Nuevo username"
            value={usernameForm.newUsername}
            onChange={(e) => setUsernameForm({ ...usernameForm, newUsername: e.target.value })}
            placeholder="Ingresa tu nuevo username"
            required
            minLength="3"
          />
          
          <div className="flex space-x-3">
            <Button
              type="submit"
              text={loading ? 'Guardando...' : 'Guardar'}
              variant="primary"
              loading={loading}
              fullWidth={false}
              className="flex-1"
            />
            <Button
              type="button"
              text="Cancelar"
              variant="secondary"
              onClick={() => setUsernameForm({ newUsername: '', isEditing: false })}
              fullWidth={false}
              className="flex-1"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default UsernameForm;

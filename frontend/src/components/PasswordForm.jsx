import React, { useState } from 'react';
import { userService } from '../services/api';
import Button from './Button.jsx';
import TextInput from './TextInput.jsx';

const PasswordForm = ({ onMessage, onError }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    isEditing: false
  });
  const [loading, setLoading] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      onError(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await userService.updatePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      
      onMessage('✅ Contraseña actualizada correctamente');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        isEditing: false
      });
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      onError([error.response?.data?.error || 'Error al actualizar contraseña']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-2">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        🔒 Cambiar contraseña
      </h2>
      
      {!passwordForm.isEditing ? (
        <div className="text-center py-4">
          <p className="text-gray-600 mb-4">
            Mantén tu cuenta segura actualizando tu contraseña regularmente
          </p>
          <Button
            text="Cambiar contraseña"
            onClick={() => setPasswordForm({ ...passwordForm, isEditing: true })}
            variant="warning"
            fullWidth={false}
          />
        </div>
      ) : (
        <form onSubmit={handlePasswordSubmit} className="max-w-md mx-auto space-y-4">
          <TextInput
            label="Contraseña actual"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            placeholder="Tu contraseña actual"
            required
          />
          
          <TextInput
            label="Nueva contraseña"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            placeholder="Tu nueva contraseña"
            required
            minLength="6"
          />
          
          <TextInput
            label="Confirmar nueva contraseña"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            placeholder="Confirma tu nueva contraseña"
            required
          />
          
          <div className="flex space-x-3">
            <Button
              type="submit"
              text={loading ? 'Guardando...' : 'Actualizar contraseña'}
              variant="primary"
              loading={loading}
              fullWidth={false}
              className="flex-1"
            />
            <Button
              type="button"
              text="Cancelar"
              variant="secondary"
              onClick={() => setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
                isEditing: false
              })}
              fullWidth={false}
              className="flex-1"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default PasswordForm;

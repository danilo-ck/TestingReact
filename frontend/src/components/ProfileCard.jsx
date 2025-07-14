import React from 'react';

const ProfileCard = ({ user }) => {
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
  );
};

export default ProfileCard;

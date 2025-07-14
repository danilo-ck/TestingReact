import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header.jsx';
import ProfileCard from '../components/ProfileCard.jsx';
import UsernameForm from '../components/UsernameForm.jsx';
import PasswordForm from '../components/PasswordForm.jsx';
import MessageDisplay from '../components/MessageDisplay.jsx';

const Home = () => {
  const { user, logout, updateUser } = useAuth();
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);

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

  // Funciones para manejar mensajes
  const handleMessage = (msg) => {
    setMessage(msg);
    setErrors([]);
  };

  const handleError = (errorList) => {
    setErrors(errorList);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} />

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MessageDisplay message={message} errors={errors} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información del usuario */}
          <ProfileCard user={user} />

          {/* Cambiar username */}
          <UsernameForm 
            user={user} 
            updateUser={updateUser}
            onMessage={handleMessage}
            onError={handleError}
          />

          {/* Cambiar contraseña */}
          <PasswordForm 
            onMessage={handleMessage}
            onError={handleError}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;

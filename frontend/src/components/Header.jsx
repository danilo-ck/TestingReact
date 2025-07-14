import React from 'react';
import Button from './Button.jsx';

const Header = ({ user, onLogout }) => {
  return (
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
          
          <Button
            text="Cerrar sesión"
            onClick={onLogout}
            variant="danger"
            fullWidth={false}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

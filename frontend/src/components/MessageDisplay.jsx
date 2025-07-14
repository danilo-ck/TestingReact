import React from 'react';

const MessageDisplay = ({ message, errors }) => {
  if (!message && (!errors || errors.length === 0)) {
    return null;
  }

  return (
    <>
      {/* Mensaje de éxito */}
      {message && (
        <div className="mb-6 p-4 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
          {message}
        </div>
      )}
      
      {/* Mensajes de error */}
      {errors && errors.length > 0 && (
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
    </>
  );
};

export default MessageDisplay;

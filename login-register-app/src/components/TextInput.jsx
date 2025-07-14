import React from 'react';

// TextInput: componente reutilizable para campos de texto
// Props: label (nombre del campo), value (contenido), onChange (gestor de cambio), type (tipo de input)
// Ahora con diseño moderno usando Tailwind CSS
const TextInput = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div className="mb-4 animate-slideIn">
      <label className="block text-gray-700 text-sm font-semibold mb-2 tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="
          w-full                    /* Ancho completo */
          px-4 py-3                /* Padding horizontal y vertical generoso */
          border border-gray-200   /* Borde sutil gris claro */
          rounded-lg               /* Bordes redondeados */
          bg-gray-50               /* Fondo gris muy claro */
          text-gray-900            /* Texto oscuro */
          placeholder-gray-500     /* Color del placeholder */
          focus:outline-none       /* Sin outline por defecto */
          focus:border-primary-500 /* Borde cambia a tu color al focus */
          focus:ring-2             /* Anillo de enfoque */
          focus:ring-primary-200   /* Anillo más sutil */
          focus:bg-white           /* Fondo blanco al enfocar */
          transition-all           /* Transición suave */
          duration-200             /* Duración de 200ms */
        "
        style={{ outline: 'none' }} /* Solo eliminar outline, mantener border */
        placeholder={`Ingresa tu ${label.toLowerCase().replace(':', '')}`}
      />
    </div>
  );
};

export default TextInput;

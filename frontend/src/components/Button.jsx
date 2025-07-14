import React from 'react';

// Button: componente reutilizable para botones
// Props: text (texto del botón), onClick (función que se ejecuta al hacer clic), variant (estilo del botón), loading (estado de carga), fullWidth (ancho completo)
// Ahora con diseño moderno usando Tailwind CSS y efectos avanzados
const Button = ({ text, onClick, variant = 'primary', loading = false, fullWidth = false }) => {
  // Estilos base que comparten todos los botones
  const baseStyles = `
    px-6 py-3                    /* Padding generoso */
    rounded-lg                   /* Bordes redondeados */
    font-medium                  /* Peso de fuente medio */
    transition-all               /* Transición suave */
    duration-200                 /* Duración de 200ms */
    focus:outline-none           /* Sin outline por defecto */
    focus:ring-2                 /* Anillo de enfoque */
    focus:ring-offset-2          /* Espacio del anillo */
    border-0                     /* Sin borde por defecto */
    transform                    /* Habilitar transformaciones */
    hover:scale-105              /* Efecto hover de escala */
    active:scale-95              /* Efecto al presionar */
    animate-slideIn              /* Animación de entrada */
    inline-flex                  /* Flex en línea */
    items-center                 /* Centrar elementos */
    justify-center               /* Centrar contenido */
  `;

  // Estilos específicos según el variant
  const variantStyles = {
    primary: `
      bg-primary-500               /* Fondo con tu color */
      text-white                   /* Texto blanco */
      hover:bg-primary-600         /* Hover más oscuro */
      focus:ring-primary-200       /* Anillo de enfoque */
      shadow-md                    /* Sombra media */
      hover:shadow-lg              /* Sombra más grande al hover */
    `,
    secondary: `
      bg-gray-500                  /* Fondo gris */
      text-white                   /* Texto blanco */
      hover:bg-gray-600            /* Hover más oscuro */
      focus:ring-gray-200          /* Anillo de enfoque */
      shadow-md                    /* Sombra media */
      hover:shadow-lg              /* Sombra más grande al hover */
    `,
    danger: `
      bg-red-500                   /* Fondo rojo */
      text-white                   /* Texto blanco */
      hover:bg-red-600             /* Hover más oscuro */
      focus:ring-red-200           /* Anillo de enfoque */
      shadow-md                    /* Sombra media */
      hover:shadow-lg              /* Sombra más grande al hover */
    `,
    warning: `
      bg-orange-500                /* Fondo naranja */
      text-white                   /* Texto blanco */
      hover:bg-orange-600          /* Hover más oscuro */
      focus:ring-orange-200        /* Anillo de enfoque */
      shadow-md                    /* Sombra media */
      hover:shadow-lg              /* Sombra más grande al hover */
    `,
    ghost: `
      bg-transparent              /* Fondo transparente */
      text-gray-600               /* Texto gris */
      hover:text-primary-600      /* Cambio de color al hover */
      hover:bg-gray-50            /* Fondo sutil al hover */
      focus:ring-gray-200         /* Anillo de enfoque gris */
    `
  };

  return (
    <button 
      onClick={onClick} 
      disabled={loading}
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full mb-3' : ''} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
      style={{ outline: 'none', border: variant === 'ghost' ? 'none' : undefined }}
    >
      {loading && variant === 'primary' ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Procesando...
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;

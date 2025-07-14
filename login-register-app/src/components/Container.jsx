import React from 'react';

// Container: componente que envuelve todo el contenido
// Props: children (elementos hijos)
// Ahora usando Tailwind CSS para un diseño más moderno
const Container = ({ children }) => {
  return (
    <div className="
      max-w-md          /* Ancho máximo similar a los 400px originales */
      mx-auto           /* Centrado horizontal automático */
      my-8              /* Margen vertical (2rem = 32px) */
      p-8               /* Padding interno (2rem = 32px) */
      glass-effect      /* Efecto glass personalizado */
      rounded-xl        /* Bordes redondeados más pronunciados */
      shadow-2xl        /* Sombra más dramática y moderna */
      border border-white/20  /* Borde translúcido */
      animate-fadeIn    /* Animación de entrada */
      transform         /* Habilitar transformaciones */
      hover:scale-100   /* Efecto hover sutil */
      transition-all    /* Transición suave */
      duration-300      /* Duración de 300ms */
    ">
      {children}
    </div>
  );
};

export default Container;
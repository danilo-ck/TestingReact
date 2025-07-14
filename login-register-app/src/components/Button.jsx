import React from 'react';

// Button: componente reutilizable para botones
// Props: text (texto del botón), onClick (función que se ejecuta al hacer clic)
const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}>
      {text}
    </button>
  );
};

export default Button;

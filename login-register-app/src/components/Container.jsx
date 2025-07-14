import React from 'react';

// Container: componente que envuelve todo el contenido
// Props: children (elementos hijos)
const Container = ({ children }) => {
  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: 'white',
    }}>
      {children}
    </div>
  );
};

export default Container;
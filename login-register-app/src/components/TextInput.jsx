import React from 'react';

// TextInput: componente reutilizable para campos de texto
// Props: label (nombre del campo), value (contenido), onChange (gestor de cambio)
const TextInput = ({ label, value, onChange, type = 'text' }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        {label}
        <input
          type={type}
          value={value}
          onChange={onChange}
          style={{ display: 'block', padding: '0.5rem', width: '100%' }}
        />
      </label>
    </div>
  );
};

export default TextInput;

import React, { useState } from 'react';
import TextInput from './components/TextInput';
import Button from './components/Button';
import Container from './components/Container';

// Formulario con modo login/registro
// Maneja campos de email y contraseña, validaciones simples y logs de consola
function App() {
  // Estado para guardar los valores del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login'); // puede ser 'login' o 'register'
  const [message, setMessage] = useState('');

  // Cambia entre login y registro
  const toggleMode = () => {
    console.log('Cambiando modo de formulario');
    setMode(mode === 'login' ? 'register' : 'login');
    setMessage('');
    setEmail('');
    setPassword('');
  };

  // Valida los datos del formulario antes de enviar
  const handleSubmit = () => {
    console.log('Enviando formulario...');
    let isValid = true;
    let errors = [];

    if (!email.includes('@') || !email.endsWith('.com')) {
      errors.push('Email inválido');
      isValid = false;
    }

    if (password.trim().length <= 5) {
      errors.push('La contraseña debe tener más de 5 caracteres');
      isValid = false;
    }

    // Validación adicional 1: no puede contener "123"
    if (password.includes('123')) {
      errors.push('La contraseña no debe contener secuencias fáciles como "123"');
      isValid = false;
    }

    // Validación adicional 2: al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
      errors.push('La contraseña debe tener al menos una letra mayúscula');
      isValid = false;
    }

    // Validación adicional 3: al menos un número
    if (!/\d/.test(password)) {
      errors.push('La contraseña debe tener al menos un número');
      isValid = false;
    }

    if (isValid) {
      console.log('Formulario válido');
      setMessage(`✅ ${mode === 'login' ? 'Login' : 'Registro'} exitoso`);
    } else {
      console.log('Errores encontrados:', errors);
      setMessage(`❌ ${errors.join(', ')}`);
    }
  };

  return (
    <Container>
      <h2>{mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}</h2>
      <TextInput
        label="Correo electrónico:"
        value={email}
        onChange={(e) => {
          console.log('Email cambiado:', e.target.value);
          setEmail(e.target.value);
        }}
      />
      <TextInput
        label="Contraseña:"
        value={password}
        type="password"
        onChange={(e) => {
          console.log('Contraseña cambiada');
          setPassword(e.target.value);
        }}
      />
      <div style={{ marginBottom: '1rem' }}>
        <Button text={mode === 'login' ? 'Entrar' : 'Registrarse'} onClick={handleSubmit} />
        <Button
          text={mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          onClick={toggleMode}
        />
      </div>
      {message && (
        <p style={{ backgroundColor: '#eee', padding: '0.5rem', borderRadius: '5px' }}>
          {message}
        </p>
      )}
    </Container>
  );
}

export default App;


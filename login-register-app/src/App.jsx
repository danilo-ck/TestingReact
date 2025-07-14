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
  const [errors, setErrors] = useState([]); // Array de errores separado
  const [loading, setLoading] = useState(false); // Estado de carga

  // Cambia entre login y registro
  const toggleMode = () => {
    console.log('Cambiando modo de formulario');
    setMode(mode === 'login' ? 'register' : 'login');
    setMessage('');
    setErrors([]); // Limpiar errores
    setEmail('');
    setPassword('');
  };

  // Valida los datos del formulario antes de enviar
  const handleSubmit = async () => {
    console.log('Enviando formulario...');
    setLoading(true); // Activar estado de carga
    setMessage(''); // Limpiar mensajes anteriores
    setErrors([]); // Limpiar errores anteriores
    
    // Simular delay de red realista
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let isValid = true;
    let validationErrors = [];

    if (!email.includes('@') || !email.endsWith('.com')) {
      validationErrors.push('Email inválido');
      isValid = false;
    }

    if (password.trim().length <= 5) {
      validationErrors.push('La contraseña debe tener más de 5 caracteres');
      isValid = false;
    }

    // Validación adicional 1: no puede contener "123"
    if (password.includes('123')) {
      validationErrors.push('La contraseña no debe contener secuencias fáciles como "123"');
      isValid = false;
    }

    // Validación adicional 2: al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
      validationErrors.push('La contraseña debe tener al menos una letra mayúscula');
      isValid = false;
    }

    // Validación adicional 3: al menos un número
    if (!/\d/.test(password)) {
      validationErrors.push('La contraseña debe tener al menos un número');
      isValid = false;
    }

    if (isValid) {
      console.log('Formulario válido');
      setMessage(`✅ ${mode === 'login' ? 'Login' : 'Registro'} exitoso`);
    } else {
      console.log('Errores encontrados:', validationErrors);
      setErrors(validationErrors); // Guardar errores como array
    }
    
    setLoading(false); // Desactivar estado de carga
  };

  return (
    <Container>
      {/* Título principal con tipografía mejorada */}
      <h1 className="text-primary-600 font-bold text-center mb-2 text-3xl tracking-tight">
        {mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
      </h1>
      
      {/* Subtítulo descriptivo */}
      <p className="text-gray-600 text-center mb-8 text-sm">
        {mode === 'login' 
          ? 'Accede a tu cuenta para continuar' 
          : 'Crea tu cuenta para comenzar'
        }
      </p>
      
      {/* Formulario con mejor espaciado */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
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
      </form>

      {/* Botones con espaciado mejorado */}
      <div className="space-y-3 mt-6">
        <Button 
          text={mode === 'login' ? 'Entrar' : 'Registrarse'} 
          onClick={handleSubmit}
          variant="primary"
          loading={loading}
        />
        <Button
          text={mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          onClick={toggleMode}
          variant="ghost"
        />
      </div>
      {/* Mostrar mensaje de éxito o errores */}
      {message && (
        <div className="mt-4 p-4 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200">
          {message}
        </div>
      )}
      
      {errors.length > 0 && (
        <div className="mt-4 p-4 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200">
          <div className="space-y-2">
            <div className="font-semibold">❌ Errores encontrados:</div>
            {errors.map((error, index) => (
              <div key={index} className="text-sm pl-4 border-red-300">
                • {error}
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

export default App;


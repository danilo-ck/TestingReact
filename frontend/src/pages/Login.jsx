import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput.jsx';
import Button from '../components/Button.jsx';
import Container from '../components/Container.jsx';
import MessageDisplay from '../components/MessageDisplay.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setMessage('');
    setErrors([]);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
    setErrors([]);

    console.log('🚀 Iniciando proceso de autenticación:', { mode, email, username });

    try {
      let result;
      
      if (mode === 'login') {
        console.log('🔑 Llamando a login...');
        result = await login({ email, password });
      } else {
        console.log('📝 Llamando a register...');
        result = await register({ email, username, password });
      }

      console.log('📋 Resultado de autenticación:', result);

      if (result.success) {
        setMessage(`✅ ${mode === 'login' ? 'Login' : 'Registro'} exitoso`);
        console.log('🎉 Autenticación exitosa, redirigiendo...');
        // Redirigir al home después de un breve delay
        setTimeout(() => {
          console.log('🏠 Navegando al home...');
          navigate('/home');
        }, 1000);
      } else {
        console.log('❌ Error en autenticación:', result);
        if (result.errors && result.errors.length > 0) {
          setErrors(result.errors);
        } else {
          setErrors([result.error]);
        }
      }
    } catch (error) {
      console.error('💥 Error inesperado en autenticación:', error);
      setErrors(['Error inesperado. Por favor intenta de nuevo.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* Título principal */}
      <h1 className="text-primary-600 font-bold text-center mb-2 text-3xl tracking-tight">
        {mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
      </h1>
      
      {/* Subtítulo */}
      <p className="text-gray-600 text-center mb-8 text-sm">
        {mode === 'login' 
          ? 'Accede a tu cuenta para continuar' 
          : 'Crea tu cuenta para comenzar'
        }
      </p>
      
      {/* Formulario */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <TextInput
          label="Correo electrónico:"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {mode === 'register' && (
          <TextInput
            label="Nombre de usuario:"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        
        <TextInput
          label="Contraseña:"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>

      {/* Botones */}
      <div className="space-y-3 mt-6">
        <Button 
          text={mode === 'login' ? 'Entrar' : 'Registrarse'} 
          onClick={handleSubmit}
          variant="primary"
          loading={loading}
          fullWidth={true}
        />
        <Button
          text={mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          onClick={toggleMode}
          variant="ghost"
          fullWidth={true}
        />
      </div>

      {/* Mensajes */}
      <MessageDisplay message={message} errors={errors} />
    </Container>
  );
};

export default Login;

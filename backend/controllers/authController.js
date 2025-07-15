const { PrismaClient } = require('@prisma/client');
const { CreateUserDTO, LoginDTO, UserDTO } = require('../utils/userDTO');
const PasswordUtils = require('../utils/passwordUtils');
const AuthUtils = require('../utils/authUtils');

const prisma = new PrismaClient();

class AuthController {

  // Registro de usuario
  static async register(req, res) {
    try {
      // Log seguro sin mostrar la contraseña
      const { password, ...safeData } = req.body;
      console.log('Intento de registro:', safeData);

      // Validar datos de entrada
      const createUserDTO = new CreateUserDTO(req.body);
      const validationErrors = createUserDTO.validate();

      if (validationErrors.length > 0) {
        return res.status(400).json({
          error: 'Datos inválidos',
          errors: validationErrors
        });
      }

      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: createUserDTO.email },
            { username: createUserDTO.username }
          ]
        }
      });

      if (existingUser) {
        const field = existingUser.email === createUserDTO.email ? 'email' : 'username';
        return res.status(409).json({
          error: 'Usuario ya existe',
          message: `El ${field} ya está en uso`
        });
      }

      // Hash de la contraseña
      const hashedPassword = await PasswordUtils.hashPassword(createUserDTO.password);

      // Crear usuario
      const newUser = await prisma.user.create({
        data: {
          email: createUserDTO.email,
          username: createUserDTO.username,
          password: hashedPassword
        }
      });

      // Generar token
      const tokenPayload = AuthUtils.createTokenPayload(newUser);
      const token = AuthUtils.generateToken(tokenPayload);

      // Respuesta exitosa
      console.log('Usuario registrado exitosamente:', newUser.email);
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: new UserDTO(newUser),
        token
      });

    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo crear el usuario'
      });
    }
  }

  // Login de usuario
  static async login(req, res) {
    try {
      console.log('Intento de login:', req.body.email);

      // Validar datos de entrada
      const loginDTO = new LoginDTO(req.body);
      const validationErrors = loginDTO.validate();

      if (validationErrors.length > 0) {
        return res.status(400).json({
          error: 'Datos inválidos',
          errors: validationErrors
        });
      }

      // Buscar usuario por email
      const user = await prisma.user.findUnique({
        where: { email: loginDTO.email }
      });

      if (!user) {
        return res.status(401).json({
          error: 'Credenciales inválidas',
          message: 'Email o contraseña incorrectos'
        });
      }

      // Verificar contraseña
      const isPasswordValid = await PasswordUtils.verifyPassword(
        loginDTO.password, 
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          error: 'Credenciales inválidas',
          message: 'Email o contraseña incorrectos'
        });
      }

      // Generar token
      const tokenPayload = AuthUtils.createTokenPayload(user);
      const token = AuthUtils.generateToken(tokenPayload);

      // Respuesta exitosa
      console.log('Login exitoso:', user.email);
      res.json({
        message: 'Login exitoso',
        user: new UserDTO(user),
        token
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo iniciar sesión'
      });
    }
  }

  // Verificar token (ruta protegida de prueba)
  static async verifyToken(req, res) {
    try {
      // El middleware de auth ya verificó el token y agregó req.user
      res.json({
        message: 'Token válido',
        user: req.user
      });
    } catch (error) {
      console.error('Error en verificación de token:', error);
      res.status(500).json({
        error: 'Error interno del servidor'
      });
    }
  }
}

module.exports = AuthController;

const jwt = require('jsonwebtoken');

class AuthUtils {
  
  // Generar token JWT
  static generateToken(payload) {
    return jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: '24h' // Token válido por 24 horas
      }
    );
  }

  // Verificar token JWT
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  // Extraer token del header Authorization
  static extractToken(authHeader) {
    if (!authHeader) {
      throw new Error('Token no proporcionado');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new Error('Formato de token inválido');
    }

    return authHeader.substring(7); // Remover "Bearer "
  }

  // Crear payload para el token
  static createTokenPayload(user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username
    };
  }
}

module.exports = AuthUtils;

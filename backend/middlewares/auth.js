const AuthUtils = require('../utils/authUtils');

// Middleware para verificar autenticación
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = AuthUtils.extractToken(authHeader);
    const decoded = AuthUtils.verifyToken(token);
    
    // Agregar información del usuario a la request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error.message);
    return res.status(401).json({ 
      error: 'No autorizado',
      message: error.message 
    });
  }
};

// Middleware opcional de autenticación (no falla si no hay token)
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = AuthUtils.extractToken(authHeader);
      const decoded = AuthUtils.verifyToken(token);
      req.user = decoded;
    }
    next();
  } catch (error) {
    // Si hay error, continuar sin usuario autenticado
    next();
  }
};

module.exports = {
  authenticateToken,
  optionalAuth
};

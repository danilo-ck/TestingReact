const express = require('express');
const AuthController = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// POST /api/auth/register - Registrar nuevo usuario
router.post('/register', AuthController.register);

// POST /api/auth/login - Iniciar sesión
router.post('/login', AuthController.login);

// GET /api/auth/verify - Verificar token (ruta protegida)
router.get('/verify', authenticateToken, AuthController.verifyToken);

module.exports = router;

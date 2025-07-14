const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Todas las rutas de usuario requieren autenticación
router.use(authenticateToken);

// GET /api/user/profile - Obtener perfil del usuario
router.get('/profile', UserController.getProfile);

// PUT /api/user/username - Actualizar username
router.put('/username', UserController.updateUsername);

// PUT /api/user/password - Actualizar contraseña
router.put('/password', UserController.updatePassword);

// DELETE /api/user/account - Eliminar cuenta
router.delete('/account', UserController.deleteAccount);

module.exports = router;

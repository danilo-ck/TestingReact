const { PrismaClient } = require('@prisma/client');
const { UpdateUserDTO, UserDTO } = require('../utils/userDTO');
const PasswordUtils = require('../utils/passwordUtils');

const prisma = new PrismaClient();

class UserController {

  // Obtener perfil del usuario autenticado
  static async getProfile(req, res) {
    try {
      const userId = req.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado'
        });
      }

      res.json({
        user: new UserDTO(user)
      });

    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({
        error: 'Error interno del servidor'
      });
    }
  }

  // Actualizar username
  static async updateUsername(req, res) {
    try {
      const userId = req.user.id;
      const { username } = req.body;

      // Validar datos
      const updateDTO = new UpdateUserDTO({ username });
      const validationErrors = updateDTO.validate();

      if (validationErrors.length > 0) {
        return res.status(400).json({
          error: 'Datos inválidos',
          errors: validationErrors
        });
      }

      // Verificar si el username ya existe
      const existingUser = await prisma.user.findUnique({
        where: { username: updateDTO.username }
      });

      if (existingUser && existingUser.id !== userId) {
        return res.status(409).json({
          error: 'Username ya existe',
          message: 'El username ya está en uso por otro usuario'
        });
      }

      // Actualizar usuario
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { username: updateDTO.username }
      });

      console.log('Username actualizado:', updatedUser.email, '->', updatedUser.username);
      res.json({
        message: 'Username actualizado exitosamente',
        user: new UserDTO(updatedUser)
      });

    } catch (error) {
      console.error('Error al actualizar username:', error);
      res.status(500).json({
        error: 'Error interno del servidor'
      });
    }
  }

  // Actualizar contraseña
  static async updatePassword(req, res) {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;

      // Validar que se proporcionen ambas contraseñas
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          error: 'Datos inválidos',
          errors: ['Contraseña actual y nueva contraseña son requeridas']
        });
      }

      // Validar nueva contraseña
      const updateDTO = new UpdateUserDTO({ password: newPassword });
      const validationErrors = updateDTO.validate();

      if (validationErrors.length > 0) {
        return res.status(400).json({
          error: 'Datos inválidos',
          errors: validationErrors
        });
      }

      // Obtener usuario actual
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado'
        });
      }

      // Verificar contraseña actual
      const isCurrentPasswordValid = await PasswordUtils.verifyPassword(
        currentPassword, 
        user.password
      );

      if (!isCurrentPasswordValid) {
        return res.status(401).json({
          error: 'Contraseña actual incorrecta'
        });
      }

      // Hash de la nueva contraseña
      const hashedNewPassword = await PasswordUtils.hashPassword(newPassword);

      // Actualizar contraseña
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword }
      });

      console.log('Contraseña actualizada para usuario:', updatedUser.email);
      res.json({
        message: 'Contraseña actualizada exitosamente',
        user: new UserDTO(updatedUser)
      });

    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      res.status(500).json({
        error: 'Error interno del servidor'
      });
    }
  }

  // Eliminar cuenta
  static async deleteAccount(req, res) {
    try {
      const userId = req.user.id;
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({
          error: 'Contraseña requerida para eliminar cuenta'
        });
      }

      // Obtener usuario
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({
          error: 'Usuario no encontrado'
        });
      }

      // Verificar contraseña
      const isPasswordValid = await PasswordUtils.verifyPassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          error: 'Contraseña incorrecta'
        });
      }

      // Eliminar usuario
      await prisma.user.delete({
        where: { id: userId }
      });

      console.log('Cuenta eliminada:', user.email);
      res.json({
        message: 'Cuenta eliminada exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      res.status(500).json({
        error: 'Error interno del servidor'
      });
    }
  }
}

module.exports = UserController;

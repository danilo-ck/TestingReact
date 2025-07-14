const bcrypt = require('bcryptjs');

class PasswordUtils {
  
  // Hash de la contraseña
  static async hashPassword(password) {
    const saltRounds = 12; // Número de rounds para el salt
    return await bcrypt.hash(password, saltRounds);
  }

  // Verificar contraseña
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = PasswordUtils;

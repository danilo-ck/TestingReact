// DTO (Data Transfer Object) para el usuario
// Define la estructura de datos que se envían y reciben en la API

class UserDTO {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    // NO incluimos la contraseña por seguridad
  }
}

class CreateUserDTO {
  constructor(data) {
    this.email = data.email?.trim().toLowerCase();
    this.username = data.username?.trim();
    this.password = data.password;
  }

  // Validaciones
  validate() {
    const errors = [];

    // Validar email
    if (!this.email) {
      errors.push('Email es requerido');
    } else if (!this.isValidEmail(this.email)) {
      errors.push('Email inválido');
    }

    // Validar username
    if (!this.username) {
      errors.push('Username es requerido');
    } else if (this.username.length < 3) {
      errors.push('Username debe tener al menos 3 caracteres');
    } else if (this.username.length > 30) {
      errors.push('Username no puede tener más de 30 caracteres');
    } else if (!/^[a-zA-Z0-9_]+$/.test(this.username)) {
      errors.push('Username solo puede contener letras, números y guiones bajos');
    }

    // Validar password
    if (!this.password) {
      errors.push('Contraseña es requerida');
    } else if (this.password.length <= 5) {
      errors.push('La contraseña debe tener más de 5 caracteres');
    } else if (this.password.includes('123')) {
      errors.push('La contraseña no debe contener secuencias fáciles como "123"');
    } else if (!/[A-Z]/.test(this.password)) {
      errors.push('La contraseña debe tener al menos una letra mayúscula');
    } else if (!/\d/.test(this.password)) {
      errors.push('La contraseña debe tener al menos un número');
    }

    return errors;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.endsWith('.com');
  }
}

class LoginDTO {
  constructor(data) {
    this.email = data.email?.trim().toLowerCase();
    this.password = data.password;
  }

  validate() {
    const errors = [];

    if (!this.email) {
      errors.push('Email es requerido');
    }

    if (!this.password) {
      errors.push('Contraseña es requerida');
    }

    return errors;
  }
}

class UpdateUserDTO {
  constructor(data) {
    this.username = data.username?.trim();
    this.password = data.password;
  }

  validate() {
    const errors = [];

    // Solo validar si se proporcionan los campos
    if (this.username !== undefined) {
      if (this.username.length < 3) {
        errors.push('Username debe tener al menos 3 caracteres');
      } else if (this.username.length > 30) {
        errors.push('Username no puede tener más de 30 caracteres');
      } else if (!/^[a-zA-Z0-9_]+$/.test(this.username)) {
        errors.push('Username solo puede contener letras, números y guiones bajos');
      }
    }

    if (this.password !== undefined) {
      if (this.password.length <= 5) {
        errors.push('La contraseña debe tener más de 5 caracteres');
      } else if (this.password.includes('123')) {
        errors.push('La contraseña no debe contener secuencias fáciles como "123"');
      } else if (!/[A-Z]/.test(this.password)) {
        errors.push('La contraseña debe tener al menos una letra mayúscula');
      } else if (!/\d/.test(this.password)) {
        errors.push('La contraseña debe tener al menos un número');
      }
    }

    return errors;
  }
}

module.exports = {
  UserDTO,
  CreateUserDTO,
  LoginDTO,
  UpdateUserDTO
};

# Login Register App - Full Stack

Aplicación completa de autenticación desarrollada con React, Node.js, Express y Prisma. Incluye sistema de login/registro, gestión de usuarios y una interfaz moderna con Tailwind CSS.

## 🚀 Tecnologías utilizadas

### Frontend
- **React 19.1.0** - Framework principal
- **React Router DOM 7.6.3** - Enrutamiento de la aplicación
- **Tailwind CSS 3.4.17** - Framework de CSS
- **Axios 1.10.0** - Cliente HTTP para APIs
- **Context API** - Gestión del estado de autenticación

### Backend
- **Node.js** - Runtime de servidor
- **Express 5.1.0** - Framework web
- **Prisma 6.11.1** - ORM para base de datos
- **SQLite** - Base de datos
- **JWT (jsonwebtoken 9.0.2)** - Autenticación con tokens
- **bcryptjs 3.0.2** - Encriptación de contraseñas
- **CORS 2.8.5** - Cross-Origin Resource Sharing

## 📁 Estructura del proyecto

```
TestingReact/
├── frontend/                    # Aplicación React
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── Button.jsx
│   │   │   ├── Container.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── MessageDisplay.jsx
│   │   │   ├── PasswordForm.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── TextInput.jsx
│   │   │   └── UsernameForm.jsx
│   │   ├── contexts/           # Context de React
│   │   │   └── AuthContext.js  # Gestión del estado de autenticación
│   │   ├── pages/             # Páginas de la aplicación
│   │   │   ├── Home.jsx       # Dashboard para usuarios autenticados
│   │   │   ├── LandingPage.jsx # Página de inicio
│   │   │   └── Login.jsx      # Login y registro
│   │   ├── services/          # Servicios de API
│   │   │   └── api.js         # Cliente HTTP con axios
│   │   └── utils/             # Utilidades
│   ├── public/                # Archivos estáticos
│   └── build/                 # Build de producción
├── backend/                   # API Node.js
│   ├── controllers/           # Controladores
│   │   ├── authController.js  # Lógica de autenticación
│   │   └── userController.js  # Gestión de usuarios
│   ├── middlewares/           # Middlewares
│   │   └── auth.js           # Verificación de JWT
│   ├── prisma/               # Configuración de Prisma
│   │   ├── schema.prisma     # Esquema de base de datos
│   │   └── dev.db           # Base de datos SQLite
│   ├── routes/               # Rutas de la API
│   │   ├── auth.js          # Rutas de autenticación
│   │   └── user.js          # Rutas de usuario
│   ├── utils/                # Utilidades del backend
│   │   ├── authUtils.js     # Utilidades de autenticación
│   │   ├── passwordUtils.js # Gestión de contraseñas
│   │   └── userDTO.js       # DTOs para datos de usuario
│   └── index.js             # Servidor principal
└── README.md                # Este archivo
```

## ✨ Funcionalidades implementadas

### Frontend
- ✅ **Landing Page moderna** con secciones completas
- ✅ **Sistema de autenticación** completo (login/registro)
- ✅ **Rutas protegidas** con React Router
- ✅ **Context API** para gestión del estado global
- ✅ **Dashboard de usuario** con perfil y gestión de cuenta
- ✅ **Formularios de actualización** de username y contraseña
- ✅ **Manejo de errores** y validaciones
- ✅ **Interfaz responsive** con Tailwind CSS
- ✅ **Loading states** y feedback visual
- ✅ **Interceptores de axios** para manejo automático de tokens

### Backend
- ✅ **API RESTful** con Express
- ✅ **Base de datos** con Prisma ORM y SQLite
- ✅ **Autenticación JWT** segura
- ✅ **Encriptación de contraseñas** con bcrypt
- ✅ **Middlewares de autenticación**
- ✅ **Validaciones** de datos de entrada
- ✅ **DTOs** para transferencia de datos
- ✅ **CORS** configurado para desarrollo
- ✅ **Controladores organizados** por funcionalidad
- ✅ **Manejo de errores** centralizado

### Endpoints de la API
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/verify` - Verificación de token
- `PUT /api/user/username` - Actualización de username
- `PUT /api/user/password` - Cambio de contraseña
- `GET /api/user/profile` - Obtener perfil del usuario

## 🛠️ Instalación y configuración

### Prerequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/TestingReact.git
cd TestingReact
```

2. **Configurar el Frontend**
```bash
cd frontend
npm install
```

3. **Configurar el Backend**
```bash
cd ../backend
npm install
```

4. **Configurar la base de datos**
```bash
# En el directorio backend
npm run db:generate
npm run db:push
```

## 🚀 Ejecución del proyecto

### Desarrollo
1. **Iniciar el backend**
```bash
cd backend
npm run dev
# El servidor se ejecuta en http://localhost:5000
```

2. **Iniciar el frontend** (en otra terminal)
```bash
cd frontend
npm start
# La aplicación se abre en http://localhost:3000
```

### Producción
1. **Build del frontend**
```bash
cd frontend
npm run build
```

2. **Iniciar el backend**
```bash
cd backend
npm start
```

## 📊 Scripts disponibles

### Frontend
- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Crea el build de producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Expone la configuración de React Scripts

### Backend
- `npm run dev` - Inicia el servidor con nodemon (desarrollo)
- `npm start` - Inicia el servidor (producción)
- `npm run db:generate` - Genera el cliente de Prisma
- `npm run db:push` - Sincroniza el esquema con la base de datos
- `npm run db:migrate` - Ejecuta migraciones
- `npm run db:studio` - Abre Prisma Studio

## 🔒 Seguridad

- **Contraseñas encriptadas** con bcrypt
- **Tokens JWT** para autenticación
- **Validación de datos** en frontend y backend
- **Middleware de autenticación** para rutas protegidas
- **CORS** configurado correctamente
- **Headers de seguridad** implementados

## 🎨 Características de UI/UX

- **Diseño moderno** y responsive
- **Tema consistente** con Tailwind CSS
- **Feedback visual** para todas las acciones
- **Loading states** durante las operaciones
- **Manejo de errores** user-friendly
- **Navegación intuitiva** con React Router
- **Componentes reutilizables**

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🔄 Estado del desarrollo

- ✅ **Arquitectura base** - Frontend y Backend configurados
- ✅ **Sistema de autenticación** - Login, registro y JWT
- ✅ **Base de datos** - Prisma con SQLite
- ✅ **Frontend completo** - Landing page, dashboard y formularios
- ✅ **API completa** - Todos los endpoints implementados
- ✅ **Integración** - Frontend y backend comunicándose
- ✅ **Gestión de estado** - Context API implementado
- ✅ **Rutas protegidas** - Navegación segura
- ✅ **UI/UX** - Interfaz moderna y responsive

## 🚧 Próximas mejoras

- [ ] **Testing** - Implementar pruebas unitarias y de integración
- [ ] **TypeScript** - Migrar a TypeScript para mejor type safety
- [ ] **Docker** - Containerización del proyecto
- [ ] **Deploy** - Configuración para producción
- [ ] **Email verification** - Verificación de email en registro
- [ ] **Password recovery** - Sistema de recuperación de contraseña
- [ ] **User roles** - Sistema de roles y permisos
- [ ] **Profile photos** - Upload de imágenes de perfil

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
- [ ] API de autenticación
- [ ] Conexión frontend-backend
This repository is only an exercise for trying React

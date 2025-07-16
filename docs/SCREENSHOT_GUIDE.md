# 📸 Guía para tomar capturas de pantalla

Esta guía te ayudará a tomar las capturas de pantalla necesarias para el README del proyecto.

## 🎯 Capturas necesarias

### 1. Landing Page (`landing-page.png`)
- **URL**: `http://localhost:3000`
- **Resolución**: 1920x1080
- **Contenido**: Página completa con scroll para mostrar todas las secciones
- **Estado**: Usuario no autenticado

### 2. Login (`login.png`)
- **URL**: `http://localhost:3000` (click en "Iniciar Sesión")
- **Resolución**: 1920x1080
- **Contenido**: Modal de login abierto
- **Estado**: Formulario limpio, sin errores

### 3. Register (`register.png`)
- **URL**: `http://localhost:3000` (click en "Registrarse")
- **Resolución**: 1920x1080
- **Contenido**: Modal de registro abierto
- **Estado**: Formulario limpio, sin errores

### 4. Dashboard (`dashboard.png`)
- **URL**: `http://localhost:3000/home`
- **Resolución**: 1920x1080
- **Contenido**: Dashboard completo del usuario autenticado
- **Estado**: Usuario logueado con datos de ejemplo

### 5. Profile Management (`profile-management.png`)
- **URL**: `http://localhost:3000/home`
- **Resolución**: 1920x1080
- **Contenido**: Formularios de actualización de username y contraseña
- **Estado**: Mostrar los formularios en acción

### 6. Mobile Landing (`mobile-landing.png`)
- **Resolución**: 375x812 (iPhone X)
- **Contenido**: Landing page en versión móvil
- **Estado**: Menu hamburguesa visible si aplica

### 7. Mobile Login (`mobile-login.png`)
- **Resolución**: 375x812 (iPhone X)
- **Contenido**: Modal de login en móvil
- **Estado**: Formulario optimizado para móvil

### 8. Mobile Dashboard (`mobile-dashboard.png`)
- **Resolución**: 375x812 (iPhone X)
- **Contenido**: Dashboard en versión móvil
- **Estado**: Usuario autenticado, navegación móvil

## 🛠️ Herramientas recomendadas

### Para tomar capturas
- **Windows**: Snipping Tool, Lightshot, Greenshot
- **Mac**: Screenshot nativo (Cmd+Shift+4), CleanShot X
- **Linux**: Flameshot, GNOME Screenshot
- **Browser**: Extensiones como "Full Page Screen Capture"

### Para editar
- **Básico**: Paint.NET, GIMP
- **Avanzado**: Photoshop, Figma
- **Online**: Canva, Photopea

## 📐 Especificaciones técnicas

### Desktop (1920x1080)
- **Browser**: Chrome o Firefox
- **Zoom**: 100%
- **Extensiones**: Deshabilitadas o modo incógnito
- **Barra de bookmarks**: Oculta
- **DevTools**: Cerradas

### Mobile (375x812)
- **Método**: Chrome DevTools device simulation
- **Device**: iPhone X o similar
- **Orientation**: Portrait
- **Touch indicators**: Deshabilitados

## 🎨 Estilo y contenido

### Datos de ejemplo para usar:
```json
{
  "email": "john.doe@example.com",
  "username": "john_doe",
  "password": "demo123456"
}
```

### Guidelines de captura:
- **Timing**: Esperar a que las animaciones terminen
- **Content**: Usar datos realistas, no "test" o "asdf"
- **State**: Capturar estados exitosos, no errores
- **Clean**: Sin elementos de debug o consola abierta

## 🖼️ Post-procesamiento

### Optimización
1. **Crop**: Eliminar barras innecesarias del browser
2. **Resize**: Ajustar a las dimensiones exactas
3. **Compress**: Usar TinyPNG o similar para reducir tamaño
4. **Format**: Guardar como PNG para mejor calidad

### Ubicación final
- Guardar todas las imágenes en `/docs/screenshots/`
- Usar nombres exactos como se especifica arriba
- Verificar que las rutas en el README coincidan

## ✅ Checklist final

Antes de subir las capturas, verificar:
- [ ] Todas las imágenes tienen las dimensiones correctas
- [ ] Los nombres de archivo coinciden con el README
- [ ] Las imágenes están optimizadas (< 500KB cada una)
- [ ] Se ven bien en el README cuando se pushean
- [ ] Los datos mostrados son consistentes y profesionales

## 🚀 Workflow recomendado

1. **Setup**: Levantar frontend y backend
2. **Data**: Crear usuario con datos de ejemplo
3. **Desktop**: Tomar todas las capturas desktop
4. **Mobile**: Cambiar a vista móvil y capturar
5. **Process**: Editar y optimizar todas las imágenes
6. **Test**: Verificar que se ven bien en el README local
7. **Upload**: Commit y push al repositorio

¡Con estas capturas, el README se verá increíble! 🎉

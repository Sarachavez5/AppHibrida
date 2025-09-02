# Mi Ciclo - Aplicación de Seguimiento del Ciclo Menstrual

Una aplicación híbrida moderna para el seguimiento completo del ciclo menstrual, construida con Vanilla JavaScript, HTML y SCSS. Diseñada para proporcionar a las mujeres herramientas intuitivas para monitorear su salud reproductiva.

## 🌟 Características Principales

### 📱 **Interfaz Intuitiva**
- Diseño moderno y accesible optimizado para móviles
- Navegación fluida con bottom navigation
- Paleta de colores cálida y confiable
- Micro-interacciones suaves y responsivas

### 📊 **Seguimiento Completo**
- **Dashboard Principal**: Vista general del ciclo actual con día y fase
- **Calendario Interactivo**: Visualización mensual con días marcados
- **Registro de Actividades**: Sexo, ejercicio, meditación con detalles
- **Síntomas**: Lista de síntomas comunes con intensidad del dolor
- **Estado de Ánimo**: Registro de emociones, energía y calidad del sueño

### 📈 **Estadísticas y Análisis**
- Duración promedio del ciclo
- Regularidad y variaciones
- Historial de ciclos anteriores
- Métricas de salud reproductiva

### 🎓 **Educación y Recursos**
- Artículos educativos por categorías
- Búsqueda de contenido
- Información sobre fertilidad y concepción
- Guías de nutrición y autocuidado

### ⚙️ **Configuración Personalizada**
- Ajustes del ciclo menstrual
- Recordatorios personalizables
- Configuración de privacidad
- Notificaciones adaptables

## 🚀 Tecnologías Utilizadas

- **Frontend**: Vanilla JavaScript (ES6+)
- **Estilos**: SCSS/Sass con variables y mixins
- **Bundler**: Vite
- **Empaquetado Móvil**: Capacitor
- **Arquitectura**: SPA (Single Page Application)
- **Componentes**: Sistema modular reutilizable

## 📁 Estructura del Proyecto

```
AppHibrida/
├── src/
│   ├── js/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── Component.js     # Clase base para componentes
│   │   │   ├── Modal.js         # Componente modal
│   │   │   └── Toast.js         # Notificaciones toast
│   │   ├── pages/               # Páginas de la aplicación
│   │   │   ├── HomePage.js      # Dashboard principal
│   │   │   ├── CalendarPage.js  # Calendario interactivo
│   │   │   ├── RegisterPage.js  # Registro de actividades
│   │   │   ├── SymptomsPage.js  # Registro de síntomas
│   │   │   ├── MoodPage.js      # Estado de ánimo
│   │   │   ├── StatsPage.js     # Estadísticas
│   │   │   ├── ProfilePage.js   # Perfil y configuración
│   │   │   └── EducationPage.js # Sección educativa
│   │   └── router/
│   │       └── Router.js        # Router SPA
│   ├── styles/
│   │   ├── _variables.scss      # Variables de tema
│   │   ├── _mixins.scss         # Mixins reutilizables
│   │   ├── _base.scss           # Estilos base
│   │   ├── _components.scss     # Componentes UI
│   │   └── main.scss            # Estilos principales
│   └── main.js                  # Punto de entrada
├── public/
├── dist/                        # Build de producción
├── capacitor.config.ts          # Configuración Capacitor
├── vite.config.js               # Configuración Vite
└── package.json
```

## 🎨 Paleta de Colores

La aplicación utiliza una paleta de colores específicamente diseñada para transmitir confianza y bienestar:

- **Primario**: Rosa cálido (#E91E63)
- **Secundario**: Púrpura (#9C27B0)
- **Ciclo**: Colores específicos para días de periodo, fértiles y ovulación
- **Estado de Ánimo**: Colores emocionales para feliz, sensible, triste, ansiosa
- **Energía**: Gradientes para niveles de energía y calidad del sueño

## 📱 Páginas Implementadas

### 1. **Dashboard Principal** (`/`)
- Círculo central con día del ciclo y fase
- Tarjetas de estado actual, predicciones y síntomas
- Botón flotante para registro rápido

### 2. **Calendario** (`/calendario`)
- Vista mensual interactiva
- Navegación entre meses
- Días marcados por tipo (periodo, fértiles)
- Selección de días para detalles

### 3. **Registro de Actividades** (`/registrar`)
- Tipos de actividad (sexo, ejercicio, meditación)
- Detalles de protección
- Selector de hora
- Notas adicionales

### 4. **Registro de Síntomas** (`/sintomas`)
- Lista de síntomas comunes
- Checkboxes interactivos
- Escala de intensidad del dolor (1-10)

### 5. **Estado de Ánimo** (`/estado-animo`)
- Botones circulares para emociones
- Nivel de energía (baja, media, alta)
- Calidad del sueño
- Notas personales

### 6. **Estadísticas** (`/estadisticas`)
- Duración promedio del ciclo
- Gráfico de regularidad
- Historial de ciclos
- Métricas adicionales

### 7. **Perfil** (`/perfil`)
- Información del usuario
- Configuración del ciclo
- Recordatorios
- Privacidad y datos
- Notificaciones

### 8. **Educación** (`/educacion`)
- Barra de búsqueda
- Categorías de artículos
- Contenido destacado
- Artículos educativos completos

## 🛠️ Instalación y Desarrollo

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Git

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd AppHibrida
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Vista previa del build

# Capacitor (Móvil)
npm run cap:add      # Agregar plataforma Android
npm run cap:sync     # Sincronizar cambios
npm run cap:open     # Abrir en Android Studio
npm run cap:run      # Ejecutar en dispositivo/emulador
```

## 📱 Empaquetado Móvil con Capacitor

### Configuración Android

1. **Agregar plataforma Android**
   ```bash
   npm run cap:add
   ```

2. **Sincronizar cambios**
   ```bash
   npm run cap:sync
   ```

3. **Abrir en Android Studio**
   ```bash
   npm run cap:open
   ```

4. **Ejecutar en dispositivo**
   ```bash
   npm run cap:run
   ```

### Características Móviles

- **Safe Area**: Soporte para notch y barras de sistema
- **Touch Events**: Optimizado para interacciones táctiles
- **Responsive**: Adaptado a diferentes tamaños de pantalla
- **Offline**: Funcionalidad básica sin conexión
- **PWA Ready**: Preparado para instalación como PWA

## 🎯 Funcionalidades Destacadas

### 🔄 **Sistema de Navegación**
- Router SPA con hash routing
- Navegación fluida entre páginas
- Estado activo en bottom navigation
- Botones de retroceso contextuales

### 🎨 **Componentes Reutilizables**
- **Modal**: Diálogos modales con opciones personalizables
- **Toast**: Notificaciones temporales
- **Component Base**: Clase base para componentes
- **Form Elements**: Inputs, botones, checkboxes estilizados

### 📊 **Gestión de Estado**
- Estado local en cada página
- Persistencia de datos (preparado para backend)
- Validación de formularios
- Manejo de errores

### 🔍 **Búsqueda y Filtros**
- Búsqueda en tiempo real
- Filtros por categorías
- Resultados dinámicos
- Historial de búsquedas

## 🎨 Personalización

### Colores
Edita `src/styles/_variables.scss` para cambiar la paleta de colores:

```scss
:root {
  --color-primary: #E91E63;        // Color principal
  --color-secondary: #9C27B0;      // Color secundario
  --color-period: #E91E63;         // Días de periodo
  --color-fertile: #FF9800;        // Días fértiles
  // ... más variables
}
```

### Componentes
Los componentes están en `src/js/components/` y pueden ser extendidos o modificados según necesidades específicas.

### Páginas
Cada página es una clase independiente en `src/js/pages/` que puede ser personalizada sin afectar otras páginas.

## 📱 Responsive Design

La aplicación está optimizada para:

- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+

### Breakpoints
```scss
@include mobile { /* Estilos móviles */ }
@include tablet { /* Estilos tablet */ }
@include desktop { /* Estilos desktop */ }
```

## ♿ Accesibilidad

- **ARIA Labels**: Etiquetas descriptivas para lectores de pantalla
- **Navegación por Teclado**: Soporte completo para navegación sin mouse
- **Contraste**: Colores con suficiente contraste
- **Semántica HTML**: Estructura semántica correcta
- **Focus Management**: Manejo adecuado del foco

## 🔧 Configuración de Desarrollo

### Vite
```javascript
// vite.config.js
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  },
  server: {
    port: 3000,
    host: true,
    open: true
  }
});
```

### Capacitor
```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'com.example.miciclo',
  appName: 'Mi Ciclo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};
```

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Servidor de Vista Previa
```bash
npm run preview
```

### Despliegue en Servidor Web
Los archivos en `dist/` pueden ser desplegados en cualquier servidor web estático.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

- **Email**: support@miciclo.com
- **Documentación**: [docs.miciclo.com](https://docs.miciclo.com)
- **Issues**: [GitHub Issues](https://github.com/usuario/miciclo/issues)

## 🔮 Próximas Características

- [ ] **Sincronización en la Nube**
- [ ] **Notificaciones Push**
- [ ] **Exportación de Datos**
- [ ] **Modo Oscuro**
- [ ] **Múltiples Idiomas**
- [ ] **Integración con Wearables**
- [ ] **Análisis Avanzado**
- [ ] **Comunidad y Foros**

---

**Mi Ciclo** - Empoderando a las mujeres con conocimiento sobre su salud reproductiva. 🌸

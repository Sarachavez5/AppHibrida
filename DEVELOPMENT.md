# Guía de Desarrollo - App Híbrida

## 🎯 Objetivo

Esta guía te ayudará a entender cómo desarrollar y personalizar la aplicación híbrida según tus necesidades específicas.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16.x o superior)
- **npm** (versión 8.x o superior)
- **Git**
- **Android Studio** (para desarrollo Android)
- **Editor de código** (VS Code recomendado)

## 🚀 Primeros Pasos

### 1. Configuración del Entorno

```bash
# Clonar el proyecto
git clone <tu-repositorio>
cd AppHibrida

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### 2. Estructura de Archivos

```
src/
├── styles/           # Estilos SCSS
│   ├── _variables.scss  # Variables de tema (COLORES AQUÍ)
│   ├── _mixins.scss     # Mixins reutilizables
│   ├── _base.scss       # Estilos base
│   ├── _components.scss # Componentes
│   └── main.scss        # Archivo principal
├── js/
│   ├── components/   # Componentes reutilizables
│   ├── pages/        # Páginas de la aplicación
│   └── router/       # Sistema de navegación
└── main.js           # Punto de entrada
```

## 🎨 Personalización de Colores

### Cambiar la Paleta de Colores

Edita `src/styles/_variables.scss`:

```scss
:root {
  // Colores primarios - CAMBIA AQUÍ
  --color-primary: #007AFF;        // Tu color principal
  --color-primary-dark: #0056CC;   // Versión más oscura
  --color-primary-light: #4DA3FF;  // Versión más clara
  
  // Colores secundarios
  --color-secondary: #FF6B35;      // Tu color secundario
  --color-secondary-dark: #E55A2B;
  --color-secondary-light: #FF8A5C;
  
  // Colores de fondo
  --color-background: #FFFFFF;     // Fondo principal
  --color-background-secondary: #F8F9FA;
  
  // Colores de texto
  --color-text-primary: #1A1A1A;   // Texto principal
  --color-text-secondary: #6C757D; // Texto secundario
}
```

### Ejemplos de Paletas Predefinidas

#### Paleta Azul (Actual)
```scss
--color-primary: #007AFF;
--color-secondary: #FF6B35;
```

#### Paleta Verde
```scss
--color-primary: #28A745;
--color-secondary: #FFC107;
```

#### Paleta Morada
```scss
--color-primary: #6F42C1;
--color-secondary: #FD7E14;
```

#### Paleta Rosa
```scss
--color-primary: #E83E8C;
--color-secondary: #20C997;
```

## 📱 Desarrollo de Páginas

### Crear una Nueva Página

1. **Crear archivo de página** en `src/js/pages/`:

```javascript
// src/js/pages/MiPagina.js
export class MiPagina {
  constructor() {
    this.container = document.getElementById('app');
  }
  
  render() {
    this.container.innerHTML = `
      <div class="app">
        <!-- Tu contenido aquí -->
        <main class="app__content">
          <div class="app__container">
            <div class="page__header">
              <h1 class="page__title">Mi Página</h1>
              <p class="page__subtitle">Descripción de la página</p>
            </div>
            
            <section class="section">
              <div class="card">
                <div class="card__header">
                  <h3 class="card__title">Título de la Sección</h3>
                </div>
                <div class="card__content">
                  <p>Contenido de la sección</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    `;
    
    this.bindEvents();
  }
  
  bindEvents() {
    // Eventos de la página
  }
  
  destroy() {
    // Cleanup si es necesario
  }
}
```

2. **Agregar la ruta** en `src/main.js`:

```javascript
import { MiPagina } from './js/pages/MiPagina.js';

const routes = {
  '/': { /* ... */ },
  '/mi-pagina': {
    title: 'Mi Página - App Híbrida',
    handler: () => {
      const miPagina = new MiPagina();
      miPagina.render();
    }
  }
};
```

## 🧩 Desarrollo de Componentes

### Crear un Componente Reutilizable

```javascript
// src/js/components/MiComponente.js
import { Component } from './Component.js';

export class MiComponente extends Component {
  constructor(element, options = {}) {
    super(element, options);
  }
  
  get defaultOptions() {
    return {
      // Opciones por defecto
      autoShow: true,
      duration: 3000
    };
  }
  
  bindEvents() {
    // Eventos del componente
    this.on('click', this.handleClick.bind(this));
  }
  
  handleClick(e) {
    // Lógica del click
    this.emit('miComponente:clicked', { data: 'valor' });
  }
  
  show() {
    // Mostrar componente
    this.addClass('active');
  }
  
  hide() {
    // Ocultar componente
    this.removeClass('active');
  }
}
```

### Usar el Componente

```javascript
// En cualquier página
import { MiComponente } from '../components/MiComponente.js';

const miComponente = new MiComponente('#mi-elemento', {
  autoShow: false,
  duration: 5000
});

miComponente.on('miComponente:clicked', (data) => {
  console.log('Componente clickeado:', data);
});
```

## 🎯 Componentes Disponibles

### Modal
```javascript
import { Modal } from '../components/Modal.js';

// Modal simple
Modal.alert('Mensaje de alerta');

// Modal de confirmación
Modal.confirm('¿Estás seguro?').then((confirmed) => {
  if (confirmed) {
    // Usuario confirmó
  }
});

// Modal personalizado
Modal.create(`
  <p>Contenido personalizado</p>
`, {
  title: 'Mi Modal',
  footer: '<button class="btn btn--primary">Aceptar</button>'
});
```

### Toast (Notificaciones)
```javascript
import { Toast } from '../components/Toast.js';

// Diferentes tipos
Toast.success('Operación exitosa');
Toast.error('Algo salió mal');
Toast.warning('Advertencia');
Toast.info('Información');

// Toast personalizado
Toast.create('Mensaje personalizado', {
  title: 'Título',
  type: 'success',
  duration: 5000
});
```

## 📱 Desarrollo Móvil

### Configuración de Capacitor

1. **Agregar Android**:
   ```bash
   npm run cap:add
   ```

2. **Sincronizar cambios**:
   ```bash
   npm run build
   npm run cap:sync
   ```

3. **Abrir en Android Studio**:
   ```bash
   npm run cap:open
   ```

### Características Móviles Específicas

#### Safe Area
```scss
// En tus estilos
.container {
  @include safe-area(padding);
}
```

#### Touch Events
```javascript
// Optimizado para touch
element.addEventListener('touchstart', handleTouch);
element.addEventListener('touchend', handleTouchEnd);
```

#### Responsive Design
```scss
// Breakpoints disponibles
@include mobile { /* Estilos móviles */ }
@include tablet { /* Estilos tablet */ }
@include desktop { /* Estilos desktop */ }
```

## ♿ Accesibilidad

### Buenas Prácticas

1. **Etiquetas ARIA**:
   ```html
   <button aria-label="Cerrar modal" class="modal__close">×</button>
   ```

2. **Navegación por teclado**:
   ```javascript
   element.addEventListener('keydown', (e) => {
     if (e.key === 'Enter' || e.key === ' ') {
       // Acción
     }
   });
   ```

3. **Focus management**:
   ```javascript
   // En modales
   const focusableElements = element.querySelectorAll(
     'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
   );
   focusableElements[0].focus();
   ```

## 🎨 Micro-interacciones

### Animaciones CSS
```scss
// Fade in
@include fade-in;

// Slide in
.slide-in-up {
  animation: slideInUp 0.6s ease-out;
}

// Hover effects
.card--interactive {
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
}
```

### Transiciones JavaScript
```javascript
// Transiciones suaves
element.style.transition = 'all 0.3s ease-in-out';
element.style.transform = 'scale(1.1)';

// Después de la animación
setTimeout(() => {
  element.style.transform = 'scale(1)';
}, 300);
```

## 🔧 Debugging

### Herramientas de Desarrollo

1. **Chrome DevTools**: Para debugging web
2. **Android Studio**: Para debugging Android
3. **Flipper**: Para debugging React Native (si usas)

### Logs Útiles

```javascript
// En desarrollo
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// Errores
console.error('Error:', error);

// Performance
console.time('operation');
// ... código ...
console.timeEnd('operation');
```

## 📦 Build y Despliegue

### Build de Producción
```bash
npm run build
```

### Optimizaciones
- Minificación automática
- Tree shaking
- Code splitting
- Asset optimization

### Despliegue Web
1. Build: `npm run build`
2. Subir `dist/` a tu servidor

### Despliegue Android
1. Build: `npm run build`
2. Sync: `npm run cap:sync`
3. Abrir Android Studio: `npm run cap:open`
4. Generar APK/AAB

## 🐛 Troubleshooting

### Problemas Comunes

1. **Estilos no se cargan**:
   - Verificar imports en `main.scss`
   - Revisar sintaxis SCSS

2. **Rutas no funcionan**:
   - Verificar configuración del router
   - Revisar que las rutas estén registradas

3. **Componentes no se inicializan**:
   - Verificar que el elemento existe en el DOM
   - Revisar imports de componentes

4. **Capacitor no sincroniza**:
   - Ejecutar `npm run build` antes de `cap:sync`
   - Verificar configuración en `capacitor.config.ts`

### Debugging Móvil

```javascript
// En el código
if (window.Capacitor) {
  console.log('Ejecutando en Capacitor');
} else {
  console.log('Ejecutando en navegador');
}
```

## 📚 Recursos Adicionales

- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de Capacitor](https://capacitorjs.com/)
- [Guía de SCSS](https://sass-lang.com/guide)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

**¡Feliz desarrollo! 🚀**

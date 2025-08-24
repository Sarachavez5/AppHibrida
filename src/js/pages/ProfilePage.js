/**
 * Página de perfil
 */
export class ProfilePage {
  constructor() {
    this.user = {
      name: 'Juliana Torres',
      email: 'Juli@gmail.com',
      avatar: null
    };
  }

  render() {
    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = `
      <div class="app">
        <!-- Header -->
        <header class="app-header">
          <div class="app-header__container">
            <button class="app-header__menu-btn" aria-label="Menú">
              <span class="icon">☰</span>
            </button>
            <h1 class="app-header__title">Mi perfil</h1>
            <button class="app-header__profile-btn" aria-label="Perfil">
              <span class="icon">👤</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <!-- Profile Info -->
            <div class="profile-info">
              <div class="profile-avatar">
                <div class="profile-avatar__placeholder">
                  <span class="profile-avatar__initials">${this.getInitials(this.user.name)}</span>
                </div>
              </div>
              <div class="profile-details">
                <h2 class="profile-name">${this.user.name}</h2>
                <p class="profile-email">${this.user.email}</p>
              </div>
            </div>

            <!-- Settings List -->
            <div class="settings-list">
              <div class="settings-item" data-setting="cycle">
                <div class="settings-item__content">
                  <span class="settings-item__icon">⚙️</span>
                  <span class="settings-item__title">Ajustes del Ciclo</span>
                </div>
                <span class="settings-item__arrow">›</span>
              </div>
              
              <div class="settings-item" data-setting="reminders">
                <div class="settings-item__content">
                  <span class="settings-item__icon">🔔</span>
                  <span class="settings-item__title">Recordatorios</span>
                </div>
                <span class="settings-item__arrow">›</span>
              </div>
              
              <div class="settings-item" data-setting="privacy">
                <div class="settings-item__content">
                  <span class="settings-item__icon">🔒</span>
                  <span class="settings-item__title">Privacidad y Datos</span>
                </div>
                <span class="settings-item__arrow">›</span>
              </div>
              
              <div class="settings-item" data-setting="notifications">
                <div class="settings-item__content">
                  <span class="settings-item__icon">📱</span>
                  <span class="settings-item__title">Notificaciones</span>
                </div>
                <span class="settings-item__arrow">›</span>
              </div>
            </div>

            <!-- Additional Options -->
            <div class="settings-list">
              <div class="settings-item" data-setting="help">
                <div class="settings-item__content">
                  <span class="settings-item__icon">❓</span>
                  <span class="settings-item__title">Ayuda y Soporte</span>
                </div>
                <span class="settings-item__arrow">›</span>
              </div>
              
              <div class="settings-item" data-setting="about">
                <div class="settings-item__content">
                  <span class="settings-item__icon">ℹ️</span>
                  <span class="settings-item__title">Acerca de la App</span>
                </div>
                <span class="settings-item__arrow">›</span>
              </div>
            </div>

            <!-- Logout Button -->
            <div class="logout-section">
              <button class="logout-btn" id="logout-btn">
                <span class="logout-btn__icon">🚪</span>
                <span class="logout-btn__text">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </main>

        <!-- Bottom Navigation -->
        <nav class="bottom-nav">
          <div class="bottom-nav__container">
            <a href="/" class="bottom-nav__item" aria-label="Inicio">
              <span class="bottom-nav__icon">🏠</span>
              <span class="bottom-nav__label">Inicio</span>
            </a>
            <a href="/calendario" class="bottom-nav__item" aria-label="Calendario">
              <span class="bottom-nav__icon">📅</span>
              <span class="bottom-nav__label">Calendario</span>
            </a>
            <a href="/registrar" class="bottom-nav__item" aria-label="Registrar">
              <span class="bottom-nav__icon">➕</span>
              <span class="bottom-nav__label">Registrar</span>
            </a>
            <a href="/estadisticas" class="bottom-nav__item" aria-label="Estadísticas">
              <span class="bottom-nav__icon">📊</span>
              <span class="bottom-nav__label">Estadísticas</span>
            </a>
            <a href="/perfil" class="bottom-nav__item active" aria-label="Perfil">
              <span class="bottom-nav__icon">👤</span>
              <span class="bottom-nav__label">Perfil</span>
            </a>
          </div>
        </nav>
      </div>
    `;

    this.bindEvents();
  }

  getInitials(name) {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  }

  bindEvents() {
    // Menu button
    const menuBtn = document.querySelector('.app-header__menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        console.log('Menú abierto');
      });
    }

    // Settings items
    const settingsItems = document.querySelectorAll('.settings-item');
    settingsItems.forEach(item => {
      item.addEventListener('click', () => {
        const setting = item.dataset.setting;
        this.handleSettingClick(setting);
      });
    });

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.handleLogout();
      });
    }

    // Bottom navigation
    const navItems = document.querySelectorAll('.bottom-nav__item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (href && href !== '/perfil') {
          window.location.hash = `#${href}`;
        }
      });
    });
  }

  handleSettingClick(setting) {
    console.log(`Configuración seleccionada: ${setting}`);
    
    switch (setting) {
      case 'cycle':
        this.showCycleSettings();
        break;
      case 'reminders':
        this.showRemindersSettings();
        break;
      case 'privacy':
        this.showPrivacySettings();
        break;
      case 'notifications':
        this.showNotificationsSettings();
        break;
      case 'help':
        this.showHelp();
        break;
      case 'about':
        this.showAbout();
        break;
      default:
        console.log('Configuración no implementada');
    }
  }

  showCycleSettings() {
    // Importar Modal dinámicamente
    import('../components/Modal.js').then(({ Modal }) => {
      Modal.create(`
        <div class="cycle-settings">
          <h3>Configuración del Ciclo</h3>
          <p>Aquí puedes configurar la duración promedio de tu ciclo, la fecha de tu último periodo, y otros ajustes relacionados con tu ciclo menstrual.</p>
          <div class="form-group">
            <label>Duración promedio del ciclo (días):</label>
            <input type="number" value="28" min="21" max="35" class="form-input">
          </div>
          <div class="form-group">
            <label>Fecha del último periodo:</label>
            <input type="date" class="form-input">
          </div>
        </div>
      `, {
        title: 'Ajustes del Ciclo',
        footer: '<button class="btn btn--primary">Guardar</button>'
      });
    });
  }

  showRemindersSettings() {
    import('../components/Modal.js').then(({ Modal }) => {
      Modal.create(`
        <div class="reminders-settings">
          <h3>Recordatorios</h3>
          <p>Configura las notificaciones para recordarte eventos importantes de tu ciclo.</p>
          <div class="reminder-option">
            <label>
              <input type="checkbox" checked> Recordar próximo periodo
            </label>
          </div>
          <div class="reminder-option">
            <label>
              <input type="checkbox" checked> Recordar ventana fértil
            </label>
          </div>
          <div class="reminder-option">
            <label>
              <input type="checkbox"> Recordar tomar medicamentos
            </label>
          </div>
        </div>
      `, {
        title: 'Recordatorios',
        footer: '<button class="btn btn--primary">Guardar</button>'
      });
    });
  }

  showPrivacySettings() {
    import('../components/Modal.js').then(({ Modal }) => {
      Modal.create(`
        <div class="privacy-settings">
          <h3>Privacidad y Datos</h3>
          <p>Controla cómo se manejan tus datos personales y de salud.</p>
          <div class="privacy-option">
            <label>
              <input type="checkbox" checked> Sincronizar con la nube
            </label>
          </div>
          <div class="privacy-option">
            <label>
              <input type="checkbox"> Compartir datos anónimos para investigación
            </label>
          </div>
          <div class="privacy-option">
            <label>
              <input type="checkbox" checked> Requerir autenticación biométrica
            </label>
          </div>
        </div>
      `, {
        title: 'Privacidad y Datos',
        footer: '<button class="btn btn--primary">Guardar</button>'
      });
    });
  }

  showNotificationsSettings() {
    import('../components/Modal.js').then(({ Modal }) => {
      Modal.create(`
        <div class="notifications-settings">
          <h3>Notificaciones</h3>
          <p>Configura qué notificaciones quieres recibir y cuándo.</p>
          <div class="notification-option">
            <label>
              <input type="checkbox" checked> Notificaciones push
            </label>
          </div>
          <div class="notification-option">
            <label>
              <input type="checkbox" checked> Notificaciones por email
            </label>
          </div>
          <div class="notification-option">
            <label>
              <input type="checkbox"> Notificaciones de recordatorio
            </label>
          </div>
        </div>
      `, {
        title: 'Notificaciones',
        footer: '<button class="btn btn--primary">Guardar</button>'
      });
    });
  }

  showHelp() {
    import('../components/Modal.js').then(({ Modal }) => {
      Modal.create(`
        <div class="help-content">
          <h3>Ayuda y Soporte</h3>
          <p>¿Necesitas ayuda con la aplicación? Aquí tienes algunas opciones:</p>
          <ul>
            <li><strong>FAQ:</strong> Preguntas frecuentes</li>
            <li><strong>Contacto:</strong> support@miciclo.com</li>
            <li><strong>Chat:</strong> Disponible 24/7</li>
            <li><strong>Manual:</strong> Guía de usuario completa</li>
          </ul>
        </div>
      `, {
        title: 'Ayuda y Soporte',
        footer: '<button class="btn btn--primary">Contactar Soporte</button>'
      });
    });
  }

  showAbout() {
    import('../components/Modal.js').then(({ Modal }) => {
      Modal.create(`
        <div class="about-content">
          <h3>Acerca de Mi Ciclo</h3>
          <p><strong>Versión:</strong> 1.0.0</p>
          <p><strong>Desarrollado por:</strong> Equipo de Desarrollo</p>
          <p>Mi Ciclo es una aplicación diseñada para ayudar a las mujeres a llevar un seguimiento completo de su ciclo menstrual, proporcionando información valiosa sobre su salud reproductiva.</p>
          <p>© 2024 Mi Ciclo. Todos los derechos reservados.</p>
        </div>
      `, {
        title: 'Acerca de la App',
        footer: '<button class="btn btn--primary">Cerrar</button>'
      });
    });
  }

  handleLogout() {
    // Importar Modal dinámicamente
    import('../components/Modal.js').then(({ Modal }) => {
      Modal.confirm('¿Estás segura de que quieres cerrar sesión?', {
        title: 'Cerrar Sesión',
        confirmText: 'Sí, cerrar sesión',
        cancelText: 'Cancelar'
      }).then((confirmed) => {
        if (confirmed) {
          console.log('Usuario cerró sesión');
          // Aquí se podría limpiar datos locales y redirigir a login
          import('../components/Toast.js').then(({ Toast }) => {
            Toast.success('Sesión cerrada exitosamente');
          });
        }
      });
    });
  }
}

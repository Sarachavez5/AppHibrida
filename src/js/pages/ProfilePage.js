import { authService } from '../services/AuthService.js';

export class ProfilePage {
  constructor() {
    this.user = authService.getCurrentUser() || {
      name: 'Usuario',
      email: 'usuario@email.com',
      avatar: null
    };
    this.currentModal = null; // Referencia al modal actual
  }

  render() {
    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = `
      <div class="app">
        <!-- Header -->
        <header class="app-header">
          <div class="app-header__container">
            <h1 class="app-header__title">Mi perfil</h1>
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
            <a href="#/" class="bottom-nav__item" aria-label="Inicio">
              <span class="bottom-nav__icon">🏠</span>
              <span class="bottom-nav__label">Inicio</span>
            </a>
            <button class="bottom-nav__item" id="register-btn" aria-label="Registrar">
              <span class="bottom-nav__icon">➕</span>
              <span class="bottom-nav__label">Registrar</span>
            </button>
            <a href="#/educacion" class="bottom-nav__item" aria-label="Educación">
              <span class="bottom-nav__icon">📚</span>
              <span class="bottom-nav__label">Aprende</span>
            </a>
            <a href="#/estadisticas" class="bottom-nav__item" aria-label="Estadísticas">
              <span class="bottom-nav__icon">📊</span>
              <span class="bottom-nav__label">Estadísticas</span>
            </a>
            <a href="#/perfil" class="bottom-nav__item active" aria-label="Perfil">
              <span class="bottom-nav__icon">👤</span>
              <span class="bottom-nav__label">Perfil</span>
            </a>
          </div>
        </nav>

        <!-- Register Menu -->
        <div class="register-menu" id="register-menu">
          <div class="register-menu__backdrop" id="register-menu-backdrop"></div>
          <div class="register-menu__content">
            <div class="register-menu__header">
              <h3 class="register-menu__title">¿Qué quieres registrar?</h3>
              <button class="register-menu__close" id="register-menu-close">
                <span class="icon">✕</span>
              </button>
            </div>
            <div class="register-menu__options">
              <button class="register-menu__option" data-action="symptoms">
                <span class="register-menu__icon">🩸</span>
                <span class="register-menu__label">Síntomas</span>
              </button>
              <button class="register-menu__option" data-action="mood">
                <span class="register-menu__icon">😊</span>
                <span class="register-menu__label">Estado de ánimo</span>
              </button>
              <button class="register-menu__option" data-action="activity">
                <span class="register-menu__icon">🏃‍♀️</span>
                <span class="register-menu__label">Actividad física</span>
              </button>
            </div>
          </div>
        </div>
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

  closeCurrentModal() {
    if (this.currentModal && !this.currentModal.isDestroyed) {
      this.currentModal.hide();
      this.currentModal = null;
    }
  }

  // Método helper para crear modales
  async createModal(content, options) {
    // Cerrar modal actual si existe
    this.closeCurrentModal();
    
    // Importar Modal dinámicamente
    const { Modal } = await import('../components/Modal.js');
    
    // Crear nuevo modal
    this.currentModal = Modal.create(content, options);
    
    // Limpiar referencia cuando se destruya
    this.currentModal.on('modal:destroyed', () => {
      this.currentModal = null;
    });
    
    return this.currentModal;
  }

  bindEvents() {
    // Menu button
    const menuBtn = document.querySelector('.app-header__menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        console.log('Menú abierto');
      });
    }

    // Settings items - Usar throttle para prevenir múltiples clics rápidos
    const settingsItems = document.querySelectorAll('.settings-item');
    settingsItems.forEach(item => {
      let isProcessing = false;
      
      item.addEventListener('click', async () => {
        if (isProcessing) return; // Prevenir múltiples clics
        
        isProcessing = true;
        const setting = item.dataset.setting;
        await this.handleSettingClick(setting);
        
        // Resetear después de un breve delay
        setTimeout(() => {
          isProcessing = false;
        }, 300);
      });
    });

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.handleLogout();
      });
    }

    // Register button in bottom nav
    const registerBtn = document.getElementById('register-btn');
    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        const registerMenu = document.getElementById('register-menu');
        registerMenu.classList.add('active');
      });
    }

    // Register menu close
    const registerMenuClose = document.getElementById('register-menu-close');
    if (registerMenuClose) {
      registerMenuClose.addEventListener('click', () => {
        const registerMenu = document.getElementById('register-menu');
        registerMenu.classList.remove('active');
      });
    }

    // Register menu backdrop
    const registerBackdrop = document.querySelector('.register-menu__backdrop');
    if (registerBackdrop) {
      registerBackdrop.addEventListener('click', () => {
        const registerMenu = document.getElementById('register-menu');
        registerMenu.classList.remove('active');
      });
    }

    // Register menu options
    const registerOptions = document.querySelectorAll('.register-menu__option');
    registerOptions.forEach(option => {
      option.addEventListener('click', () => {
        const action = option.getAttribute('data-action');
        const registerMenu = document.getElementById('register-menu');
        registerMenu.classList.remove('active');
        
        switch(action) {
          case 'symptoms':
            window.location.hash = '#/sintomas';
            break;
          case 'mood':
            window.location.hash = '#/estado-animo';
            break;
          case 'activity':
            window.location.hash = '#/registrar';
            break;
        }
      });
    });

    // Bottom navigation
    const navItems = document.querySelectorAll('.bottom-nav__item[href]');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (href && href !== '#/perfil') {
          // Si href ya tiene #, usarlo directamente, si no, agregarlo
          if (href.startsWith('#')) {
            window.location.hash = href;
          } else {
            window.location.hash = `#${href}`;
          }
        }
      });
    });
  }

  async handleSettingClick(setting) {
    console.log(`Configuración seleccionada: ${setting}`);
    
    switch (setting) {
      case 'cycle':
        await this.showCycleSettings();
        break;
      case 'reminders':
        await this.showRemindersSettings();
        break;
      case 'privacy':
        await this.showPrivacySettings();
        break;
      case 'notifications':
        await this.showNotificationsSettings();
        break;
      case 'help':
        await this.showHelp();
        break;
      case 'about':
        await this.showAbout();
        break;
      default:
        console.log('Configuración no implementada');
    }
  }

  async showCycleSettings() {
    const modal = await this.createModal(`
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
      footer: '<button class="btn btn--primary cycle-save-btn">Guardar</button>'
    });

    // Agregar event listener para el botón guardar
    modal.on('click', (e) => {
      if (e.target.classList.contains('cycle-save-btn')) {
        console.log('Guardando configuración del ciclo...');
        modal.hide();
      }
    });
  }

  async showRemindersSettings() {
    const modal = await this.createModal(`
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
      footer: '<button class="btn btn--primary reminders-save-btn">Guardar</button>'
    });

    modal.on('click', (e) => {
      if (e.target.classList.contains('reminders-save-btn')) {
        console.log('Guardando recordatorios...');
        modal.hide();
      }
    });
  }

  async showPrivacySettings() {
    const modal = await this.createModal(`
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
      footer: '<button class="btn btn--primary privacy-save-btn">Guardar</button>'
    });

    modal.on('click', (e) => {
      if (e.target.classList.contains('privacy-save-btn')) {
        console.log('Guardando configuración de privacidad...');
        modal.hide();
      }
    });
  }

  async showNotificationsSettings() {
    const modal = await this.createModal(`
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
      footer: '<button class="btn btn--primary notifications-save-btn">Guardar</button>'
    });

    modal.on('click', (e) => {
      if (e.target.classList.contains('notifications-save-btn')) {
        console.log('Guardando configuración de notificaciones...');
        modal.hide();
      }
    });
  }

  async showHelp() {
    const modal = await this.createModal(`
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
      footer: '<button class="btn btn--primary help-contact-btn">Contactar Soporte</button>'
    });

    modal.on('click', (e) => {
      if (e.target.classList.contains('help-contact-btn')) {
        console.log('Contactando soporte...');
        modal.hide();
      }
    });
  }

  async showAbout() {
    const modal = await this.createModal(`
      <div class="about-content">
        <h3>Acerca de Mi Ciclo</h3>
        <p><strong>Versión:</strong> 1.0.0</p>
        <p><strong>Desarrollado por:</strong> Equipo de Desarrollo</p>
        <p>Mi Ciclo es una aplicación diseñada para ayudar a las mujeres a llevar un seguimiento completo de su ciclo menstrual, proporcionando información valiosa sobre su salud reproductiva.</p>
        <p>© 2024 Mi Ciclo. Todos los derechos reservados.</p>
      </div>
    `, {
      title: 'Acerca de la App',
      footer: '<button class="btn btn--primary about-close-btn">Cerrar</button>'
    });

    modal.on('click', (e) => {
      if (e.target.classList.contains('about-close-btn')) {
        modal.hide();
      }
    });
  }

  async handleLogout() {
    // Importar Modal dinámicamente
    const { Modal } = await import('../components/Modal.js');
    
    const confirmed = await Modal.confirm('¿Estás segura de que quieres cerrar sesión?', 'Cerrar Sesión');
    
    if (confirmed) {
      // Cerrar sesión usando el servicio de autenticación
      authService.logout();
      
      const { Toast } = await import('../components/Toast.js');
      Toast.success('Sesión cerrada exitosamente');
      
      // Redirigir a la página de login
      setTimeout(() => {
        window.location.hash = '#/login';
      }, 1500);
    }
  }
}
/**
 * Página de inicio
 */
export class HomePage {
  constructor() {
    this.cycleService = null;
    this.cycleStats = null;
    this.hasSymptoms = false;
    this.symptomsCount = 0;
    this.hasMoodData = false;
    this.loadUserData();
    // No renderizar hasta que CycleService esté listo
    this.initCycleService();
  }

  async initCycleService() {
    try {
      const { CycleService } = await import('../services/CycleService.js');
      this.cycleService = new CycleService();
      
      // Esperar un poco para asegurar que se inicialice completamente
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Actualizar datos del ciclo ANTES de renderizar
      this.updateCycleData();
      
      // Verificar que los datos estén disponibles
      console.log('Antes de renderizar - cycleStats:', this.cycleStats);
      console.log('Antes de renderizar - currentCycleDay:', this.getCurrentCycleDay());
      
      // Re-renderizar la página después de que el servicio esté listo
      this.render();
      
      console.log('HomePage renderizado después de CycleService');
    } catch (error) {
      console.error('Error al cargar CycleService:', error);
      // Si falla, renderizar de todas formas
      this.render();
    }
  }

  loadUserData() {
    if (this.cycleService) {
      // Forzar migración de datos existentes para corregir el historial
      this.cycleService.forceDataMigration();
      
      // Obtener estadísticas actualizadas
      this.cycleStats = this.cycleService.getCycleStatistics();
      
      console.log('HomePage - CycleService cargado:', this.cycleService);
      console.log('HomePage - Estadísticas del ciclo:', this.cycleStats);
      console.log('HomePage - Total de ciclos:', this.cycleStats ? this.cycleStats.totalCycles : 'N/A');
      console.log('HomePage - Historial de ciclos:', this.cycleStats ? this.cycleStats.cycleHistory : 'N/A');
    } else {
      console.log('HomePage - CycleService no está disponible aún');
    }
  }

  updateCycleData() {
    if (this.cycleService) {
      // Actualizar automáticamente el día del ciclo
      this.cycleService.updateCycleDay();
      // Obtener estadísticas actualizadas
      this.cycleStats = this.cycleService.getCycleStatistics();
      
      // Debug: verificar que los datos se carguen
      console.log('CycleService cargado:', this.cycleService);
      console.log('Estadísticas del ciclo:', this.cycleStats);
      console.log('Datos en localStorage:', localStorage.getItem('cycle_data'));
    } else {
      console.log('CycleService no está disponible aún');
    }
  }

  getTodayKey() {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }

  getCurrentDate() {
    const now = new Date();
    const options = { 
      day: 'numeric', 
      month: 'long' 
    };
    return now.toLocaleDateString('es-ES', options);
  }

  getCurrentCycleDay() {
    return this.cycleStats ? this.cycleStats.currentCycleDay : 1;
  }

  getCurrentPhase() {
    return this.cycleStats ? this.cycleStats.currentPhase : { name: 'Fase folicular', icon: '🌱' };
  }

  getPregnancyProbability() {
    return this.cycleStats ? this.cycleStats.fertility : { level: 'baja', icon: '🛡️' };
  }

  getDaysToNextPeriod() {
    return this.cycleStats ? this.cycleStats.daysToNextPeriod : 28;
  }

  getDaysToFertileWindow() {
    return this.cycleStats ? this.cycleStats.fertileWindow.daysUntil : 0;
  }

  getFertileWindowStatus() {
    return this.cycleStats ? this.cycleStats.fertileWindow.status : 'próxima';
  }

  render() {
    // NO recargar datos del ciclo aquí, solo síntomas y estado de ánimo
    this.loadUserData();
    
    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = `
      <div class="app">
        <!-- Header -->
        <header class="app-header">
          <div class="app-header__container">
            <button class="app-header__menu-btn" aria-label="Menú">
              <span class="icon">☰</span>
            </button>
            <h1 class="app-header__title">31 de agosto</h1>
            <button class="app-header__calendar-btn" aria-label="Ver calendario completo">
              <span class="icon">📅</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content home-content">
          <div class="app__container">
            <!-- Header with Logo -->
            <div class="home-header">
              <div class="home-logo">Logo</div>
              <h1 class="home-title">Mi Ciclo</h1>
            </div>

            <!-- Cycle Circle -->
            <div class="cycle-circle">
              <div class="cycle-circle__container">
                <div class="cycle-circle__day">Día ${this.getCurrentCycleDay()}</div>
                <div class="cycle-circle__phase">${this.getCurrentPhase().name || 'Fase folicular'}</div>
              </div>
            </div>
            
            <!-- Period Registration Button -->
            <div class="period-registration">
              <button class="period-btn" id="register-period-btn">
                <span class="period-btn__icon">🩸</span>
                <span class="period-btn__text">Registrar Período</span>
              </button>
            </div>

            <!-- Status Cards -->
            <div class="status-section">
              <div class="status-card">
                <h3 class="status-card__title">Día ${this.getCurrentCycleDay()}</h3>
                <p class="status-card__subtitle">${this.getCurrentPhase().icon} ${this.getCurrentPhase().name}</p>
                <p class="status-card__subtitle">${this.getCurrentPhase().description || ''}</p>
                <p class="status-card__subtitle">Fertilidad: ${this.getPregnancyProbability().icon} ${this.getPregnancyProbability().level}</p>
              </div>

              <div class="status-card">
                <h3 class="status-card__title">Predicciones</h3>
                <p class="status-card__subtitle">Próximo período: ${this.getDaysToNextPeriod()} días</p>
                <p class="status-card__subtitle">Ventana fértil: ${this.getFertileWindowStatus() === 'activa' ? 'Activa ahora' : `${this.getDaysToFertileWindow()} días`}</p>
              </div>

              <div class="status-card">
                <h3 class="status-card__title">Síntomas de hoy</h3>
                <p class="status-card__subtitle">${this.hasSymptoms ? `${this.symptomsCount} registrados` : 'Sin registrar'}</p>
              </div>
            </div>
          </div>
        </main>

        <!-- Floating Action Button -->
        <button class="fab" aria-label="Agregar actividad">
          <span class="fab__icon">+</span>
        </button>

        <!-- Side Menu -->
        <div class="side-menu" id="side-menu">
          <div class="side-menu__header">
            <h3 class="side-menu__title">Menú</h3>
            <button class="side-menu__close" id="side-menu-close">
              <span class="icon">✕</span>
            </button>
          </div>
          <div class="side-menu__content">
            <a href="#/periodo" class="side-menu__item">
              <span class="side-menu__icon">🩸</span>
              <span class="side-menu__text">Registrar Período</span>
            </a>
            <a href="#/sintomas" class="side-menu__item">
              <span class="side-menu__icon">📝</span>
              <span class="side-menu__text">Registrar Síntomas</span>
            </a>
            <a href="#/estado-animo" class="side-menu__item">
              <span class="side-menu__icon">😊</span>
              <span class="side-menu__text">Estado de Ánimo</span>
            </a>
            <a href="#/educacion" class="side-menu__item">
              <span class="side-menu__icon">📚</span>
              <span class="side-menu__text">Educación</span>
            </a>
            <a href="#/calendario" class="side-menu__item">
              <span class="side-menu__icon">📅</span>
              <span class="side-menu__text">Calendario</span>
            </a>
            <a href="#/estadisticas" class="side-menu__item">
              <span class="side-menu__icon">📊</span>
              <span class="side-menu__text">Estadísticas</span>
            </a>
            <a href="#/perfil" class="side-menu__item">
              <span class="side-menu__icon">👤</span>
              <span class="side-menu__text">Perfil</span>
            </a>
          </div>
        </div>

        <!-- Floating Register Menu -->
        <div class="register-menu" id="register-menu">
          <div class="register-menu__backdrop"></div>
          <div class="register-menu__content">
            <h3 class="register-menu__title">¿Qué quieres registrar?</h3>
            <div class="register-menu__options">
              <button class="register-menu__option" data-action="symptoms">
                <span class="register-menu__icon">🩸</span>
                <span class="register-menu__text">Síntomas</span>
              </button>
              <button class="register-menu__option" data-action="mood">
                <span class="register-menu__icon">😊</span>
                <span class="register-menu__text">Estado de ánimo</span>
              </button>
              <button class="register-menu__option" data-action="activity">
                <span class="register-menu__icon">🏃</span>
                <span class="register-menu__text">Actividad física</span>
              </button>
            </div>
            <button class="register-menu__close" id="register-menu-close">
              <span class="icon">✕</span>
            </button>
          </div>
        </div>

        <!-- Bottom Navigation -->
        <nav class="bottom-nav">
          <div class="bottom-nav__container">
            <a href="#/" class="bottom-nav__item active" aria-label="Inicio">
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
            <a href="#/perfil" class="bottom-nav__item" aria-label="Perfil">
              <span class="bottom-nav__icon">👤</span>
              <span class="bottom-nav__label">Perfil</span>
            </a>
          </div>
        </nav>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Menu button
    const menuBtn = document.querySelector('.app-header__menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        const sideMenu = document.getElementById('side-menu');
        sideMenu.classList.add('active');
      });
    }

    // Side menu close button
    const sideMenuClose = document.getElementById('side-menu-close');
    if (sideMenuClose) {
      sideMenuClose.addEventListener('click', () => {
        const sideMenu = document.getElementById('side-menu');
        sideMenu.classList.remove('active');
      });
    }

    // Side menu items
    const sideMenuItems = document.querySelectorAll('.side-menu__item');
    sideMenuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (href) {
          // Si href ya tiene #, usarlo directamente, si no, agregarlo
          if (href.startsWith('#')) {
            window.location.hash = href;
          } else {
            window.location.hash = `#${href}`;
          }
          // Close menu after navigation
          const sideMenu = document.getElementById('side-menu');
          sideMenu.classList.remove('active');
        }
      });
    });

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

    // Calendar button in header
    const calendarBtn = document.querySelector('.app-header__calendar-btn');
    if (calendarBtn) {
      calendarBtn.addEventListener('click', () => {
        window.location.hash = '#/calendario';
      });
    }

    // Period registration button
    const registerPeriodBtn = document.getElementById('register-period-btn');
    if (registerPeriodBtn) {
      registerPeriodBtn.addEventListener('click', () => {
        window.location.hash = '#/periodo';
      });
    }

    // Bottom navigation
    const navItems = document.querySelectorAll('.bottom-nav__item[href]');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (href && href !== '#/') {
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

  registerPeriod() {
    if (!this.cycleService) {
      console.error('CycleService no disponible');
      return;
    }

    const today = new Date();
    const success = this.cycleService.recordPeriod(today);
    
    if (success) {
      console.log('Período registrado exitosamente en CycleService');
      
      // Actualizar los datos del ciclo
      this.loadUserData();
      
      // Mostrar mensaje de confirmación
      import('../components/Toast.js').then(({ Toast }) => {
        Toast.success('Período registrado exitosamente. Datos actualizados.');
      });
      
      // Volver a renderizar para mostrar la información actualizada
      setTimeout(() => {
        this.render();
      }, 1500);
    } else {
      console.error('Falló el registro del período');
      import('../components/Toast.js').then(({ Toast }) => {
        Toast.error('Ya tienes un período registrado para hoy');
      });
    }
  }
}

export class StatsPage {
  constructor() {
    this.cycleService = null;
    this.cycleStats = null;
    this.initCycleService();
  }

  async initCycleService() {
    try {
      const { CycleService } = await import('../services/CycleService.js');
      this.cycleService = new CycleService();
      
      // Esperar un poco para asegurar que se inicialice completamente
      await new Promise(resolve => setTimeout(resolve, 100));
      
      this.updateCycleData();
      
      // Re-renderizar después de que CycleService esté listo
      this.render();
      
      console.log('StatsPage renderizado después de CycleService');
    } catch (error) {
      console.error('Error al cargar CycleService:', error);
      // Si falla, renderizar de todas formas
      this.render();
    }
  }

  updateCycleData() {
    if (this.cycleService) {
      this.cycleStats = this.cycleService.getCycleStatistics();
      
      // Debug: verificar que los datos se carguen
      console.log('StatsPage - CycleService cargado:', this.cycleService);
      console.log('StatsPage - Estadísticas del ciclo:', this.cycleStats);
      console.log('StatsPage - Total de ciclos:', this.cycleStats ? this.cycleStats.totalCycles : 'N/A');
      console.log('StatsPage - Historial de ciclos:', this.cycleStats ? this.cycleStats.cycleHistory : 'N/A');
    } else {
      console.log('StatsPage - CycleService no está disponible aún');
    }
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
            <h1 class="app-header__title">Mis Estadísticas</h1>
            <button class="app-header__profile-btn" aria-label="Perfil">
              <span class="icon">👤</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <!-- Average Cycle Duration Card -->
            <div class="stats-card">
              <div class="stats-card__header">
                <h3 class="stats-card__title">Duración promedio del ciclo</h3>
              </div>
              <div class="stats-card__content">
                <div class="stats-card__main-value">${this.cycleStats ? this.cycleStats.averageCycleLength : 28} días</div>
                <div class="stats-card__subtitle">Basado en ${this.cycleStats ? this.cycleStats.totalCycles : 0} ciclos</div>
              </div>
            </div>

            <!-- Cycle Regularity Card -->
            <div class="stats-card">
              <div class="stats-card__header">
                <h3 class="stats-card__title">Regularidad del ciclo</h3>
              </div>
              <div class="stats-card__content">
                <div class="stats-card__chart-placeholder">
                  <!-- Aquí iría un gráfico real -->
                  <div class="chart-placeholder">
                    <span class="chart-placeholder__text">Gráfico de regularidad</span>
                  </div>
                </div>
                <div class="stats-card__variation">Variación: ±${this.cycleStats ? this.cycleStats.cycleVariation : 0} días</div>
              </div>
            </div>

            <!-- Last Cycles Card -->
            <div class="stats-card">
              <div class="stats-card__header">
                <h3 class="stats-card__title">Últimos ciclos</h3>
              </div>
              <div class="stats-card__content">
                <div class="cycles-list">
                  ${this.cycleStats && this.cycleStats.cycleHistory.length > 0 ? 
                    this.cycleStats.cycleHistory.slice(-6).map(cycle => {
                      const startDate = new Date(cycle.startDate);
                      const month = startDate.toLocaleDateString('es-ES', { month: 'short' });
                      const duration = cycle.duration ? `${cycle.duration}d` : 'En progreso';
                      return `
                        <div class="cycle-item">
                          <span class="cycle-item__month">${month}</span>
                          <span class="cycle-item__duration">${duration}</span>
                        </div>
                      `;
                    }).join('') : 
                    '<div class="cycle-item">No hay ciclos registrados</div>'
                  }
                </div>
              </div>
            </div>

            <!-- Additional Stats -->
            <div class="stats-grid">
              <div class="stats-mini-card">
                <div class="stats-mini-card__value">${this.cycleStats ? this.cycleStats.totalCycles : 0}</div>
                <div class="stats-mini-card__label">Ciclos registrados</div>
              </div>
              <div class="stats-mini-card">
                <div class="stats-mini-card__value">${this.cycleStats && this.cycleStats.totalCycles > 0 ? 
                  Math.max(0, Math.min(100, 100 - (this.cycleStats.cycleVariation / this.cycleStats.averageCycleLength * 100))) : 0}%</div>
                <div class="stats-mini-card__label">Regularidad</div>
              </div>
              <div class="stats-mini-card">
                <div class="stats-mini-card__value">7</div>
                <div class="stats-mini-card__label">Días fértiles promedio</div>
              </div>
              <div class="stats-mini-card">
                <div class="stats-mini-card__value">${this.cycleStats ? this.cycleStats.currentPhase.symptoms ? this.cycleStats.currentPhase.symptoms.length : 0 : 0}</div>
                <div class="stats-mini-card__label">Síntomas típicos</div>
              </div>
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
            <a href="#/estadisticas" class="bottom-nav__item active" aria-label="Estadísticas">
              <span class="bottom-nav__icon">📊</span>
              <span class="bottom-nav__label">Estadísticas</span>
            </a>
            <a href="#/perfil" class="bottom-nav__item" aria-label="Perfil">
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

  bindEvents() {
    // Menu button
    const menuBtn = document.querySelector('.app-header__menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        console.log('Menú abierto');
      });
    }

    // Profile button
    const profileBtn = document.querySelector('.app-header__profile-btn');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        window.location.hash = '#/perfil';
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
        if (href && href !== '#/estadisticas') {
          // Si href ya tiene #, usarlo directamente, si no, agregarlo
          if (href.startsWith('#')) {
            window.location.hash = href;
          } else {
            window.location.hash = `#${href}`;
          }
        }
      });
    });

    // Stats cards click events
    const statsCards = document.querySelectorAll('.stats-card');
    statsCards.forEach(card => {
      card.addEventListener('click', () => {
        this.showDetailedStats(card);
      });
    });
  }

  showDetailedStats(card) {
    const title = card.querySelector('.stats-card__title').textContent;
    console.log(`Mostrando estadísticas detalladas para: ${title}`);
    
    // Aquí se podría abrir un modal con estadísticas más detalladas
    // Por ahora solo mostramos en consola
  }
}

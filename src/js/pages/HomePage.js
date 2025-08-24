/**
 * Página de inicio
 */
export class HomePage {
  constructor() {
    this.currentDay = 14;
    this.cyclePhase = 'Fase folicular';
    this.pregnancyProbability = 'baja';
    this.nextPeriod = 18;
    this.fertileWindow = 4;
    this.hasSymptoms = false;
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
            <h1 class="app-header__title">Mi Ciclo</h1>
            <button class="app-header__profile-btn" aria-label="Perfil">
              <span class="icon">👤</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <!-- Cycle Day Circle -->
            <div class="cycle-display">
              <div class="cycle-display__circle">
                <div class="cycle-display__day">Día ${this.currentDay}</div>
                <div class="cycle-display__phase">${this.cyclePhase}</div>
              </div>
            </div>

            <!-- Status Cards -->
            <div class="status-cards">
              <!-- Current Status Card -->
              <div class="status-card">
                <div class="status-card__header">
                  <h3 class="status-card__title">Estado actual</h3>
                </div>
                <div class="status-card__content">
                  <p class="status-card__text">Probabilidad de embarazo: <span class="status-card__highlight">${this.pregnancyProbability}</span></p>
                </div>
              </div>

              <!-- Predictions Card -->
              <div class="status-card">
                <div class="status-card__header">
                  <h3 class="status-card__title">Predicciones</h3>
                </div>
                <div class="status-card__content">
                  <div class="status-card__item">
                    <span class="status-card__label">Próximo periodo:</span>
                    <span class="status-card__value">${this.nextPeriod} días</span>
                  </div>
                  <div class="status-card__item">
                    <span class="status-card__label">Ventana fértil:</span>
                    <span class="status-card__value">${this.fertileWindow} días</span>
                  </div>
                </div>
              </div>

              <!-- Symptoms Card -->
              <div class="status-card">
                <div class="status-card__header">
                  <h3 class="status-card__title">Síntomas de hoy</h3>
                </div>
                <div class="status-card__content">
                  <p class="status-card__text">${this.hasSymptoms ? 'Registrar síntomas' : 'Sin registros'}</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <!-- Floating Action Button -->
        <button class="fab" aria-label="Agregar actividad">
          <span class="fab__icon">+</span>
        </button>

        <!-- Bottom Navigation -->
        <nav class="bottom-nav">
          <div class="bottom-nav__container">
            <a href="/" class="bottom-nav__item active" aria-label="Inicio">
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
            <a href="/perfil" class="bottom-nav__item" aria-label="Perfil">
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
    // FAB click
    const fab = document.querySelector('.fab');
    if (fab) {
      fab.addEventListener('click', () => {
        window.location.hash = '#/registrar';
      });
    }

    // Menu button
    const menuBtn = document.querySelector('.app-header__menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        // Aquí se podría abrir un menú lateral
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

    // Bottom navigation
    const navItems = document.querySelectorAll('.bottom-nav__item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (href && href !== '/') {
          window.location.hash = `#${href}`;
        }
      });
    });
  }
}

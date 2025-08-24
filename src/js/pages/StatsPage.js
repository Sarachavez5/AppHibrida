export class StatsPage {
  constructor() {
    this.averageCycleDuration = 28;
    this.cycleVariation = '±2 días';
    this.lastCycles = [
      { month: 'Jul', duration: 29 },
      { month: 'Jun', duration: 27 },
      { month: 'May', duration: 28 },
      { month: 'Abr', duration: 30 }
    ];
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
                <div class="stats-card__main-value">${this.averageCycleDuration} días</div>
                <div class="stats-card__subtitle">Últimos 6 meses</div>
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
                <div class="stats-card__variation">Variación: ${this.cycleVariation}</div>
              </div>
            </div>

            <!-- Last Cycles Card -->
            <div class="stats-card">
              <div class="stats-card__header">
                <h3 class="stats-card__title">Últimos ciclos</h3>
              </div>
              <div class="stats-card__content">
                <div class="cycles-list">
                  ${this.lastCycles.map(cycle => `
                    <div class="cycle-item">
                      <span class="cycle-item__month">${cycle.month}</span>
                      <span class="cycle-item__duration">${cycle.duration}d</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Additional Stats -->
            <div class="stats-grid">
              <div class="stats-mini-card">
                <div class="stats-mini-card__value">4</div>
                <div class="stats-mini-card__label">Ciclos registrados</div>
              </div>
              <div class="stats-mini-card">
                <div class="stats-mini-card__value">85%</div>
                <div class="stats-mini-card__label">Regularidad</div>
              </div>
              <div class="stats-mini-card">
                <div class="stats-mini-card__value">5</div>
                <div class="stats-mini-card__label">Días fértiles promedio</div>
              </div>
              <div class="stats-mini-card">
                <div class="stats-mini-card__value">3</div>
                <div class="stats-mini-card__label">Síntomas más comunes</div>
              </div>
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
            <a href="/estadisticas" class="bottom-nav__item active" aria-label="Estadísticas">
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

    // Bottom navigation
    const navItems = document.querySelectorAll('.bottom-nav__item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (href && href !== '/estadisticas') {
          window.location.hash = `#${href}`;
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

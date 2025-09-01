/**
 * Componente de navegación inferior reutilizable
 */
export class BottomNavigation {
  constructor(activePage = '') {
    this.activePage = activePage;
  }

  render() {
    return `
      <nav class="bottom-nav">
        <div class="bottom-nav__container">
          <a href="/" class="bottom-nav__item ${this.activePage === 'home' ? 'active' : ''}" aria-label="Inicio">
            <span class="bottom-nav__icon">🏠</span>
            <span class="bottom-nav__label">Inicio</span>
          </a>
          <a href="/sintomas" class="bottom-nav__item ${this.activePage === 'symptoms' ? 'active' : ''}" aria-label="Síntomas">
            <span class="bottom-nav__icon">🩸</span>
            <span class="bottom-nav__label">Síntomas</span>
          </a>
          <a href="/estado-animo" class="bottom-nav__item ${this.activePage === 'mood' ? 'active' : ''}" aria-label="Estado de Ánimo">
            <span class="bottom-nav__icon">😊</span>
            <span class="bottom-nav__label">Ánimo</span>
          </a>
          <a href="/educacion" class="bottom-nav__item ${this.activePage === 'education' ? 'active' : ''}" aria-label="Educación">
            <span class="bottom-nav__icon">📚</span>
            <span class="bottom-nav__label">Aprende</span>
          </a>
          <a href="/perfil" class="bottom-nav__item ${this.activePage === 'profile' ? 'active' : ''}" aria-label="Perfil">
            <span class="bottom-nav__icon">👤</span>
            <span class="bottom-nav__label">Perfil</span>
          </a>
        </div>
      </nav>
    `;
  }

  bindEvents() {
    const navItems = document.querySelectorAll('.bottom-nav__item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (href) {
          window.location.hash = `#${href}`;
        }
      });
    });
  }
}


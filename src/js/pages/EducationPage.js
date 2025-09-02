export class EducationPage {
  constructor() {
    this.categories = [
      {
        id: 'fertilidad',
        title: 'Fertilidad y Concepción',
        subtitle: '8 artículos',
        icon: '👶',
        color: 'var(--color-fertile)'
      },
      {
        id: 'nutricion',
        title: 'Nutrición y Ciclo',
        subtitle: '15 artículos',
        icon: '🥗',
        color: 'var(--color-success)'
      },
      {
        id: 'autocuidado',
        title: 'Autocuidado y Bienestar',
        subtitle: '10 artículos',
        icon: '🧘',
        color: 'var(--color-primary)'
      }
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
            <h1 class="app-header__title">Aprende</h1>
            <button class="app-header__profile-btn" aria-label="Perfil">
              <span class="icon">👤</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <!-- Search Bar -->
            <div class="search-section">
              <div class="search-bar">
                <span class="search-bar__icon">🔍</span>
                <input 
                  type="text" 
                  class="search-bar__input" 
                  placeholder="Buscar artículos..."
                  id="search-input"
                >
              </div>
            </div>

            <!-- Categories -->
            <div class="education-categories">
              <h2 class="education-categories__title">Categorías</h2>
              
              <div class="categories-grid">
                ${this.categories.map(category => `
                  <div class="category-card" data-category="${category.id}">
                    <div class="category-card__icon" style="background-color: ${category.color}20; color: ${category.color}">
                      ${category.icon}
                    </div>
                    <div class="category-card__content">
                      <h3 class="category-card__title">${category.title}</h3>
                      <p class="category-card__subtitle">${category.subtitle}</p>
                    </div>
                    <span class="category-card__arrow">›</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Featured Articles -->
            <div class="featured-articles">
              <h2 class="featured-articles__title">Artículos Destacados</h2>
              
              <div class="articles-list">
                <div class="article-card" data-article="1">
                  <div class="article-card__image">
                    <div class="article-image-placeholder">📚</div>
                  </div>
                  <div class="article-card__content">
                    <h3 class="article-card__title">Entendiendo tu ciclo menstrual</h3>
                    <p class="article-card__excerpt">Aprende las fases del ciclo menstrual y cómo identificar patrones en tu cuerpo.</p>
                    <div class="article-card__meta">
                      <span class="article-card__category">Educación</span>
                      <span class="article-card__read-time">5 min lectura</span>
                    </div>
                  </div>
                </div>

                <div class="article-card" data-article="2">
                  <div class="article-card__image">
                    <div class="article-image-placeholder">🥗</div>
                  </div>
                  <div class="article-card__content">
                    <h3 class="article-card__title">Nutrición durante cada fase</h3>
                    <p class="article-card__excerpt">Descubre qué alimentos te benefician más en cada fase de tu ciclo.</p>
                    <div class="article-card__meta">
                      <span class="article-card__category">Nutrición</span>
                      <span class="article-card__read-time">7 min lectura</span>
                    </div>
                  </div>
                </div>

                <div class="article-card" data-article="3">
                  <div class="article-card__image">
                    <div class="article-image-placeholder">🧘</div>
                  </div>
                  <div class="article-card__content">
                    <h3 class="article-card__title">Ejercicios para cada fase</h3>
                    <p class="article-card__excerpt">Rutinas de ejercicio adaptadas a tu energía y necesidades en cada fase.</p>
                    <div class="article-card__meta">
                      <span class="article-card__category">Bienestar</span>
                      <span class="article-card__read-time">6 min lectura</span>
                    </div>
                  </div>
                </div>
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
            <a href="#/educacion" class="bottom-nav__item active" aria-label="Educación">
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

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });
    }

    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const categoryId = card.dataset.category;
        this.showCategoryArticles(categoryId);
      });
    });

    // Article cards
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
      card.addEventListener('click', () => {
        const articleId = card.dataset.article;
        this.showArticle(articleId);
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

    // Bottom navigation
    const navItems = document.querySelectorAll('.bottom-nav__item[href]');
    navItems.forEach(item => {
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
        }
      });
    });
  }

  handleSearch(query) {
    console.log('Buscando:', query);
    
    if (query.length > 2) {
      // Aquí se implementaría la lógica de búsqueda real
      this.showSearchResults(query);
    }
  }

  showSearchResults(query) {
    // Importar Modal dinámicamente
    import('../components/Modal.js').then(({ Modal }) => {
      Modal.create(`
        <div class="search-results">
          <h3>Resultados de búsqueda para "${query}"</h3>
          <div class="search-results__list">
            <div class="search-result-item">
              <h4>Entendiendo tu ciclo menstrual</h4>
              <p>Artículo que explica las fases del ciclo...</p>
            </div>
            <div class="search-result-item">
              <h4>Nutrición durante cada fase</h4>
              <p>Guía de alimentación según tu ciclo...</p>
            </div>
            <div class="search-result-item">
              <h4>Ejercicios para cada fase</h4>
              <p>Rutinas adaptadas a tu energía...</p>
            </div>
          </div>
        </div>
      `, {
        title: 'Resultados de Búsqueda',
        footer: '<button class="btn btn--primary">Ver todos los resultados</button>'
      });
    });
  }

  showCategoryArticles(categoryId) {
    const category = this.categories.find(cat => cat.id === categoryId);
    
    if (!category) return;

    // Importar Modal dinámicamente
    import('../components/Modal.js').then(({ Modal }) => {
      Modal.create(`
        <div class="category-articles">
          <h3>${category.title}</h3>
          <p>Explora artículos sobre ${category.title.toLowerCase()}</p>
          
          <div class="articles-list">
            <div class="article-item">
              <h4>Artículo 1: Introducción a ${category.title}</h4>
              <p>Descripción del primer artículo...</p>
              <span class="article-meta">5 min lectura</span>
            </div>
            <div class="article-item">
              <h4>Artículo 2: Consejos prácticos</h4>
              <p>Descripción del segundo artículo...</p>
              <span class="article-meta">7 min lectura</span>
            </div>
            <div class="article-item">
              <h4>Artículo 3: Casos de estudio</h4>
              <p>Descripción del tercer artículo...</p>
              <span class="article-meta">6 min lectura</span>
            </div>
          </div>
        </div>
      `, {
        title: category.title,
        footer: '<button class="btn btn--primary">Ver todos los artículos</button>'
      });
    });
  }

  showArticle(articleId) {
    const articles = {
      1: {
        title: 'Entendiendo tu ciclo menstrual',
        content: `
          <h3>¿Qué es el ciclo menstrual?</h3>
          <p>El ciclo menstrual es el proceso mensual que prepara tu cuerpo para un posible embarazo. Cada mes, tu cuerpo pasa por una serie de cambios hormonales que afectan tu útero y ovarios.</p>
          
          <h3>Las fases del ciclo</h3>
          <p><strong>Fase folicular:</strong> Esta fase comienza el primer día de tu periodo y dura hasta la ovulación. Durante este tiempo, los niveles de estrógeno aumentan, haciendo que el revestimiento del útero crezca y se engrose.</p>
          
          <p><strong>Ovulación:</strong> Ocurre aproximadamente en el día 14 de un ciclo de 28 días. Un óvulo es liberado del ovario y viaja hacia el útero a través de las trompas de Falopio.</p>
          
          <p><strong>Fase lútea:</strong> Después de la ovulación, el cuerpo lúteo produce progesterona. Si el óvulo no es fertilizado, los niveles hormonales caen y comienza el periodo.</p>
          
          <h3>¿Por qué es importante entender tu ciclo?</h3>
          <p>Conocer tu ciclo te ayuda a:</p>
          <ul>
            <li>Predecir cuándo llegará tu próximo periodo</li>
            <li>Identificar tu ventana fértil</li>
            <li>Entender los cambios en tu estado de ánimo y energía</li>
            <li>Detectar irregularidades que podrían indicar problemas de salud</li>
          </ul>
        `
      },
      2: {
        title: 'Nutrición durante cada fase',
        content: `
          <h3>Alimentación adaptada a tu ciclo</h3>
          <p>Tu cuerpo tiene diferentes necesidades nutricionales durante cada fase del ciclo menstrual. Adaptar tu alimentación puede ayudarte a sentirte mejor y mantener tu energía estable.</p>
          
          <h3>Fase folicular (días 1-14)</h3>
          <p>Durante esta fase, tu cuerpo necesita más energía. Incluye:</p>
          <ul>
            <li>Proteínas magras (pollo, pescado, legumbres)</li>
            <li>Carbohidratos complejos (arroz integral, quinoa)</li>
            <li>Grasas saludables (aguacate, nueces, aceite de oliva)</li>
            <li>Hierro (espinacas, lentejas, carne roja)</li>
          </ul>
          
          <h3>Fase lútea (días 15-28)</h3>
          <p>En esta fase, tu metabolismo aumenta. Enfócate en:</p>
          <ul>
            <li>Alimentos ricos en magnesio (chocolate negro, almendras)</li>
            <li>Omega-3 (salmón, semillas de chía)</li>
            <li>Vitamina B6 (plátanos, atún, garbanzos)</li>
            <li>Calcio (lácteos, brócoli, sardinas)</li>
          </ul>
        `
      },
      3: {
        title: 'Ejercicios para cada fase',
        content: `
          <h3>Rutinas adaptadas a tu energía</h3>
          <p>Tu nivel de energía varía durante el ciclo, por lo que es importante adaptar tu rutina de ejercicios a cada fase.</p>
          
          <h3>Fase folicular: Alta energía</h3>
          <p>Es el momento perfecto para ejercicios intensos:</p>
          <ul>
            <li>Entrenamiento de fuerza</li>
            <li>Cardio de alta intensidad (HIIT)</li>
            <li>Deportes de equipo</li>
            <li>Clases de spinning o kickboxing</li>
          </ul>
          
          <h3>Fase lútea: Energía moderada</h3>
          <p>Reduce la intensidad y enfócate en:</p>
          <ul>
            <li>Yoga suave</li>
            <li>Pilates</li>
            <li>Caminatas</li>
            <li>Natación</li>
          </ul>
          
          <h3>Durante el periodo</h3>
          <p>Escucha a tu cuerpo y opta por:</p>
          <ul>
            <li>Estiramientos suaves</li>
            <li>Meditación</li>
            <li>Caminatas cortas</li>
            <li>Descanso activo</li>
          </ul>
        `
      }
    };

    const article = articles[articleId];
    if (!article) return;

    // Importar Modal dinámicamente
    import('../components/Modal.js').then(({ Modal }) => {
      Modal.create(`
        <div class="article-content">
          ${article.content}
        </div>
      `, {
        title: article.title,
        footer: '<button class="btn btn--primary">Marcar como leído</button>'
      });
    });
  }
}

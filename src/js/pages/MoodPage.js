export class MoodPage {
  constructor() {
    this.selectedMood = 'sensible';
    this.selectedEnergy = 'baja';
    this.selectedSleep = 'mala';
    this.notes = '';
  }

  render() {
    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = `
      <div class="app">
        <!-- Header -->
        <header class="app-header">
          <div class="app-header__container">
            <button class="app-header__back-btn" aria-label="Volver">
              <span class="icon">‹</span>
            </button>
            <h1 class="app-header__title">Estado de Ánimo</h1>
            <button class="app-header__save-btn" aria-label="Guardar">
              <span class="icon">✓</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <!-- Mood Section -->
            <div class="form-section">
              <h3 class="form-section__title">¿Cómo te sientes hoy?</h3>
              <div class="form-section__content">
                <div class="mood-buttons">
                  <button class="mood-btn ${this.selectedMood === 'feliz' ? 'active' : ''}" data-mood="feliz">
                    😊
                  </button>
                  <button class="mood-btn ${this.selectedMood === 'sensible' ? 'active' : ''}" data-mood="sensible">
                    🥺
                  </button>
                  <button class="mood-btn ${this.selectedMood === 'triste' ? 'active' : ''}" data-mood="triste">
                    😢
                  </button>
                  <button class="mood-btn ${this.selectedMood === 'ansiosa' ? 'active' : ''}" data-mood="ansiosa">
                    😰
                  </button>
                </div>
                <div class="mood-labels">
                  <span class="mood-label">Feliz</span>
                  <span class="mood-label">Sensible</span>
                  <span class="mood-label">Triste</span>
                  <span class="mood-label">Ansiosa</span>
                </div>
              </div>
            </div>

            <!-- Energy Level Section -->
            <div class="form-section">
              <h3 class="form-section__title">Nivel de energía</h3>
              <div class="form-section__content">
                <div class="energy-buttons">
                  <button class="energy-btn ${this.selectedEnergy === 'baja' ? 'active' : ''}" data-energy="baja">
                    Baja
                  </button>
                  <button class="energy-btn ${this.selectedEnergy === 'media' ? 'active' : ''}" data-energy="media">
                    Media
                  </button>
                  <button class="energy-btn ${this.selectedEnergy === 'alta' ? 'active' : ''}" data-energy="alta">
                    Alta
                  </button>
                </div>
              </div>
            </div>

            <!-- Sleep Quality Section -->
            <div class="form-section">
              <h3 class="form-section__title">Calidad del sueño</h3>
              <div class="form-section__content">
                <div class="sleep-buttons">
                  <button class="sleep-btn ${this.selectedSleep === 'mala' ? 'active' : ''}" data-sleep="mala">
                    Mala
                  </button>
                  <button class="sleep-btn ${this.selectedSleep === 'regular' ? 'active' : ''}" data-sleep="regular">
                    Regular
                  </button>
                  <button class="sleep-btn ${this.selectedSleep === 'buena' ? 'active' : ''}" data-sleep="buena">
                    Buena
                  </button>
                </div>
              </div>
            </div>

            <!-- Notes Section -->
            <div class="form-section">
              <h3 class="form-section__title">Notas</h3>
              <div class="form-section__content">
                <textarea 
                  class="notes-textarea" 
                  placeholder="¿Algo más que quieras recordar?"
                  id="mood-notes-textarea"
                >${this.notes}</textarea>
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
            <button class="bottom-nav__item" id="register-btn" aria-label="Registrar">
              <span class="bottom-nav__icon">➕</span>
              <span class="bottom-nav__label">Registrar</span>
            </button>
            <a href="/educacion" class="bottom-nav__item" aria-label="Educación">
              <span class="bottom-nav__icon">📚</span>
              <span class="bottom-nav__label">Aprende</span>
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
    // Back button
    const backBtn = document.querySelector('.app-header__back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.history.back();
      });
    }

    // Save button
    const saveBtn = document.querySelector('.app-header__save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.saveMood();
      });
    }

    // Mood buttons
    const moodBtns = document.querySelectorAll('.mood-btn');
    moodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedMood = btn.dataset.mood;
        this.updateMoodButtons();
      });
    });

    // Energy buttons
    const energyBtns = document.querySelectorAll('.energy-btn');
    energyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedEnergy = btn.dataset.energy;
        this.updateEnergyButtons();
      });
    });

    // Sleep buttons
    const sleepBtns = document.querySelectorAll('.sleep-btn');
    sleepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedSleep = btn.dataset.sleep;
        this.updateSleepButtons();
      });
    });

    // Notes textarea
    const notesTextarea = document.getElementById('mood-notes-textarea');
    if (notesTextarea) {
      notesTextarea.addEventListener('input', (e) => {
        this.notes = e.target.value;
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
        if (href) {
          window.location.hash = `#${href}`;
        }
      });
    });
  }

  updateMoodButtons() {
    const moodBtns = document.querySelectorAll('.mood-btn');
    moodBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.mood === this.selectedMood) {
        btn.classList.add('active');
      }
    });
  }

  updateEnergyButtons() {
    const energyBtns = document.querySelectorAll('.energy-btn');
    energyBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.energy === this.selectedEnergy) {
        btn.classList.add('active');
      }
    });
  }

  updateSleepButtons() {
    const sleepBtns = document.querySelectorAll('.sleep-btn');
    sleepBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.sleep === this.selectedSleep) {
        btn.classList.add('active');
      }
    });
  }

  getTodayKey() {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }

  saveMood() {
    // Obtener la fecha de hoy (usar el mismo formato que HomePage)
    const today = this.getTodayKey();
    const todayKey = `mood_${today}`;
    
    const moodData = {
      mood: this.selectedMood,
      energy: this.selectedEnergy,
      sleep: this.selectedSleep,
      notes: this.notes,
      date: today,
      timestamp: new Date().toISOString()
    };

    // Guardar en localStorage
    localStorage.setItem(todayKey, JSON.stringify(moodData));
    
    console.log('Estado de ánimo guardado:', moodData);
    
    // Mostrar mensaje de éxito
    this.showSuccessMessage();
  }

  showSuccessMessage() {
    // Importar Toast dinámicamente
    import('../components/Toast.js').then(({ Toast }) => {
      Toast.success('Estado de ánimo registrado exitosamente');
      
      // Redirigir a la página principal después de un breve delay
      setTimeout(() => {
        window.location.hash = '#/';
      }, 1500);
    });
  }
}

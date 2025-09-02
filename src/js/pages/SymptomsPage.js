export class SymptomsPage {
  constructor() {
    this.symptoms = {
      'dolor-abdominal': false,
      'dolor-cabeza': true,
      'sensibilidad-senos': false,
      'antojos': true,
      'cambios-flujo': false
    };
    this.painIntensity = '';
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
            <h1 class="app-header__title">Síntomas</h1>
            <button class="app-header__save-btn" aria-label="Guardar">
              <span class="icon">✓</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <!-- Symptoms List -->
            <div class="symptoms-list">
              <div class="symptom-item">
                <label class="symptom-label">
                  <input type="checkbox" class="symptom-checkbox" data-symptom="dolor-abdominal" ${this.symptoms['dolor-abdominal'] ? 'checked' : ''}>
                  <span class="symptom-text">Dolor abdominal</span>
                </label>
              </div>
              
              <div class="symptom-item">
                <label class="symptom-label">
                  <input type="checkbox" class="symptom-checkbox" data-symptom="dolor-cabeza" ${this.symptoms['dolor-cabeza'] ? 'checked' : ''}>
                  <span class="symptom-text">Dolor de cabeza</span>
                </label>
              </div>
              
              <div class="symptom-item">
                <label class="symptom-label">
                  <input type="checkbox" class="symptom-checkbox" data-symptom="sensibilidad-senos" ${this.symptoms['sensibilidad-senos'] ? 'checked' : ''}>
                  <span class="symptom-text">Sensibilidad en senos</span>
                </label>
              </div>
              
              <div class="symptom-item">
                <label class="symptom-label">
                  <input type="checkbox" class="symptom-checkbox" data-symptom="antojos" ${this.symptoms['antojos'] ? 'checked' : ''}>
                  <span class="symptom-text">Antojos</span>
                </label>
              </div>
              
              <div class="symptom-item">
                <label class="symptom-label">
                  <input type="checkbox" class="symptom-checkbox" data-symptom="cambios-flujo" ${this.symptoms['cambios-flujo'] ? 'checked' : ''}>
                  <span class="symptom-text">Cambios en flujo vaginal</span>
                </label>
              </div>
            </div>

            <!-- Pain Intensity -->
            <div class="pain-intensity">
              <h3 class="pain-intensity__title">Intensidad del dolor (1-10)</h3>
              <input 
                type="number" 
                class="pain-intensity__input" 
                min="1" 
                max="10" 
                placeholder="Ingresa un número del 1 al 10"
                value="${this.painIntensity}"
                id="pain-intensity-input"
              >
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
        this.saveSymptoms();
      });
    }

    // Symptom checkboxes
    const symptomCheckboxes = document.querySelectorAll('.symptom-checkbox');
    symptomCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const symptom = e.target.dataset.symptom;
        this.symptoms[symptom] = e.target.checked;
      });
    });

    // Pain intensity input
    const painIntensityInput = document.getElementById('pain-intensity-input');
    if (painIntensityInput) {
      painIntensityInput.addEventListener('input', (e) => {
        this.painIntensity = e.target.value;
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

  getTodayKey() {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }

  saveSymptoms() {
    // Obtener la fecha de hoy (usar el mismo formato que HomePage)
    const today = this.getTodayKey();
    const todayKey = `symptoms_${today}`;
    
    // Crear lista de síntomas seleccionados
    const selectedSymptoms = [];
    Object.keys(this.symptoms).forEach(symptom => {
      if (this.symptoms[symptom]) {
        selectedSymptoms.push(symptom);
      }
    });
    
    const symptomsData = {
      symptoms: selectedSymptoms,
      painIntensity: this.painIntensity,
      date: today,
      timestamp: new Date().toISOString()
    };

    // Guardar en localStorage
    localStorage.setItem(todayKey, JSON.stringify(symptomsData));
    
    console.log('Síntomas guardados:', symptomsData);
    
    // Mostrar mensaje de éxito
    this.showSuccessMessage();
  }

  showSuccessMessage() {
    // Importar Toast dinámicamente
    import('../components/Toast.js').then(({ Toast }) => {
      Toast.success('Síntomas registrados exitosamente');
      
      // Redirigir a la página principal después de un breve delay
      setTimeout(() => {
        window.location.hash = '#/';
      }, 1500);
    });
  }
}

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

    // Bottom navigation
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

  saveSymptoms() {
    const symptomsData = {
      symptoms: this.symptoms,
      painIntensity: this.painIntensity,
      date: new Date().toISOString().split('T')[0]
    };

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

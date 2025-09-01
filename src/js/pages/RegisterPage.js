export class RegisterPage {
  constructor() {
    this.selectedActivity = 'sexo';
    this.selectedDetail = 'sin-proteccion';
    this.selectedTime = '14:30';
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
            <h1 class="app-header__title">Registrar Actividad</h1>
            <button class="app-header__save-btn" aria-label="Guardar">
              <span class="icon">✓</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <!-- Activity Type Section -->
            <div class="form-section">
              <h3 class="form-section__title">Tipo de actividad</h3>
              <div class="form-section__content">
                <div class="activity-buttons">
                  <button class="activity-btn ${this.selectedActivity === 'sexo' ? 'active' : ''}" data-activity="sexo">
                    Sexo
                  </button>
                  <button class="activity-btn ${this.selectedActivity === 'ejercicio' ? 'active' : ''}" data-activity="ejercicio">
                    Ejercicio
                  </button>
                  <button class="activity-btn ${this.selectedActivity === 'meditacion' ? 'active' : ''}" data-activity="meditacion">
                    Meditación
                  </button>
                </div>
              </div>
            </div>

            <!-- Details Section -->
            <div class="form-section">
              <h3 class="form-section__title">Detalles</h3>
              <div class="form-section__content">
                <div class="detail-buttons">
                  <button class="detail-btn ${this.selectedDetail === 'sin-proteccion' ? 'active' : ''}" data-detail="sin-proteccion">
                    Sin protección
                  </button>
                  <button class="detail-btn ${this.selectedDetail === 'con-proteccion' ? 'active' : ''}" data-detail="con-proteccion">
                    Con protección
                  </button>
                </div>
              </div>
            </div>

            <!-- Time Section -->
            <div class="form-section">
              <h3 class="form-section__title">Hora</h3>
              <div class="form-section__content">
                <div class="time-input">
                  <input type="time" class="time-input__field" value="${this.selectedTime}" id="time-input">
                  <span class="time-input__icon">🕐</span>
                </div>
              </div>
            </div>

            <!-- Notes Section -->
            <div class="form-section">
              <h3 class="form-section__title">Notas adicionales</h3>
              <div class="form-section__content">
                <textarea 
                  class="notes-textarea" 
                  placeholder="Agrega cualquier detalle relevante..."
                  id="notes-textarea"
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
            <button class="bottom-nav__item active" aria-label="Registrar">
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
        this.saveActivity();
      });
    }

    // Activity buttons
    const activityBtns = document.querySelectorAll('.activity-btn');
    activityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedActivity = btn.dataset.activity;
        this.updateActivityButtons();
      });
    });

    // Detail buttons
    const detailBtns = document.querySelectorAll('.detail-btn');
    detailBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedDetail = btn.dataset.detail;
        this.updateDetailButtons();
      });
    });

    // Time input
    const timeInput = document.getElementById('time-input');
    if (timeInput) {
      timeInput.addEventListener('change', (e) => {
        this.selectedTime = e.target.value;
      });
    }

    // Notes textarea
    const notesTextarea = document.getElementById('notes-textarea');
    if (notesTextarea) {
      notesTextarea.addEventListener('input', (e) => {
        this.notes = e.target.value;
      });
    }

    // Bottom navigation
    const navItems = document.querySelectorAll('.bottom-nav__item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (href && href !== '/registrar') {
          window.location.hash = `#${href}`;
        }
      });
    });
  }

  updateActivityButtons() {
    const activityBtns = document.querySelectorAll('.activity-btn');
    activityBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.activity === this.selectedActivity) {
        btn.classList.add('active');
      }
    });
  }

  updateDetailButtons() {
    const detailBtns = document.querySelectorAll('.detail-btn');
    detailBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.detail === this.selectedDetail) {
        btn.classList.add('active');
      }
    });
  }

  saveActivity() {
    const activityData = {
      type: this.selectedActivity,
      detail: this.selectedDetail,
      time: this.selectedTime,
      notes: this.notes,
      date: new Date().toISOString().split('T')[0]
    };

    console.log('Actividad guardada:', activityData);
    
    // Aquí se podría enviar a un servidor o guardar localmente
    // Por ahora solo mostramos un mensaje de éxito
    this.showSuccessMessage();
  }

  showSuccessMessage() {
    // Importar Toast dinámicamente
    import('../components/Toast.js').then(({ Toast }) => {
      Toast.success('Actividad registrada exitosamente');
      
      // Redirigir a la página principal después de un breve delay
      setTimeout(() => {
        window.location.hash = '#/';
      }, 1500);
    });
  }
}

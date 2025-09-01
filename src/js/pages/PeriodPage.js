/**
 * Página para registrar períodos menstruales
 */
export class PeriodPage {
  constructor() {
    this.cycleService = null;
    this.initCycleService();
  }

  async initCycleService() {
    try {
      const { CycleService } = await import('../services/CycleService.js');
      this.cycleService = new CycleService();
    } catch (error) {
      console.error('Error al cargar CycleService:', error);
    }
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
            <h1 class="app-header__title">Registrar Período</h1>
            <button class="app-header__save-btn" aria-label="Guardar">
              <span class="icon">✓</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <!-- Period Registration Form -->
            <div class="period-form">
              <div class="form-group">
                <label class="form-label">¿Cuándo comenzó tu período?</label>
                <input 
                  type="date" 
                  class="form-input" 
                  id="period-start-date"
                  value="${this.getTodayFormatted()}"
                >
              </div>

              <div class="form-group">
                <label class="form-label">¿Cuántos días duró?</label>
                <select class="form-select" id="period-duration">
                  <option value="1">1 día</option>
                  <option value="2">2 días</option>
                  <option value="3">3 días</option>
                  <option value="4">4 días</option>
                  <option value="5" selected>5 días</option>
                  <option value="6">6 días</option>
                  <option value="7">7 días</option>
                  <option value="8">8 días</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Intensidad del flujo</label>
                <div class="flow-intensity">
                  <label class="flow-option">
                    <input type="radio" name="flow-intensity" value="light" class="flow-radio">
                    <span class="flow-label">Ligero</span>
                  </label>
                  <label class="flow-option">
                    <input type="radio" name="flow-intensity" value="medium" class="flow-radio" checked>
                    <span class="flow-label">Moderado</span>
                  </label>
                  <label class="flow-option">
                    <input type="radio" name="flow-intensity" value="heavy" class="flow-radio">
                    <span class="flow-label">Abundante</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Síntomas experimentados</label>
                <div class="symptoms-checklist">
                  <label class="symptom-checkbox">
                    <input type="checkbox" value="cramps" class="symptom-input">
                    <span class="symptom-text">Cólicos</span>
                  </label>
                  <label class="symptom-checkbox">
                    <input type="checkbox" value="fatigue" class="symptom-input">
                    <span class="symptom-text">Fatiga</span>
                  </label>
                  <label class="symptom-checkbox">
                    <input type="checkbox" value="mood-swings" class="symptom-input">
                    <span class="symptom-text">Cambios de humor</span>
                  </label>
                  <label class="symptom-checkbox">
                    <input type="checkbox" value="bloating" class="symptom-input">
                    <span class="symptom-text">Hinchazón</span>
                  </label>
                  <label class="symptom-checkbox">
                    <input type="checkbox" value="back-pain" class="symptom-input">
                    <span class="symptom-text">Dolor de espalda</span>
                  </label>
                  <label class="symptom-checkbox">
                    <input type="checkbox" value="headache" class="symptom-input">
                    <span class="symptom-text">Dolor de cabeza</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Notas adicionales</label>
                <textarea 
                  class="form-textarea" 
                  id="period-notes"
                  placeholder="Escribe cualquier observación sobre tu período..."
                  rows="3"
                ></textarea>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="quick-actions">
              <button class="btn btn-secondary" id="quick-today">
                <span class="btn-icon">📅</span>
                Registrar para hoy
              </button>
              <button class="btn btn-secondary" id="quick-yesterday">
                <span class="btn-icon">📅</span>
                Registrar para ayer
              </button>
            </div>

            <!-- Current Cycle Info -->
            ${this.renderCurrentCycleInfo()}
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
            </a>
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

  renderCurrentCycleInfo() {
    if (!this.cycleService) return '';

    const stats = this.cycleService.getCycleStatistics();
    const lastPeriod = stats.lastPeriod;
    
    if (!lastPeriod) {
      return `
        <div class="cycle-info">
          <h3 class="cycle-info__title">Primera vez registrando</h3>
          <p class="cycle-info__text">Al registrar tu primer período, comenzaremos a calcular tu ciclo personalizado.</p>
        </div>
      `;
    }

    const lastPeriodDate = new Date(lastPeriod);
    const daysSince = this.cycleService.calculateDaysBetween(lastPeriodDate, new Date());
    
    return `
      <div class="cycle-info">
        <h3 class="cycle-info__title">Tu último período</h3>
        <p class="cycle-info__text">Fue hace ${daysSince} días (${lastPeriodDate.toLocaleDateString('es-ES')})</p>
        <p class="cycle-info__text">Duración promedio: ${stats.averageCycleLength} días</p>
        <p class="cycle-info__text">Variación: ±${stats.cycleVariation} días</p>
      </div>
    `;
  }

  getTodayFormatted() {
    const today = new Date();
    return today.toISOString().split('T')[0];
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
        this.savePeriod();
      });
    }

    // Quick actions
    const quickTodayBtn = document.getElementById('quick-today');
    if (quickTodayBtn) {
      quickTodayBtn.addEventListener('click', () => {
        this.quickRegister(new Date());
      });
    }

    const quickYesterdayBtn = document.getElementById('quick-yesterday');
    if (quickYesterdayBtn) {
      quickYesterdayBtn.addEventListener('click', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        this.quickRegister(yesterday);
      });
    }

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

  savePeriod() {
    console.log('savePeriod llamado');
    
    if (!this.cycleService) {
      console.error('CycleService no disponible');
      this.showError('Servicio de ciclo no disponible');
      return;
    }

    const startDate = document.getElementById('period-start-date').value;
    const duration = document.getElementById('period-duration').value;
    const flowIntensity = document.querySelector('input[name="flow-intensity"]:checked')?.value;
    const symptoms = Array.from(document.querySelectorAll('.symptom-input:checked')).map(cb => cb.value);
    const notes = document.getElementById('period-notes').value;

    console.log('Datos del formulario:', {
      startDate,
      duration,
      flowIntensity,
      symptoms,
      notes
    });

    // Validación mejorada de fecha
    if (!startDate || startDate.trim() === '') {
      console.error('Fecha vacía o inválida:', startDate);
      this.showError('Por favor selecciona una fecha válida');
      return;
    }

    // Verificar que la fecha sea válida
    const periodDate = new Date(startDate);
    if (isNaN(periodDate.getTime())) {
      console.error('Fecha inválida convertida:', periodDate);
      this.showError('La fecha seleccionada no es válida');
      return;
    }

    console.log('Fecha convertida:', periodDate);
    console.log('Fecha ISO:', periodDate.toISOString());

    const success = this.cycleService.recordPeriod(periodDate);

    if (success) {
      console.log('Período registrado exitosamente en CycleService');
      
      // Guardar detalles adicionales
      const periodDetails = {
        startDate: startDate,
        duration: parseInt(duration),
        flowIntensity,
        symptoms,
        notes,
        timestamp: new Date().toISOString()
      };

      const detailsKey = `period_details_${startDate}`;
      localStorage.setItem(detailsKey, JSON.stringify(periodDetails));
      console.log('Detalles guardados en localStorage:', periodDetails);

      this.showSuccess('Período registrado exitosamente');
      
      // Redirigir a la página principal después de un breve delay
      setTimeout(() => {
        window.location.hash = '#/';
      }, 1500);
    } else {
      console.error('Falló el registro en CycleService');
      this.showError('Ya tienes un período registrado para esa fecha');
    }
  }

  quickRegister(date) {
    if (!this.cycleService) {
      this.showError('Servicio de ciclo no disponible');
      return;
    }

    const success = this.cycleService.recordPeriod(date);
    
    if (success) {
      this.showSuccess('Período registrado exitosamente');
      
      // Redirigir a la página principal después de un breve delay
      setTimeout(() => {
        window.location.hash = '#/';
      }, 1500);
    } else {
      this.showError('Ya tienes un período registrado para esa fecha');
    }
  }

  showSuccess(message) {
    // Importar Toast dinámicamente
    import('../components/Toast.js').then(({ Toast }) => {
      Toast.success(message);
    });
  }

  showError(message) {
    // Importar Toast dinámicamente
    import('../components/Toast.js').then(({ Toast }) => {
      Toast.error(message);
    });
  }
}

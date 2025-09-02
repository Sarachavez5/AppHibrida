export class CalendarPage {
  constructor() {
    console.log('CalendarPage inicializada');
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.selectedDay = null;
    this.calendarDays = [];
    
    // Inicializar servicios de forma segura
    this.initServices();
  }

  async initServices() {
    try {
      // Importar servicios de forma dinámica
      const { CycleService } = await import('../services/CycleService.js');
      const { CalendarService } = await import('../services/CalendarService.js');
      
      this.cycleService = new CycleService();
      this.calendarService = new CalendarService(this.cycleService);
      
      console.log('Servicios inicializados correctamente');
      this.updateCalendarData();
      this.render();
    } catch (error) {
      console.error('Error al inicializar servicios:', error);
      // Fallback: crear datos básicos del calendario
      this.createBasicCalendar();
      this.render();
    }
  }

  createBasicCalendar() {
    console.log('Creando calendario básico...');
    const today = new Date();
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    
    // Calcular días del mes anterior para completar la primera semana
    const firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const daysFromPreviousMonth = firstDayOfWeek;
    
    this.calendarDays = [];
    
    // Días del mes anterior
    const previousMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    const previousYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    const previousMonthLastDay = new Date(previousYear, previousMonth + 1, 0);
    
    for (let i = daysFromPreviousMonth - 1; i >= 0; i--) {
      const day = previousMonthLastDay.getDate() - i;
      const date = new Date(previousYear, previousMonth, day);
      this.calendarDays.push({
        day: day,
        date: date.toISOString().split('T')[0],
        state: 'otro_mes',
        isCurrentMonth: false,
        isToday: this.isSameDay(date, today),
        cycleDay: null,
        phase: null
      });
    }
    
    // Días del mes actual
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      this.calendarDays.push({
        day: day,
        date: date.toISOString().split('T')[0],
        state: 'normal',
        isCurrentMonth: true,
        isToday: this.isSameDay(date, today),
        cycleDay: day,
        phase: 'Normal'
      });
    }
    
    // Completar con días del siguiente mes
    const totalDays = this.calendarDays.length;
    const remainingDays = 42 - totalDays;
    
    if (remainingDays > 0) {
      const nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
      const nextYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
      
      for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(nextYear, nextMonth, day);
        this.calendarDays.push({
          day: day,
          date: date.toISOString().split('T')[0],
          state: 'otro_mes',
          isCurrentMonth: false,
          isToday: this.isSameDay(date, today),
          cycleDay: null,
          phase: null
        });
      }
    }
    
    console.log(`Calendario básico creado con ${this.calendarDays.length} días`);
  }

  updateCalendarData() {
    if (this.calendarService) {
      try {
        this.calendarDays = this.calendarService.generateCalendarData(this.currentMonth, this.currentYear);
      } catch (error) {
        console.error('Error al generar datos del calendario:', error);
        this.createBasicCalendar();
      }
    } else {
      this.createBasicCalendar();
    }
  }

  render() {
    console.log('Renderizando CalendarPage...');
    const appContainer = document.getElementById('app');
    
    if (!appContainer) {
      console.error('No se encontró el contenedor #app');
      return;
    }
    
    appContainer.innerHTML = `
      <div class="app">
        <!-- Header -->
        <header class="app-header">
          <div class="app-header__container">
            <button class="app-header__menu-btn" aria-label="Menú">
              <span class="icon">☰</span>
            </button>
            <h1 class="app-header__title">Calendario</h1>
            <button class="app-header__calendar-btn" aria-label="Ver calendario completo">
              <span class="icon">📅</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <!-- Navegación del calendario -->
            <div class="calendar-nav">
              <button class="calendar-nav__btn" id="prev-month" aria-label="Mes anterior">
                <span class="icon">‹</span>
              </button>
              <h2 class="calendar-nav__title">
                ${this.getMonthName(this.currentMonth)} ${this.currentYear}
              </h2>
              <button class="calendar-nav__btn" id="next-month" aria-label="Mes siguiente">
                <span class="icon">›</span>
              </button>
            </div>

            <!-- Información del ciclo actual -->
            <div class="current-cycle-info">
              ${this.renderCurrentCycleInfo()}
            </div>

            <!-- Calendario -->
            <div class="calendar">
              <!-- Encabezados de días -->
              <div class="calendar__header">
                <div class="calendar__day-header">L</div>
                <div class="calendar__day-header">M</div>
                <div class="calendar__day-header">M</div>
                <div class="calendar__day-header">J</div>
                <div class="calendar__day-header">V</div>
                <div class="calendar__day-header">S</div>
                <div class="calendar__day-header">D</div>
              </div>
              
              <!-- Grid de días -->
              <div class="calendar__grid">
                ${this.generateCalendarDays()}
              </div>
            </div>

            <!-- Leyenda del calendario -->
            <div class="calendar-legend">
              <div class="calendar-legend__item">
                <div class="calendar-legend__color calendar-legend__color--period"></div>
                <span class="calendar-legend__label">Días de periodo</span>
              </div>
              <div class="calendar-legend__item">
                <div class="calendar-legend__color calendar-legend__color--fertile"></div>
                <span class="calendar-legend__label">Días fértiles</span>
              </div>
              <div class="calendar-legend__item">
                <div class="calendar-legend__color calendar-legend__color--future-period"></div>
                <span class="calendar-legend__label">Próximo periodo</span>
              </div>
              <div class="calendar-legend__item">
                <div class="calendar-legend__color calendar-legend__color--today"></div>
                <span class="calendar-legend__label">Hoy</span>
              </div>
            </div>

            <!-- Estadísticas del mes -->
            <div class="month-stats">
              ${this.renderMonthStatistics()}
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
            <a href="#/calendario" class="bottom-nav__item active" aria-label="Calendario">
              <span class="bottom-nav__icon">📅</span>
              <span class="bottom-nav__label">Calendario</span>
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

    console.log('CalendarPage renderizada exitosamente');
    this.bindEvents();
  }

  /**
   * Renderiza la información del ciclo actual
   */
  renderCurrentCycleInfo() {
    const cycleInfo = this.calendarService ? this.calendarService.getCurrentCycleInfo() : null;
    
    if (!cycleInfo || cycleInfo.phase === 'Sin datos') {
      return `
        <div class="cycle-info cycle-info--no-data">
          <p>No hay datos del ciclo registrados</p>
          <p>Registra tu primer período para comenzar el seguimiento</p>
        </div>
      `;
    }

    return `
      <div class="cycle-info">
        <div class="cycle-info__main">
          <div class="cycle-info__day">
            <span class="cycle-info__label">Día del ciclo:</span>
            <span class="cycle-info__value">${cycleInfo.cycleDay}</span>
          </div>
          <div class="cycle-info__phase">
            <span class="cycle-info__icon">${cycleInfo.phase.icon}</span>
            <span class="cycle-info__name">${cycleInfo.phase.name}</span>
          </div>
        </div>
        <div class="cycle-info__details">
          <div class="cycle-info__item">
            <span class="cycle-info__label">Fertilidad:</span>
            <span class="cycle-info__value cycle-info__value--${cycleInfo.fertility.level}">${cycleInfo.fertility.level}</span>
          </div>
          <div class="cycle-info__item">
            <span class="cycle-info__label">Próximo período:</span>
            <span class="cycle-info__value">${cycleInfo.daysToNextPeriod} días</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza las estadísticas del mes
   */
  renderMonthStatistics() {
    const stats = this.calendarService ? this.calendarService.getMonthStatistics(this.currentMonth, this.currentYear) : { periodDays: 0, fertileDays: 0, futurePeriodDays: 0 };
    
    return `
      <div class="month-stats__container">
        <h3 class="month-stats__title">Resumen del mes</h3>
        <div class="month-stats__grid">
          <div class="month-stats__item">
            <span class="month-stats__number">${stats.periodDays}</span>
            <span class="month-stats__label">Días de periodo</span>
          </div>
          <div class="month-stats__item">
            <span class="month-stats__number">${stats.fertileDays}</span>
            <span class="month-stats__label">Días fértiles</span>
          </div>
          <div class="month-stats__item">
            <span class="month-stats__number">${stats.futurePeriodDays}</span>
            <span class="month-stats__label">Próximo periodo</span>
          </div>
        </div>
      </div>
    `;
  }

  generateCalendarDays() {
    let calendarHTML = '';
    
    this.calendarDays.forEach(day => {
      let dayClass = 'calendar__day';
      
      if (!day.isCurrentMonth) {
        dayClass += ' calendar__day--other-month';
      }
      
      if (day.selected) {
        dayClass += ' calendar__day--selected';
      }
      
      // Aplicar clases según el estado del ciclo (pero solo si no es hoy)
      if (!day.isToday) {
        // Aplicar clases según el estado
        
        switch (day.state) {
          case 'periodo':
            dayClass += ' calendar__day--period';
            break;
          case 'fertil':
            dayClass += ' calendar__day--fertile';
            break;
          case 'futuro_periodo':
            dayClass += ' calendar__day--future-period';
            break;
          case 'futuro_fertil':
            dayClass += ' calendar__day--future-fertile';
            break;
        }
      }
      
      // El día de hoy siempre tiene prioridad visual
      if (day.isToday) {
        dayClass += ' calendar__day--today';
      }

      calendarHTML += `
        <div class="${dayClass}" data-day="${day.day}" data-date="${day.date}" data-state="${day.state}">
          <span class="calendar__day-number">${day.day}</span>
          ${day.cycleDay ? `<span class="calendar__day-cycle">${day.cycleDay}</span>` : ''}
        </div>
      `;
    });
    
    return calendarHTML;
  }

  getMonthName(month) {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month];
  }

  bindEvents() {
    // Month navigation
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('click', () => {
        this.navigateMonth('previous');
      });
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('click', () => {
        this.navigateMonth('next');
      });
    }

    // Day selection - DESHABILITADA POR AHORA
    // const calendarDays = document.querySelectorAll('.calendar__day');
    // calendarDays.forEach(day => {
    //   day.addEventListener('click', () => {
    //     const dayNumber = parseInt(day.dataset.day);
    //     const date = day.dataset.date;
    //     const state = day.dataset.state;
    //     
    //     if (dayNumber && date) {
    //       this.selectDay(dayNumber, date, state);
    //     }
    //   });
    // });

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
        if (href && href !== '#/calendario') {
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

  /**
   * Navega al mes anterior o siguiente
   */
  navigateMonth(direction) {
    if (direction === 'previous') {
      this.currentMonth--;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }
    } else if (direction === 'next') {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
    }
    
    this.updateCalendarData();
    this.render();
  }

  /**
   * Selecciona un día del calendario
   */
  selectDay(dayNumber, date, state) {
    // Deseleccionar día anterior
    if (this.selectedDay) {
      const previousSelected = document.querySelector('.calendar__day--selected');
      if (previousSelected) {
        previousSelected.classList.remove('calendar__day--selected');
      }
    }
    
    // Seleccionar nuevo día
    this.selectedDay = dayNumber;
    const selectedDayElement = document.querySelector(`[data-day="${dayNumber}"]`);
    if (selectedDayElement) {
      selectedDayElement.classList.add('calendar__day--selected');
    }
    
    this.showDayDetails(date, dayNumber, state);
  }

  showDayDetails(date, dayNumber, state) {
    console.log(`Día seleccionado: ${dayNumber} (${date}) - Estado: ${state}`);
    
    // Aquí se podría mostrar un modal con detalles del día
    // Por ahora solo actualizamos la consola
  }

  // Métodos de utilidad
  isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}

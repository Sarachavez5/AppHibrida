export class CalendarPage {
  constructor() {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.selectedDay = 5; // Día seleccionado según el wireframe
    this.periodDays = [1, 2, 3, 4, 15, 16, 17, 18]; // Días de periodo
    this.fertileDays = [10, 11, 12, 13, 14]; // Días fértiles
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
            <h1 class="app-header__title">Calendario</h1>
            <button class="app-header__profile-btn" aria-label="Perfil">
              <span class="icon">👤</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <!-- Month Navigation -->
            <div class="calendar-nav">
              <button class="calendar-nav__btn" id="prev-month" aria-label="Mes anterior">
                <span class="icon">‹</span>
              </button>
              <h2 class="calendar-nav__title">${this.getMonthName(this.currentMonth)} ${this.currentYear}</h2>
              <button class="calendar-nav__btn" id="next-month" aria-label="Mes siguiente">
                <span class="icon">›</span>
              </button>
            </div>

            <!-- Calendar Grid -->
            <div class="calendar">
              <!-- Days of Week Header -->
              <div class="calendar__header">
                <div class="calendar__day-header">L</div>
                <div class="calendar__day-header">M</div>
                <div class="calendar__day-header">M</div>
                <div class="calendar__day-header">J</div>
                <div class="calendar__day-header">V</div>
                <div class="calendar__day-header">S</div>
                <div class="calendar__day-header">D</div>
              </div>

              <!-- Calendar Days -->
              <div class="calendar__grid">
                ${this.generateCalendarDays()}
              </div>
            </div>

            <!-- Legend -->
            <div class="calendar-legend">
              <div class="calendar-legend__item">
                <div class="calendar-legend__color calendar-legend__color--period"></div>
                <span class="calendar-legend__label">Días de periodo</span>
              </div>
              <div class="calendar-legend__item">
                <div class="calendar-legend__color calendar-legend__color--fertile"></div>
                <span class="calendar-legend__label">Días fértiles</span>
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

  generateCalendarDays() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay() + 1); // Ajustar para que empiece en lunes

    let calendarHTML = '';
    let currentDate = new Date(startDate);

    // Generar 6 semanas (42 días) para cubrir todo el mes
    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        const dayNumber = currentDate.getDate();
        const isCurrentMonth = currentDate.getMonth() === this.currentMonth;
        const isSelected = isCurrentMonth && dayNumber === this.selectedDay;
        const isPeriodDay = this.periodDays.includes(dayNumber);
        const isFertileDay = this.fertileDays.includes(dayNumber);

        let dayClass = 'calendar__day';
        if (!isCurrentMonth) dayClass += ' calendar__day--other-month';
        if (isSelected) dayClass += ' calendar__day--selected';
        if (isPeriodDay) dayClass += ' calendar__day--period';
        if (isFertileDay) dayClass += ' calendar__day--fertile';

        calendarHTML += `
          <div class="${dayClass}" data-day="${dayNumber}" data-date="${currentDate.toISOString().split('T')[0]}">
            <span class="calendar__day-number">${dayNumber}</span>
          </div>
        `;

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

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
        this.currentMonth--;
        if (this.currentMonth < 0) {
          this.currentMonth = 11;
          this.currentYear--;
        }
        this.render();
      });
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('click', () => {
        this.currentMonth++;
        if (this.currentMonth > 11) {
          this.currentMonth = 0;
          this.currentYear++;
        }
        this.render();
      });
    }

    // Day selection
    const calendarDays = document.querySelectorAll('.calendar__day');
    calendarDays.forEach(day => {
      day.addEventListener('click', () => {
        const dayNumber = parseInt(day.dataset.day);
        const date = day.dataset.date;
        
        if (dayNumber && date) {
          this.selectedDay = dayNumber;
          this.showDayDetails(date, dayNumber);
        }
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
        if (href && href !== '/calendario') {
          window.location.hash = `#${href}`;
        }
      });
    });
  }

  showDayDetails(date, dayNumber) {
    // Aquí se podría mostrar un modal con detalles del día
    console.log(`Día seleccionado: ${dayNumber} (${date})`);
    
    // Actualizar la vista para mostrar el día seleccionado
    const allDays = document.querySelectorAll('.calendar__day');
    allDays.forEach(day => day.classList.remove('calendar__day--selected'));
    
    const selectedDayElement = document.querySelector(`[data-day="${dayNumber}"]`);
    if (selectedDayElement) {
      selectedDayElement.classList.add('calendar__day--selected');
    }
  }
}

import './styles/main.scss';
import { Router } from './js/router/Router.js';
import { HomePage } from './js/pages/HomePage.js';
import { CalendarPage } from './js/pages/CalendarPage.js';
import { RegisterPage } from './js/pages/RegisterPage.js';
import { SymptomsPage } from './js/pages/SymptomsPage.js';
import { PeriodPage } from './js/pages/PeriodPage.js';
import { MoodPage } from './js/pages/MoodPage.js';
import { StatsPage } from './js/pages/StatsPage.js';
import { ProfilePage } from './js/pages/ProfilePage.js';
import { EducationPage } from './js/pages/EducationPage.js';
import { LoginPage } from './js/pages/LoginPage.js';
import { SignupPage } from './js/pages/SignupPage.js';
import { authService } from './js/services/AuthService.js';

// Configuración de rutas
const routes = {
  '/': {
    title: 'Mi Ciclo - Inicio',
    handler: () => {
      if (authService.requireAuth()) {
        const homePage = new HomePage();
        homePage.render();
      }
    }
  },
  '/login': {
    title: 'Mi Ciclo - Iniciar Sesión',
    handler: () => {
      if (authService.requireGuest()) {
        const loginPage = new LoginPage();
        loginPage.render();
      }
    }
  },
  '/registro': {
    title: 'Mi Ciclo - Crear Cuenta',
    handler: () => {
      if (authService.requireGuest()) {
        const signupPage = new SignupPage();
        signupPage.render();
      }
    }
  },
  '/calendario': {
    title: 'Mi Ciclo - Calendario',
    handler: () => {
      if (authService.requireAuth()) {
        const calendarPage = new CalendarPage();
        calendarPage.render();
      }
    }
  },
  '/registrar': {
    title: 'Mi Ciclo - Registrar Actividad',
    handler: () => {
      if (authService.requireAuth()) {
        const registerPage = new RegisterPage();
        registerPage.render();
      }
    }
  },
  '/sintomas': {
    title: 'Mi Ciclo - Registrar Síntomas',
    handler: () => {
      if (authService.requireAuth()) {
        const symptomsPage = new SymptomsPage();
        symptomsPage.render();
      }
    }
  },
  '/periodo': {
    title: 'Mi Ciclo - Registrar Período',
    handler: () => {
      if (authService.requireAuth()) {
        const periodPage = new PeriodPage();
        periodPage.render();
      }
    }
  },
  '/estado-animo': {
    title: 'Mi Ciclo - Estado de Ánimo',
    handler: () => {
      if (authService.requireAuth()) {
        const moodPage = new MoodPage();
        moodPage.render();
      }
    }
  },
  '/estadisticas': {
    title: 'Mi Ciclo - Estadísticas',
    handler: () => {
      if (authService.requireAuth()) {
        const statsPage = new StatsPage();
        statsPage.render();
      }
    }
  },
  '/perfil': {
    title: 'Mi Ciclo - Perfil',
    handler: () => {
      if (authService.requireAuth()) {
        const profilePage = new ProfilePage();
        profilePage.render();
      }
    }
  },
  '/educacion': {
    title: 'Mi Ciclo - Educación',
    handler: () => {
      if (authService.requireAuth()) {
        const educationPage = new EducationPage();
        educationPage.render();
      }
    }
  },
  '/404': {
    title: 'Mi Ciclo - Página no encontrada',
    handler: () => {
      document.getElementById('app').innerHTML = `
        <div class="app">
          <header class="app-header">
            <div class="app-header__container">
              <button class="app-header__back-btn" onclick="window.history.back()" aria-label="Volver">
                <span class="icon">‹</span>
              </button>
              <h1 class="app-header__title">Error 404</h1>
            </div>
          </header>
          
          <main class="app__content">
            <div class="app__container">
              <div class="error-page">
                <div class="error-page__icon">😕</div>
                <h2 class="error-page__title">Página no encontrada</h2>
                <p class="error-page__message">La página que buscas no existe o ha sido movida.</p>
                <button class="btn btn--primary" onclick="window.location.hash = '#/'">
                  Volver al inicio
                </button>
              </div>
            </div>
          </main>
        </div>
      `;
    }
  }
};

// Inicializar router
const router = new Router(routes, {
  mode: 'hash'
});

// Agregar estilos para switches
const switchStyles = document.createElement('style');
switchStyles.textContent = `
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .switch__slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
  }
  
  .switch__slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .switch__slider {
    background-color: var(--color-primary);
  }
  
  input:checked + .switch__slider:before {
    transform: translateX(26px);
  }
`;

document.head.appendChild(switchStyles);

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  console.log('Mi Ciclo - Aplicación inicializada');
  
  // Configurar título inicial
  document.title = 'Mi Ciclo - Seguimiento del Ciclo Menstrual';
  
  // Agregar meta description
  const metaDescription = document.createElement('meta');
  metaDescription.name = 'description';
  metaDescription.content = 'Aplicación para el seguimiento del ciclo menstrual, síntomas, estado de ánimo y educación sobre salud femenina.';
  document.head.appendChild(metaDescription);
});

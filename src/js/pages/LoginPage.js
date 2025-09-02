/**
 * Página de inicio de sesión
 */
import { authService } from '../services/AuthService.js';

export class LoginPage {
  constructor() {
    this.email = '';
    this.password = '';
  }

  render() {
    const appContainer = document.getElementById('app');
    
    appContainer.innerHTML = `
      <div class="app">
        <!-- Header -->
        <header class="app-header">
          <div class="app-header__container">
            <h1 class="app-header__title">Iniciar Sesión</h1>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <div class="auth-container">
              <!-- Logo/Brand -->
              <div class="auth-brand">
                <div class="auth-brand__icon">
                  <img src="/logo.png" alt="Ella Logo" class="auth-brand__logo">
                </div>
                <p class="auth-brand__subtitle">Tu compañera de confianza</p>
              </div>

              <!-- Login Form -->
              <form class="auth-form" id="login-form">
                <div class="form-group">
                  <label for="email" class="form-label">Correo electrónico</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    class="form-input" 
                    placeholder="tu@email.com"
                    required
                  >
                </div>

                <div class="form-group">
                  <label for="password" class="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    class="form-input" 
                    placeholder="••••••••"
                    required
                  >
                </div>

                <div class="form-group">
                  <label class="form-checkbox">
                    <input type="checkbox" id="remember-me" name="remember-me">
                    <span class="form-checkbox__mark"></span>
                    <span class="form-checkbox__label">Recordarme</span>
                  </label>
                </div>

                <button type="submit" class="btn btn--primary btn--full">
                  Iniciar Sesión
                </button>
              </form>

              <!-- Divider -->
              <div class="auth-divider">
                <span class="auth-divider__text">o</span>
              </div>

              <!-- Register Link -->
              <div class="auth-footer">
                <p class="auth-footer__text">
                  ¿No tienes una cuenta? 
                  <a href="/registro" class="auth-footer__link">Regístrate aquí</a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }

    // Input events
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        this.email = e.target.value;
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener('input', (e) => {
        this.password = e.target.value;
      });
    }

    // Navigation
    const registerLink = document.querySelector('.auth-footer__link');
    if (registerLink) {
      registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#/registro';
      });
    }
  }

  handleLogin() {
    // Validar campos
    if (!this.email || !this.password) {
      this.showError('Por favor completa todos los campos');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.showError('Por favor ingresa un email válido');
      return;
    }

    // Intentar iniciar sesión usando el servicio de autenticación
    const result = authService.login(this.email, this.password);

    if (result.success) {
      // Mostrar mensaje de éxito
      this.showSuccess('Inicio de sesión exitoso');
      
      // Redirigir al dashboard
      setTimeout(() => {
        window.location.hash = '#/';
      }, 1500);
    } else {
      this.showError(result.error || 'Email o contraseña incorrectos');
    }
  }

  showError(message) {
    import('../components/Toast.js').then(({ Toast }) => {
      Toast.error(message);
    });
  }

  showSuccess(message) {
    import('../components/Toast.js').then(({ Toast }) => {
      Toast.success(message);
    });
  }
}

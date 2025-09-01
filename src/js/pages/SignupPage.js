/**
 * Página de registro de usuarios
 */
import { authService } from '../services/AuthService.js';

export class SignupPage {
  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.birthDate = '';
    this.acceptTerms = false;
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
            <h1 class="app-header__title">Crear Cuenta</h1>
          </div>
        </header>

        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <div class="auth-container">
              <!-- Logo/Brand -->
              <div class="auth-brand">
                <div class="auth-brand__icon">🌸</div>
                <h2 class="auth-brand__title">Únete a Mi Ciclo</h2>
                <p class="auth-brand__subtitle">Comienza tu viaje de autoconocimiento</p>
              </div>

              <!-- Signup Form -->
              <form class="auth-form" id="signup-form">
                <div class="form-group">
                  <label for="name" class="form-label">Nombre completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    class="form-input" 
                    placeholder="Tu nombre completo"
                    required
                  >
                </div>

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
                  <label for="birth-date" class="form-label">Fecha de nacimiento</label>
                  <input 
                    type="date" 
                    id="birth-date" 
                    name="birth-date" 
                    class="form-input"
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
                  <small class="form-help">Mínimo 8 caracteres</small>
                </div>

                <div class="form-group">
                  <label for="confirm-password" class="form-label">Confirmar contraseña</label>
                  <input 
                    type="password" 
                    id="confirm-password" 
                    name="confirm-password" 
                    class="form-input" 
                    placeholder="••••••••"
                    required
                  >
                </div>

                <div class="form-group">
                  <label class="form-checkbox">
                    <input type="checkbox" id="accept-terms" name="accept-terms" required>
                    <span class="form-checkbox__mark"></span>
                    <span class="form-checkbox__label">
                      Acepto los <a href="#" class="form-checkbox__link">términos y condiciones</a>
                    </span>
                  </label>
                </div>

                <button type="submit" class="btn btn--primary btn--full">
                  Crear Cuenta
                </button>
              </form>

              <!-- Divider -->
              <div class="auth-divider">
                <span class="auth-divider__text">o</span>
              </div>

              <!-- Login Link -->
              <div class="auth-footer">
                <p class="auth-footer__text">
                  ¿Ya tienes una cuenta? 
                  <a href="/login" class="auth-footer__link">Inicia sesión aquí</a>
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
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSignup();
      });
    }

    // Input events
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const birthDateInput = document.getElementById('birth-date');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const acceptTermsInput = document.getElementById('accept-terms');

    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        this.name = e.target.value;
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        this.email = e.target.value;
      });
    }

    if (birthDateInput) {
      birthDateInput.addEventListener('change', (e) => {
        this.birthDate = e.target.value;
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener('input', (e) => {
        this.password = e.target.value;
      });
    }

    if (confirmPasswordInput) {
      confirmPasswordInput.addEventListener('input', (e) => {
        this.confirmPassword = e.target.value;
      });
    }

    if (acceptTermsInput) {
      acceptTermsInput.addEventListener('change', (e) => {
        this.acceptTerms = e.target.checked;
      });
    }

    // Back button
    const backBtn = document.querySelector('.app-header__back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.history.back();
      });
    }

    // Navigation
    const loginLink = document.querySelector('.auth-footer__link');
    if (loginLink) {
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#/login';
      });
    }
  }

  handleSignup() {
    // Validar campos requeridos
    if (!this.name || !this.email || !this.password || !this.confirmPassword || !this.birthDate) {
      this.showError('Por favor completa todos los campos');
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.showError('Por favor ingresa un email válido');
      return;
    }

    // Validar contraseña
    if (this.password.length < 8) {
      this.showError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    // Validar confirmación de contraseña
    if (this.password !== this.confirmPassword) {
      this.showError('Las contraseñas no coinciden');
      return;
    }

    // Validar fecha de nacimiento
    const birthDate = new Date(this.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 13) {
      this.showError('Debes tener al menos 13 años para registrarte');
      return;
    }

    // Validar términos y condiciones
    if (!this.acceptTerms) {
      this.showError('Debes aceptar los términos y condiciones');
      return;
    }

    // Intentar registrar usuario usando el servicio de autenticación
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      birthDate: this.birthDate
    };

    const result = authService.register(userData);

    if (result.success) {
      // Mostrar mensaje de éxito
      this.showSuccess('Cuenta creada exitosamente');

      // Redirigir al dashboard
      setTimeout(() => {
        window.location.hash = '#/';
      }, 1500);
    } else {
      this.showError(result.error || 'Error al crear la cuenta');
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

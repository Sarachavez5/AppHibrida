import { Component } from './Component.js';

export class Toast extends Component {
  constructor(element, options = {}) {
    super(element, options);
  }
  
  get defaultOptions() {
    return {
      duration: 5000,
      position: 'top-right',
      type: 'info',
      autoHide: true,
      closeButton: true
    };
  }
  
  bindEvents() {
    // Botón de cerrar
    const closeBtn = this.find('.toast__close');
    if (closeBtn && this.options.closeButton) {
      closeBtn.addEventListener('click', () => this.hide());
    }
    
    // Auto hide
    if (this.options.autoHide && this.options.duration > 0) {
      this.hideTimer = setTimeout(() => {
        this.hide();
      }, this.options.duration);
    }
  }
  
  show() {
    // Crear contenedor de toasts si no existe
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = `toast-container toast-container--${this.options.position}`;
      document.body.appendChild(container);
    }
    
    // Agregar toast al contenedor
    container.appendChild(this.element);
    
    // Mostrar con animación
    requestAnimationFrame(() => {
      this.addClass('show');
    });
    
    this.emit('toast:shown');
  }
  
  hide() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
    
    this.removeClass('show');
    
    // Esperar a que termine la animación
    const handleTransitionEnd = () => {
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      this.off('transitionend', handleTransitionEnd);
      this.emit('toast:hidden');
    };
    
    this.on('transitionend', handleTransitionEnd);
  }
  
  // Métodos estáticos para crear toasts dinámicamente
  static create(message, options = {}) {
    const toastElement = document.createElement('div');
    toastElement.className = `toast toast--${options.type || 'info'}`;
    
    const closeButton = options.closeButton !== false ? 
      '<button class="toast__close" aria-label="Cerrar">×</button>' : '';
    
    toastElement.innerHTML = `
      <div class="toast__header">
        <h4 class="toast__title">${options.title || ''}</h4>
        ${closeButton}
      </div>
      <p class="toast__message">${message}</p>
    `;
    
    const toast = new Toast(toastElement, options);
    toast.show();
    
    return toast;
  }
  
  static success(message, title = 'Éxito') {
    return this.create(message, { title, type: 'success' });
  }
  
  static error(message, title = 'Error') {
    return this.create(message, { title, type: 'error' });
  }
  
  static warning(message, title = 'Advertencia') {
    return this.create(message, { title, type: 'warning' });
  }
  
  static info(message, title = 'Información') {
    return this.create(message, { title, type: 'info' });
  }
}

// Agregar estilos CSS para el contenedor de toasts
const style = document.createElement('style');
style.textContent = `
  .toast-container {
    position: fixed;
    z-index: 1080;
    pointer-events: none;
  }
  
  .toast-container--top-right {
    top: 1rem;
    right: 1rem;
  }
  
  .toast-container--top-left {
    top: 1rem;
    left: 1rem;
  }
  
  .toast-container--bottom-right {
    bottom: 1rem;
    right: 1rem;
  }
  
  .toast-container--bottom-left {
    bottom: 1rem;
    left: 1rem;
  }
  
  .toast-container--top-center {
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .toast-container--bottom-center {
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .toast {
    pointer-events: auto;
    margin-bottom: 0.5rem;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease-in-out;
  }
  
  .toast.show {
    opacity: 1;
    transform: translateY(0);
  }
`;

document.head.appendChild(style);

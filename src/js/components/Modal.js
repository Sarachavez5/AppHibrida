import { Component } from './Component.js';

export class Modal extends Component {
  constructor(element, options = {}) {
    super(element, options);
    this.isDestroyed = false;
  }
  
  get defaultOptions() {
    return {
      backdrop: true,
      keyboard: true,
      focus: true,
      autoFocus: true,
      destroyOnHide: true 
    };
  }
  
    bindEvents() {
    // Cerrar con backdrop
    if (this.options.backdrop) {
      this.on('click', (e) => {
        if (e.target === this.element) {
          this.hide();
        }
      });
    }
    
    // Cerrar con tecla Escape
    if (this.options.keyboard) {
      this.keydownHandler = (e) => {
        if (e.key === 'Escape' && this.isVisible()) {
          this.hide();
        }
      };
      document.addEventListener('keydown', this.keydownHandler);
    }
    
    // Botón de cerrar
    const closeBtn = this.find('.modal__close');
    if (closeBtn) {
      this.closeBtnHandler = () => this.hide();
      closeBtn.addEventListener('click', this.closeBtnHandler);
    }
    
    // Eventos personalizados
    this.on('modal:show', () => this.show());
    this.on('modal:hide', () => this.hide());
  }
  
  show() {
    if (this.isVisible() || this.isDestroyed) return;
    
    // Prevenir scroll del body
    document.body.classList.add('no-scroll');
    
    // Mostrar modal
    this.addClass('active');
    this.element.style.display = 'flex';
    
    // Focus en el modal
    if (this.options.focus) {
      this.element.focus();
    }
    
    // Auto focus en el primer elemento focusable
    if (this.options.autoFocus) {
      const focusableElement = this.element.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElement) {
        focusableElement.focus();
      }
    }
    
    // Emitir evento
    this.emit('modal:shown');
    
    // Trigger CSS transition
    requestAnimationFrame(() => {
      this.addClass('show');
    });
  }
  
  hide() {
    if (!this.isVisible()) return;
    
    // Remover clase show para trigger transition
    this.removeClass('show');
    
    // Esperar a que termine la transición
    const handleTransitionEnd = () => {
      this.removeClass('active');
      this.element.style.display = 'none';
      document.body.classList.remove('no-scroll');
      this.off('transitionend', handleTransitionEnd);
      this.emit('modal:hidden');
    };
    
    this.on('transitionend', handleTransitionEnd);
  }
  
  isVisible() {
    return this.hasClass('active');
  }
  
  // Métodos estáticos para crear modales dinámicamente
  static create(content, options = {}) {
    const modalElement = document.createElement('div');
    modalElement.className = 'modal';
    modalElement.innerHTML = `
      <div class="modal__backdrop"></div>
      <div class="modal__content">
        <div class="modal__header">
          <h3 class="modal__title">${options.title || ''}</h3>
          <button class="modal__close" aria-label="Cerrar">×</button>
        </div>
        <div class="modal__body">
          ${content}
        </div>
        ${options.footer ? `<div class="modal__footer">${options.footer}</div>` : ''}
      </div>
    `;
    
    document.body.appendChild(modalElement);
    
    const modal = new Modal(modalElement, options);
    
    // Auto show
    if (options.autoShow !== false) {
      modal.show();
    }
    
    return modal;
  }
  
  static alert(message, title = 'Alerta') {
    return this.create(message, {
      title,
      footer: '<button class="btn btn--primary">Aceptar</button>',
      autoShow: true
    });
  }
  
  static confirm(message, title = 'Confirmar') {
    return new Promise((resolve) => {
      const modal = this.create(message, {
        title,
        footer: `
          <button class="btn btn--secondary" data-action="cancel">Cancelar</button>
          <button class="btn btn--primary" data-action="confirm">Confirmar</button>
        `,
        autoShow: true
      });
      
      modal.on('click', (e) => {
        if (e.target.dataset.action === 'confirm') {
          modal.hide();
          resolve(true);
        } else if (e.target.dataset.action === 'cancel') {
          modal.hide();
          resolve(false);
        }
      });
    });
  }
}

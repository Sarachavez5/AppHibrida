/**
 * Clase base para componentes reutilizables
 */
export class Component {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.options = { ...this.defaultOptions, ...options };
    this.isInitialized = false;
    
    if (this.element) {
      this.init();
    }
  }
  
  get defaultOptions() {
    return {};
  }
  
  init() {
    if (this.isInitialized) return;
    
    this.bindEvents();
    this.isInitialized = true;
  }
  
  bindEvents() {
    // Override en subclases
  }
  
  destroy() {
    this.isInitialized = false;
  }
  
  // Utilidades
  emit(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      cancelable: true
    });
    this.element.dispatchEvent(event);
  }
  
  on(eventName, callback) {
    this.element.addEventListener(eventName, callback);
  }
  
  off(eventName, callback) {
    this.element.removeEventListener(eventName, callback);
  }
  
  // DOM utilities
  find(selector) {
    return this.element.querySelector(selector);
  }
  
  findAll(selector) {
    return this.element.querySelectorAll(selector);
  }
  
  addClass(className) {
    this.element.classList.add(className);
  }
  
  removeClass(className) {
    this.element.classList.remove(className);
  }
  
  toggleClass(className) {
    this.element.classList.toggle(className);
  }
  
  hasClass(className) {
    return this.element.classList.contains(className);
  }
  
  setAttribute(name, value) {
    this.element.setAttribute(name, value);
  }
  
  getAttribute(name) {
    return this.element.getAttribute(name);
  }
  
  removeAttribute(name) {
    this.element.removeAttribute(name);
  }
}

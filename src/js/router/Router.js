/**
 * Router para Single Page Application
 */
export class Router {
  constructor(routes = {}, options = {}) {
    this.routes = routes;
    this.options = {
      root: '/',
      mode: 'history', // 'history' o 'hash'
      ...options
    };
    
    this.currentRoute = null;
    this.history = [];
    this.maxHistory = 50;
    
    this.init();
  }
  
  init() {
    // Escuchar cambios de URL
    if (this.options.mode === 'history') {
      window.addEventListener('popstate', (e) => {
        this.handleRouteChange();
      });
    } else {
      window.addEventListener('hashchange', (e) => {
        this.handleRouteChange();
      });
    }
    
    // Manejar clicks en enlaces
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-route]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
    
    // Navegar a la ruta inicial
    this.handleRouteChange();
  }
  
  handleRouteChange() {
    const path = this.getCurrentPath();
    const route = this.findRoute(path);
    
    if (route) {
      this.navigateToRoute(route, path);
    } else {
      this.handleNotFound();
    }
  }
  
  getCurrentPath() {
    if (this.options.mode === 'history') {
      return window.location.pathname;
    } else {
      return window.location.hash.slice(1) || '/';
    }
  }
  
  findRoute(path) {
    // Buscar ruta exacta
    if (this.routes[path]) {
      return { path, ...this.routes[path] };
    }
    
    // Buscar rutas con parámetros
    for (const routePath in this.routes) {
      const route = this.routes[routePath];
      const params = this.matchRoute(routePath, path);
      
      if (params) {
        return { path: routePath, params, ...route };
      }
    }
    
    return null;
  }
  
  matchRoute(routePath, currentPath) {
    // Convertir ruta a regex
    const regex = routePath
      .replace(/:[^/]+/g, '([^/]+)') // Parámetros dinámicos
      .replace(/\*/g, '.*'); // Wildcards
    
    const match = currentPath.match(new RegExp(`^${regex}$`));
    
    if (match) {
      const params = {};
      const paramNames = routePath.match(/:[^/]+/g) || [];
      
      paramNames.forEach((param, index) => {
        const name = param.slice(1); // Remover ':'
        params[name] = match[index + 1];
      });
      
      return params;
    }
    
    return null;
  }
  
  navigateToRoute(route, path) {
    // Actualizar historial
    this.addToHistory(path);
    
    // Emitir evento antes del cambio
    this.emit('route:before', { route, path });
    
    // Actualizar URL sin recargar
    if (this.options.mode === 'history') {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
    } else {
      if (window.location.hash !== `#${path}`) {
        window.location.hash = path;
      }
    }
    
    // Ejecutar callback de la ruta
    if (typeof route.handler === 'function') {
      route.handler(route.params || {});
    }
    
    // Actualizar estado
    this.currentRoute = route;
    
    // Emitir evento después del cambio
    this.emit('route:after', { route, path });
    
    // Actualizar título de la página
    if (route.title) {
      document.title = route.title;
    }
  }
  
  handleNotFound() {
    const notFoundRoute = this.routes['*'] || this.routes['/404'];
    
    if (notFoundRoute && typeof notFoundRoute.handler === 'function') {
      notFoundRoute.handler();
    } else {
      console.error('Ruta no encontrada:', this.getCurrentPath());
    }
  }
  
  navigate(path, replace = false) {
    if (this.options.mode === 'history') {
      if (replace) {
        window.history.replaceState({}, '', path);
      } else {
        window.history.pushState({}, '', path);
      }
    } else {
      if (replace) {
        window.location.replace(`#${path}`);
      } else {
        window.location.hash = path;
      }
    }
    
    this.handleRouteChange();
  }
  
  goBack() {
    if (this.history.length > 1) {
      this.history.pop(); // Remover ruta actual
      const previousPath = this.history[this.history.length - 1];
      this.navigate(previousPath, true);
    } else {
      window.history.back();
    }
  }
  
  goForward() {
    window.history.forward();
  }
  
  addToHistory(path) {
    this.history.push(path);
    
    // Limitar tamaño del historial
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }
  
  // Eventos
  emit(eventName, data) {
    const event = new CustomEvent(eventName, {
      detail: data,
      bubbles: true
    });
    document.dispatchEvent(event);
  }
  
  on(eventName, callback) {
    document.addEventListener(eventName, (e) => {
      callback(e.detail);
    });
  }
  
  off(eventName, callback) {
    document.removeEventListener(eventName, callback);
  }
  
  // Utilidades
  getCurrentRoute() {
    return this.currentRoute;
  }
  
  getHistory() {
    return [...this.history];
  }
  
  clearHistory() {
    this.history = [];
  }
}

// Router global
window.Router = Router;

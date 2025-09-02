/**
 * Servicio de autenticación
 */
export class AuthService {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.init();
  }

  init() {
    // Verificar si hay una sesión activa
    this.checkSession();
  }

  checkSession() {
    const session = localStorage.getItem('currentSession');
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        this.currentUser = sessionData;
        this.isAuthenticated = true;
        return true;
      } catch (error) {
        console.error('Error al parsear sesión:', error);
        this.logout();
        return false;
      }
    }
    return false;
  }

  login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const session = {
        userId: user.id,
        email: user.email,
        name: user.name,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('currentSession', JSON.stringify(session));
      this.currentUser = session;
      this.isAuthenticated = true;
      
      return { success: true, user: session };
    }
    
    return { success: false, error: 'Credenciales inválidas' };
  }

  register(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar si el email ya existe
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'El email ya está registrado' };
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
      profile: {
        cycleLength: 28,
        periodLength: 5,
        lastPeriod: null,
        notifications: true,
        ...userData.profile
      }
    };

    // Guardar usuario
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Crear sesión automáticamente
    const session = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('currentSession', JSON.stringify(session));
    this.currentUser = session;
    this.isAuthenticated = true;

    return { success: true, user: session };
  }

  logout() {
    localStorage.removeItem('currentSession');
    this.currentUser = null;
    this.isAuthenticated = false;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return this.isAuthenticated && this.currentUser !== null;
  }

  updateProfile(profileData) {
    if (!this.isLoggedIn()) {
      return { success: false, error: 'No hay sesión activa' };
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === this.currentUser.userId);

    if (userIndex !== -1) {
      users[userIndex].profile = {
        ...users[userIndex].profile,
        ...profileData
      };
      
      localStorage.setItem('users', JSON.stringify(users));
      return { success: true, profile: users[userIndex].profile };
    }

    return { success: false, error: 'Usuario no encontrado' };
  }

  getUserProfile() {
    if (!this.isLoggedIn()) {
      return null;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === this.currentUser.userId);
    
    return user ? user.profile : null;
  }

  // Método para verificar si el usuario debe ser redirigido al login
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.hash = '#/login';
      return false;
    }
    return true;
  }

  // Método para verificar si el usuario ya está autenticado y redirigir al dashboard
  requireGuest() {
    if (this.isLoggedIn()) {
      window.location.hash = '#/';
      return false;
    }
    return true;
  }
}

// Instancia global del servicio de autenticación
export const authService = new AuthService();

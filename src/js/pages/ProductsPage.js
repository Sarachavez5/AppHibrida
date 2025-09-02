/**
 * Página de productos
 */
export class ProductsPage {
  constructor() {
    this.container = document.getElementById('app');
    this.products = [
      {
        id: 1,
        name: 'Producto Premium',
        description: 'Descripción del producto premium con características especiales.',
        price: 99.99,
        image: 'https://via.placeholder.com/300x200/007AFF/FFFFFF?text=Producto+1',
        category: 'premium',
        rating: 4.8
      },
      {
        id: 2,
        name: 'Producto Estándar',
        description: 'Producto estándar con buena relación calidad-precio.',
        price: 49.99,
        image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Producto+2',
        category: 'standard',
        rating: 4.5
      },
      {
        id: 3,
        name: 'Producto Básico',
        description: 'Producto básico ideal para comenzar.',
        price: 29.99,
        image: 'https://via.placeholder.com/300x200/28A745/FFFFFF?text=Producto+3',
        category: 'basic',
        rating: 4.2
      },
      {
        id: 4,
        name: 'Producto Avanzado',
        description: 'Producto avanzado con funcionalidades premium.',
        price: 149.99,
        image: 'https://via.placeholder.com/300x200/DC3545/FFFFFF?text=Producto+4',
        category: 'advanced',
        rating: 4.9
      }
    ];
  }
  
  render() {
    this.container.innerHTML = `
      <div class="app">
        <!-- Header/Navbar -->
        <nav class="navbar">
          <div class="navbar__brand">App Híbrida</div>
          <div class="navbar__menu">
            <a href="/" class="navbar__item">Inicio</a>
            <a href="/productos" class="navbar__item active">Productos</a>
            <a href="/perfil" class="navbar__item">Perfil</a>
          </div>
          <button class="navbar__toggle" id="mobile-menu-toggle">☰</button>
        </nav>
        
        <!-- Mobile Menu -->
        <div class="navbar-mobile" id="mobile-menu">
          <div class="navbar-mobile__header">
            <div class="navbar__brand">App Híbrida</div>
            <button class="navbar-mobile__close" id="mobile-menu-close">×</button>
          </div>
          <div class="navbar-mobile__menu">
            <a href="/" class="navbar-mobile__item">Inicio</a>
            <a href="/productos" class="navbar-mobile__item active">Productos</a>
            <a href="/perfil" class="navbar-mobile__item">Perfil</a>
          </div>
        </div>
        
        <!-- Main Content -->
        <main class="app__content">
          <div class="app__container">
            <!-- Page Header -->
            <div class="page__header">
              <h1 class="page__title">Nuestros Productos</h1>
              <p class="page__subtitle">Descubre nuestra colección de productos de alta calidad</p>
            </div>
            
            <!-- Filters -->
            <section class="section">
              <div class="card">
                <div class="card__header">
                  <h3 class="card__title">Filtros</h3>
                </div>
                <div class="card__content">
                  <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="btn btn--primary" data-filter="all">Todos</button>
                    <button class="btn btn--secondary" data-filter="premium">Premium</button>
                    <button class="btn btn--secondary" data-filter="standard">Estándar</button>
                    <button class="btn btn--secondary" data-filter="basic">Básico</button>
                    <button class="btn btn--secondary" data-filter="advanced">Avanzado</button>
                  </div>
                </div>
              </div>
            </section>
            
            <!-- Products Grid -->
            <section class="section">
              <div class="grid grid--2" id="products-grid">
                ${this.products.map(product => this.renderProduct(product)).join('')}
              </div>
            </section>
            
            <!-- Load More -->
            <section class="section text-center">
              <button class="btn btn--primary btn--large" id="load-more-btn">Cargar Más Productos</button>
            </section>
          </div>
        </main>
        
        <!-- Bottom Navigation -->
        <nav class="bottom-nav">
          <ul class="bottom-nav__list">
            <li>
              <a href="/" class="bottom-nav__item">
                <div class="bottom-nav__icon">🏠</div>
                <div class="bottom-nav__label">Inicio</div>
              </a>
            </li>
            <li>
              <a href="/productos" class="bottom-nav__item active">
                <div class="bottom-nav__icon">📦</div>
                <div class="bottom-nav__label">Productos</div>
              </a>
            </li>
            <li>
              <a href="/favoritos" class="bottom-nav__item">
                <div class="bottom-nav__icon">❤️</div>
                <div class="bottom-nav__label">Favoritos</div>
              </a>
            </li>
            <li>
              <a href="/perfil" class="bottom-nav__item">
                <div class="bottom-nav__icon">👤</div>
                <div class="bottom-nav__label">Perfil</div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    `;
    
    this.bindEvents();
  }
  
  renderProduct(product) {
    return `
      <div class="card card--interactive" data-product-id="${product.id}" data-category="${product.category}">
        <div class="card__header">
          <h3 class="card__title">${product.name}</h3>
          <div class="badge badge--${this.getBadgeType(product.category)}">${product.category}</div>
        </div>
        <div class="card__content">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
          <p>${product.description}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
            <div>
              <span style="font-size: 1.5rem; font-weight: bold; color: var(--color-primary);">$${product.price}</span>
              <div style="display: flex; align-items: center; gap: 0.25rem; margin-top: 0.25rem;">
                <span style="color: #FFC107;">★</span>
                <span style="font-size: 0.875rem; color: var(--color-text-secondary);">${product.rating}</span>
              </div>
            </div>
            <button class="btn btn--primary" data-action="add-to-cart" data-product-id="${product.id}">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    `;
  }
  
  getBadgeType(category) {
    const types = {
      premium: 'primary',
      standard: 'info',
      basic: 'success',
      advanced: 'warning'
    };
    return types[category] || 'secondary';
  }
  
  bindEvents() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
      });
    }
    
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        this.filterProducts(filter);
        
        // Update active button
        filterButtons.forEach(btn => {
          btn.classList.remove('btn--primary');
          btn.classList.add('btn--secondary');
        });
        e.target.classList.remove('btn--secondary');
        e.target.classList.add('btn--primary');
      });
    });
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('[data-action="add-to-cart"]');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        this.addToCart(productId);
      });
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.loadMoreProducts();
      });
    }
    
    // Product card clicks
    const productCards = document.querySelectorAll('[data-product-id]');
    productCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't trigger if clicking on button
        if (e.target.closest('[data-action]')) return;
        
        const productId = card.dataset.productId;
        this.showProductDetails(productId);
      });
    });
  }
  
  filterProducts(category) {
    const products = document.querySelectorAll('[data-product-id]');
    
    products.forEach(product => {
      if (category === 'all' || product.dataset.category === category) {
        product.style.display = 'block';
        product.classList.add('fade-in');
      } else {
        product.style.display = 'none';
      }
    });
  }
  
  addToCart(productId) {
    const product = this.products.find(p => p.id == productId);
    
    if (product) {
      // Importar Toast dinámicamente
      import('../components/Toast.js').then(({ Toast }) => {
        Toast.success(`${product.name} agregado al carrito`);
      });
      
      // Aquí podrías agregar lógica para el carrito
      console.log('Producto agregado al carrito:', product);
    }
  }
  
  showProductDetails(productId) {
    const product = this.products.find(p => p.id == productId);
    
    if (product) {
      import('../components/Modal.js').then(({ Modal }) => {
        Modal.create(`
          <div style="text-align: center;">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; max-width: 400px; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 1rem 0;">
              <span style="font-size: 1.5rem; font-weight: bold; color: var(--color-primary);">$${product.price}</span>
              <div style="display: flex; align-items: center; gap: 0.25rem;">
                <span style="color: #FFC107;">★</span>
                <span>${product.rating}</span>
              </div>
            </div>
            <p><strong>Categoría:</strong> ${product.category}</p>
          </div>
        `, {
          title: product.name,
          footer: `
            <button class="btn btn--secondary" data-action="close">Cerrar</button>
            <button class="btn btn--primary" data-action="add-to-cart" data-product-id="${product.id}">Agregar al Carrito</button>
          `
        });
      });
    }
  }
  
  loadMoreProducts() {
    // Simular carga de más productos
    const loadMoreBtn = document.getElementById('load-more-btn');
    loadMoreBtn.textContent = 'Cargando...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
      // Aquí agregarías más productos
      import('../components/Toast.js').then(({ Toast }) => {
        Toast.info('No hay más productos disponibles por el momento');
      });
      
      loadMoreBtn.textContent = 'Cargar Más Productos';
      loadMoreBtn.disabled = false;
    }, 2000);
  }
  
  destroy() {
    // Cleanup si es necesario
  }
}

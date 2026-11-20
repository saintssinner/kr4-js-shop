// Ищем элементы на странице
const productsContainer = document.querySelector('[data-products-container]');
const searchInput = document.querySelector('#catalog-search');
const categoryFilter = document.querySelector('#category-filter');
const sortSelect = document.querySelector('#sort-select');
const catalogCount = document.querySelector('.catalog-count');
const catalogEmpty = document.querySelector('.catalog-empty');

// Состояние каталога
const catalogState = {
  query: '',
  category: 'all',
  sort: 'default'
};

// Функции обработки
function searchProducts(products, query) {
  const q = query.trim().toLowerCase();
  if (q === '') return products;
  return products.filter(p => p.title.toLowerCase().includes(q));
}

function filterProductsByCategory(products, category) {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

function sortProducts(products, sortType) {
  const copy = [...products];
  if (sortType === 'price-asc') return copy.sort((a, b) => a.price - b.price);
  if (sortType === 'price-desc') return copy.sort((a, b) => b.price - a.price);
  if (sortType === 'title-asc') return copy.sort((a, b) => a.title.localeCompare(b.title));
  return copy;
}

function formatPrice(price) {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

// Создание карточки
function createProductCard(product) {
  const card = document.createElement('article');
  card.classList.add('product-card');

  const img = document.createElement('img');
  // Временно ставим заглушку, если картинок нет
  img.src = `images/product-${product.id}-640.jpg`; 
  img.alt = product.title;
  img.classList.add('product-card__image');
  img.loading = 'lazy';

  const body = document.createElement('div');
  body.classList.add('product-card__body');

  const title = document.createElement('h3');
  title.classList.add('product-card__title');
  title.textContent = product.title;

  const desc = document.createElement('p');
  desc.classList.add('product-card__description');
  desc.textContent = product.isAvailable ? 'В наличии' : 'Нет в наличии';

  const footer = document.createElement('div');
  footer.classList.add('product-card__footer');

  const price = document.createElement('span');
  price.classList.add('price');
  price.textContent = formatPrice(product.price);

  const btn = document.createElement('button');
  btn.classList.add('btn', 'btn--ghost', 'btn--small');
  btn.type = 'button';
  btn.textContent = 'В корзину';
  btn.dataset.action = 'add-to-cart';
  btn.dataset.productId = product.id;
  if (!product.isAvailable) {
    btn.disabled = true;
    btn.textContent = 'Нет в наличии';
  }

  footer.append(price, btn);
  body.append(title, desc, footer);
  card.append(img, body);

  return card;
}

// Вывод на страницу
function renderProducts(productsToRender) {
  productsContainer.textContent = ''; // Очищаем контейнер

  if (catalogCount) {
    catalogCount.textContent = `Найдено товаров: ${productsToRender.length}`;
  }
  if (catalogEmpty) {
    catalogEmpty.hidden = productsToRender.length > 0;
  }

  productsToRender.forEach(product => {
    productsContainer.append(createProductCard(product));
  });
}

// Обновление каталога
function updateCatalog() {
  let result = [...products];
  result = searchProducts(result, catalogState.query);
  result = filterProductsByCategory(result, catalogState.category);
  result = sortProducts(result, catalogState.sort);
  renderProducts(result);
}

// Слушатели событий
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    catalogState.query = e.target.value;
    updateCatalog();
  });
}
if (categoryFilter) {
  categoryFilter.addEventListener('change', (e) => {
    catalogState.category = e.target.value;
    updateCatalog();
  });
}
if (sortSelect) {
  sortSelect.addEventListener('change', (e) => {
    catalogState.sort = e.target.value;
    updateCatalog();
  });
}

// Первичный рендер при загрузке
if (productsContainer) {
  updateCatalog();
}
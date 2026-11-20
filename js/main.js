console.log('Файл main.js подключён');

// Функции из ПЗ №15
function formatPrice(price) {
  return `${price} руб.`;
}

function calculateDiscount(price, discountPercent) {
  return price * discountPercent / 100;
}

function calculateFinalPrice(price, discountPercent) {
  return price - calculateDiscount(price, discountPercent);
}

// ФУНКЦИИ ИЗ ПЗ №16
// 1. Поиск по названию
function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === '') return products;
  return products.filter((product) => product.title.toLowerCase().includes(normalizedQuery));
}

// 2. Фильтрация по категории
function filterProductsByCategory(products, category) {
  if (category === 'all') return products;
  return products.filter((product) => product.category === category);
}

// 3. Фильтрация по наличию
function filterAvailableProducts(products) {
  return products.filter((product) => product.isAvailable);
}

// 4. Сортировка по цене
function sortProductsByPrice(products, direction = 'asc') {
  const productsCopy = [...products];
  if (direction === 'desc') {
    return productsCopy.sort((a, b) => b.price - a.price);
  }
  return productsCopy.sort((a, b) => a.price - b.price);
}

// 5. Подсчет товаров в наличии
function countAvailableProducts(products) {
  return products.filter((product) => product.isAvailable).length;
}

// 6. Общая стоимость
function calculateTotalPrice(products) {
  return products.reduce((sum, product) => sum + product.price, 0);
}

// 7. Средняя цена
function calculateAveragePrice(products) {
  if (products.length === 0) return 0;
  return calculateTotalPrice(products) / products.length;
}

// ВЫВОД В КОНСОЛЬ (для проверки)
console.log('Все товары:', products);
console.log('Поиск "тетради":', searchProducts(products, 'тетради'));
console.log('Категория "tech":', filterProductsByCategory(products, 'tech'));
console.log('В наличии:', filterAvailableProducts(products));
console.log('Сортировка по цене (возр):', sortProductsByPrice(products, 'asc'));
console.log('Сортировка по цене (убыв):', sortProductsByPrice(products, 'desc'));
console.log('Количество в наличии:', countAvailableProducts(products));
console.log('Общая стоимость:', calculateTotalPrice(products));
console.log('Средняя цена:', calculateAveragePrice(products));

// ВЫВОД НА СТРАНИЦУ (из ПЗ 16)
const summaryTotal = document.getElementById('summary-total');
const summaryAvailable = document.getElementById('summary-available');
const summaryAverage = document.getElementById('summary-average');

if (summaryTotal) {
  summaryTotal.textContent = `Всего товаров: ${products.length}`;
}
if (summaryAvailable) {
  summaryAvailable.textContent = `В наличии: ${countAvailableProducts(products)}`;
}
if (summaryAverage) {
  summaryAverage.textContent = `Средняя цена: ${calculateAveragePrice(products).toFixed(2)} ₽`;
}
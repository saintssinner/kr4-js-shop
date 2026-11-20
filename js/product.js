// Ищем элементы на странице товара
const productTitle = document.querySelector('.js-product-title');
const productPrice = document.querySelector('.js-product-price');
const productStatus = document.querySelector('.js-product-status');
const productImage = document.querySelector('.js-product-image');
const productBreadcrumb = document.querySelector('.js-product-breadcrumb');

if (productTitle) {
  // Получаем ID из адресной строки (например, product.html?id=3)
  const urlParams = new URLSearchParams(window.location.search);
  const productId = Number(urlParams.get('id')) || 1; // Если id нет, показываем первый товар

  // Ищем товар в массиве
  const currentProduct = products.find(p => p.id === productId);

  if (currentProduct) {
    document.title = `${currentProduct.title} — Зачётка`;
    
    productTitle.textContent = currentProduct.title;
    productPrice.textContent = `${currentProduct.price.toLocaleString('ru-RU')} ₽`;
    
    if (productBreadcrumb) {
      productBreadcrumb.textContent = currentProduct.title;
    }

    if (productImage) {
      productImage.src = `images/product-${currentProduct.id}-640.jpg`;
      productImage.alt = currentProduct.title;
    }

    if (productStatus) {
      if (currentProduct.isAvailable) {
        productStatus.textContent = 'В наличии';
        productStatus.style.color = 'green';
      } else {
        productStatus.textContent = 'Нет в наличии';
        productStatus.style.color = 'red';
      }
    }
  } else {
    productTitle.textContent = 'Товар не найден';
    productPrice.textContent = '';
  }
}
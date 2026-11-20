// Ищем элементы в шапке (добавим их чуть позже в HTML)
const cartCountBadge = document.querySelector('.cart-count');
const cartDialog = document.getElementById('cart-dialog');
const cartList = document.querySelector('.cart-list');
const cartTotalPrice = document.querySelector('.cart-total-price');

// Загружаем корзину из localStorage или создаем пустую
let cart = JSON.parse(localStorage.getItem('zachetka-cart')) || [];

// Функция сохранения
function saveCart() {
  localStorage.setItem('zachetka-cart', JSON.stringify(cart));
  updateCartUI();
}

// Обновление интерфейса корзины
function updateCartUI() {
  // 1. Обновляем счетчик в шапке
  if (cartCountBadge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadge.textContent = totalItems;
    cartCountBadge.hidden = totalItems === 0;
  }

  // 2. Если открыто окно корзины, перерисовываем список
  if (cartList) {
    cartList.textContent = '';
    
    if (cart.length === 0) {
      cartList.innerHTML = '<p>Ваша корзина пуста.</p>';
      if (cartTotalPrice) cartTotalPrice.textContent = '0 ₽';
      return;
    }

    let total = 0;
    
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      
      const itemEl = document.createElement('div');
      itemEl.classList.add('cart-item');
      itemEl.style.display = 'flex';
      itemEl.style.justifyContent = 'space-between';
      itemEl.style.alignItems = 'center';
      itemEl.style.marginBottom = '12px';
      itemEl.style.paddingBottom = '12px';
      itemEl.style.borderBottom = '1px solid #ddd';

      const info = document.createElement('div');
      info.innerHTML = `<strong>${item.title}</strong><br>${item.price} ₽ × ${item.quantity}`;
      
      const actions = document.createElement('div');
      const btnMinus = document.createElement('button');
      btnMinus.textContent = '-';
      btnMinus.className = 'btn btn--ghost btn--small';
      btnMinus.onclick = () => changeQuantity(index, -1);
      
      const btnPlus = document.createElement('button');
      btnPlus.textContent = '+';
      btnPlus.className = 'btn btn--ghost btn--small';
      btnPlus.onclick = () => changeQuantity(index, 1);

      const btnDel = document.createElement('button');
      btnDel.textContent = 'Удалить';
      btnDel.className = 'btn btn--ghost btn--small';
      btnDel.style.color = 'red';
      btnDel.onclick = () => removeFromCart(index);

      actions.append(btnMinus, btnPlus, btnDel);
      itemEl.append(info, actions);
      cartList.append(itemEl);
    });

    if (cartTotalPrice) {
      cartTotalPrice.textContent = `${total.toLocaleString('ru-RU')} ₽`;
    }
  }
}

// Добавление в корзину
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCart();
  if (cartDialog) {
    cartDialog.showModal(); // Показываем корзину при добавлении
  }
}

// Изменение количества
function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
}

// Удаление
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

// Слушатель кнопок "В корзину" (делегирование)
document.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-action="add-to-cart"]');
  if (!btn) return;
  
  const productId = Number(btn.dataset.productId);
  const product = products.find(p => p.id === productId);
  
  if (product) {
    addToCart(product);
  }
});

// Обработчик закрытия корзины
document.addEventListener('click', (event) => {
  if (event.target.closest('[data-cart-close]')) {
    if (cartDialog) cartDialog.close();
  }
});

// Первичная инициализация при загрузке
if (cartList) updateCartUI();
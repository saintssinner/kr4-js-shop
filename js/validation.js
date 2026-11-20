const orderForm = document.querySelector('.order-form.js-validate'); // Дадим форме класс js-validate

if (orderForm) {
  const nameInput = orderForm.querySelector('#order-name');
  const emailInput = orderForm.querySelector('#order-email');
  const phoneInput = orderForm.querySelector('#order-phone');
  
  const formMessage = document.createElement('p');
  formMessage.className = 'form-message';
  formMessage.setAttribute('aria-live', 'polite');
  orderForm.append(formMessage);

  function showError(input, message) {
    input.setAttribute('aria-invalid', 'true');
    input.style.borderColor = 'red';
    formMessage.textContent = message;
    formMessage.style.color = 'red';
  }

  function clearErrors() {
    [nameInput, emailInput, phoneInput].forEach(i => {
      if (i) {
        i.removeAttribute('aria-invalid');
        i.style.borderColor = '';
      }
    });
    formMessage.textContent = '';
  }

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();
    let isValid = true;

    if (nameInput && nameInput.value.trim().length < 2) {
      showError(nameInput, 'Введите имя (минимум 2 символа).');
      isValid = false;
    }

    if (emailInput) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'Введите корректный e-mail.');
        isValid = false;
      }
    }

    if (phoneInput) {
      const digits = phoneInput.value.replace(/\D/g, '');
      if (digits.length !== 11) {
        showError(phoneInput, 'Введите корректный номер (11 цифр).');
        isValid = false;
      }
    }

    if (!isValid) return;

    formMessage.textContent = 'Форма прошла учебную проверку. Данные не отправлены.';
    formMessage.style.color = 'green';
    orderForm.reset();
  });
}
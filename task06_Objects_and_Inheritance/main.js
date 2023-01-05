const cards = Array.from(document.querySelectorAll('.form__top-layer')),
      ingredients = Array.from(document.querySelectorAll('.current-pizza-item')),
      totalOrder = document.querySelector('.total-order'),
      totalWeight = document.querySelector('.total-weight'),
      totalCalories = document.querySelector('.total-calories'),
      totalAmount = document.querySelector('.total-amount'),
      orderBtn = document.querySelector('.form__btn-submit'),
      modalWindow = document.querySelector('.modal-window'),
      modalWindowContent = document.querySelector('.modal-window__content'),
      modalWindowText = document.querySelector('.modal-window__description'),
      modalBtn = document.querySelector('.modal-window__btn');
      

class PizzeriaConstructor {
  constructor(totalOrder, totalWeight, totalCalories, totalAmount) {
    this.totalOrder = totalOrder,
    this.totalWeight = totalWeight,
    this.totalCalories = totalCalories,
    this.totalAmount = totalAmount
  }

  clear() {
    this.totalOrder.innerText = 'пуст';
    this.totalWeight.innerText = '0 г.';
    this.totalCalories.innerText = '0 Ккал.';
    this.totalAmount.innerText = '0 руб.'
    cards.forEach(card => {
      card.classList.remove('active');
    });
    ingredients.forEach(i => {
      i.classList.remove('active');
    });
  }

  addIngredient(e) {
    const indexCard = cards.indexOf(e.target);
    if(indexCard < 3) {
      const cardsTypeDough = document.querySelectorAll('[data-name$="тесто"]');
      cardsTypeDough.forEach(card => {
        card.classList.remove('active');
      });
    }
    if(indexCard > 2 && indexCard < 6) {
      const cardsTypeSize = document.querySelectorAll('[data-name$="см"]');
      cardsTypeSize.forEach(card => {
        card.classList.remove('active');
      });
    }
    ingredients[indexCard].classList.toggle('active');
    e.target.classList.toggle('active');
  }

  calculate() {
    let localResultWeight = 0;
    let localResultCalories = 0;
    let localResultAmount = 0;
    const weightItem = document.querySelectorAll('.form__top-layer.active ~ .weight');
    weightItem.forEach(weight => {
      localResultWeight += parseFloat(weight.innerText);
      localResultCalories += parseFloat(weight.dataset.value);
      localResultAmount += parseFloat(weight.children[0].innerText) * 100;
    });

    if(localResultAmount >= 2500 && localResultAmount < 3000) localResultAmount = localResultAmount - (localResultAmount * 0.1);
    if(localResultAmount >= 3000 && localResultAmount < 3500) localResultAmount = localResultAmount - (localResultAmount * 0.15);
    if(localResultAmount >= 3500) localResultAmount = localResultAmount - (localResultAmount * 0.2);

    this.totalWeight.innerText = `${localResultWeight} г.`;
    this.totalCalories.innerText = `${localResultCalories} Ккал.`;
    this.totalAmount.innerText = `${localResultAmount / 100} руб.`;
  }

  addTextResult() {
    this.totalOrder.innerText = '';
    let str = '';
    cards.forEach(card => {
      if(card.classList.contains('active')) str += `${card.dataset.name}, `;
    });
    this.totalOrder.innerText = str.slice(0, -2);
  }

  submitOrder(e) {
    e.preventDefault();
    if( this.isValid()) {
      const data = {
        order: this.totalOrder.innerText.split(','),
        weight: this.totalWeight.innerText,
        calories: this.totalCalories.innerText,
        amount: this.totalAmount.innerText
      };
      this.sendData('https://jsonplaceholder.typicode.com/posts', data);
      modalWindow.classList.remove('none');
      modalWindowText.innerText = 'Ваша пицца заказана!';
      this.clear()
    }
  }

  isValid() {
    const cardsTypeDough = document.querySelectorAll('[data-name$="тесто"]'),
          cardsTypeSize = document.querySelectorAll('[data-name$="см"]');

    let localValidDough = false,
        localValidSize = false;

    const errList = [];
    
    cardsTypeDough.forEach(card => {
      if(card.classList.contains('active')) localValidDough = true;
    });
    cardsTypeSize.forEach(card => {
      if(card.classList.contains('active')) localValidSize = true;
    });

    if(!localValidDough) errList.push('тип теста');
    if(!localValidSize) errList.push('размер пиццы');

    if(localValidDough && localValidSize) {
      modalWindowContent.classList.remove('error');
      modalBtn.classList.remove('error');
      return true;
    }

    modalWindowContent.classList.add('error');
    modalBtn.classList.add('error');
    modalWindow.classList.remove('none');
    modalWindowText.innerText = `Выберите: ${errList.join(', ')}`;
  }

  sendData(url, data) {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
}

const pizza = new PizzeriaConstructor(totalOrder, totalWeight, totalCalories, totalAmount);

cards.forEach(item => {
  item.addEventListener('click', (e) => {
    pizza.addIngredient(e);
    pizza.addTextResult(item);
    pizza.calculate();
  });
});

window.addEventListener('click', e => {
  if(e.target === modalWindow) modalWindow.classList.add('none');
});

modalBtn.addEventListener('click', () => modalWindow.classList.add('none'));

orderBtn.addEventListener('click', (e) => pizza.submitOrder(e));
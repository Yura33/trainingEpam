const cards = Array.from(document.querySelectorAll('.form__top-layer')),
      ingredients = Array.from(document.querySelectorAll('.current-pizza-item')),
      totalOrder = document.querySelector('.total-order'),
      totalWeight = document.querySelector('.total-weight'),
      totalCalories = document.querySelector('.total-calories'),
      totalAmount = document.querySelector('.total-amount'),
      orderBtn = document.querySelector('.btn-submit');

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
      const cardsTypeDough = document.querySelectorAll('[data-name$="см"]');
      cardsTypeDough.forEach(card => {
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
    this.clear()
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

orderBtn.addEventListener('click', (e) => pizza.submitOrder(e));
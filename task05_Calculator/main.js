const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const cleaners = document.querySelectorAll('.clear');
const expression = document.querySelector('.arithmetic-expression');
const operand = document.querySelector('.current-operand');
const result = document.querySelector('.equals');
const priority = document.querySelector('#priority');
const integer = document.querySelector('#integers');
const memoryBtn = document.querySelector('.memory');
const arrAllCalculations = [];
let newNumber = false;
let dot = false;
let firstOperand = '';
let secondOperand = '';
let operator = '';

function clickNumber(value) {
  if(operand.innerText === '0' || newNumber) operand.innerText = '';
  
  if(value === '.' && !dot) {
    dot = true;
  } else if(value === '.' && dot) return;
  if(expression.innerText.length < 30) expression.innerText += value;
  if(operand.innerText.length < 15)operand.innerText += value;

  if(secondOperand === '' && operator === '') {
    firstOperand = +value;
  }

  if(operator !== '' && firstOperand !== '') {
    secondOperand += +value;
    compute();
  }
  newNumber = false;
}

function clickOperator(o) {
  if(operand.innerText === '0' && o === '-') operand.innerText = '-';
  if(operand.innerText === '0' && o !== '-') return;
  if(firstOperand && !secondOperand && !operator) {
    operator = o;
    expression.innerText += o;
  }
  newNumber = true;
}

function equals() {
  if(priority.checked) {
    if(result.innerText.search(/[^0-9*/+-.=]/mi) != -1) return;
    if(integer.checked) {
      operand.innerText = Math.trunc(eval(expression.innerText));
    } else {
      operand.innerText = eval(expression.innerText).toString().slice(0, 15);
    }
    arrAllCalculations.push(`${expression.innerText} = ${operand.innerText}`);
  }

  if(!priority.checked) {
    if(operand.innerText === '0') {
      operand.innerText;
    } else operand.innerText = firstOperand;
  }
} 

function clear(btn) {
  if(btn === '⌫') {
    expression.innerText = expression.innerText.slice(0, -1);
    (operand.innerText.length > 1)? (operand.innerText = operand.innerText.slice(0, -1)): operand.innerText = '0';
  } else if(btn == 'C') {
    expression.innerText = '';
    operand.innerText = '0';
    firstOperand = '';
    secondOperand = '';
    operator = '';
  }
}

function compute() {
  let localResult;

  if(firstOperand && secondOperand && operator) {
    switch(operator) {
      case '+':
        localResult = +firstOperand + +secondOperand;
        break;
      case '-':
        localResult = firstOperand - secondOperand;
      break;
      case '*':
        localResult = firstOperand * secondOperand;
        break;
      case '/':
        localResult = firstOperand / secondOperand;
        break;
    }

    firstOperand = +localResult;
    operator = '';
    secondOperand = '';
  }
}

function saveResult() { 
  let blockResults = ''; 

  arrAllCalculations.forEach((item, index) => {
    blockResults += `${index + 1}. ${item} ;<br>`
  });
  
  var myWindow = window.open();
  myWindow.document.write(`<p style='margin:0 auto; padding: 50px 30px; max-width: 576px; color: #fff;
  background-color: #1e6c77;'>${blockResults}</p>`);
  myWindow.focus();
}

numbers.forEach(number => {
  number.addEventListener('click', e => clickNumber(e.target.innerText));
});

operators.forEach(e => {
  e.addEventListener('click', e => clickOperator(e.target.innerText))
});

cleaners.forEach(item => {
  item.addEventListener('click', e => clear(e.target.innerText));
});

result.addEventListener('click', equals);

memoryBtn.addEventListener('click', saveResult);
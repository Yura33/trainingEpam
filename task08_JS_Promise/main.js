'use strict'

const arrCardItem1 = document.querySelectorAll('.card-1 span'),
      arrCardItem2 = document.querySelectorAll('.card-2 span'),
      arrCardItem3 = document.querySelectorAll('.card-3 span'),
      arrStatus = document.querySelectorAll('.status');

const inputs = document.forms.form,
      inputTask = document.querySelector('.num'),
      inputDate = document.querySelector('.card-5 .date'),
      inputTime = document.querySelector('.card-5 .time'),
      inputName = document.querySelector('.card-5 .name'),
      inputImportant = document.querySelector('.card-5 .important'),
      inputNote = document.querySelector('.card-5 .note'),
      submit = document.querySelector('.submit');

const arrUrl = [
  './yury_data1.json',
  './yury_data2.json',
  './yury_data3.json'
];

const arrJson = [];

class TodoItem {
  constructor(date, time, name, important, note) {
    this.date = date.value,
    this.time = time.value,
    this.name = name.value,
    this.important = important.checked,
    this.note = note.value
  }

  isValid() {
    let valid = [];
    for(let key in this) {
      if(this[key] === '') {
        inputs[key].classList.add('invalid');
        valid.push(false);
      } else {
        inputs[key].classList.remove('invalid');
        this.date = this.date.split('-').reverse().join('-');
        valid.push(true);
      }
    }
    return valid.every(item => item === true);
  }

  async submitNewTodoItem(e) {
    e.preventDefault();
    if(this.isValid()) {
      const response = await fetch(arrUrl[inputTask.value - 1], {
        method: 'PUT',
        body: JSON.stringify(this),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Allow': 'PUT',
        'Access-Control-Allow-Methods': 'PUT',
        }
      });
    }
  }
}

function getData(url) {
  url.forEach(async (u, index) => {
    const res = await fetch(u);
    const json = await res.json();
    arrJson.push(json);
    arrStatus[index].innerText = res.statusText;
  }); 
}

function showTodoItem(arrElements, jsonObj) {
  arrElements.forEach(item => {
    item.innerText = jsonObj[item.className];
  })
}

getData(arrUrl);

setTimeout(() => showTodoItem(arrCardItem1, arrJson[0]), 1000);
setTimeout(() => showTodoItem(arrCardItem2, arrJson[1]), 2000);
setTimeout(() => showTodoItem(arrCardItem3, arrJson[2]), 3000);

// setInterval(() => getData(arrUrl), 3000);

submit.addEventListener('click', (e) => {
  const todoItem = new TodoItem(inputDate, inputTime, inputName, inputImportant, inputNote);
  todoItem.submitNewTodoItem(e)
})

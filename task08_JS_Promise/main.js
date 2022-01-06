'use strict'

const arrCardItem1 = document.querySelectorAll('.card-1 span'),
      arrCardItem2 = document.querySelectorAll('.card-2 span'),
      arrCardItem3 = document.querySelectorAll('.card-3 span'),
      arrStatus = document.querySelectorAll('.status');

const inputTask = document.querySelector('.num'),
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

function getData(url) {
  const responses = [];

  url.forEach(async u => {
    const res = await fetch(u);
    responses.push(res);

    const json = await res.json();
    arrJson.push(json);

    arrStatus.forEach((item, index) => {
      item.innerText = responses[index].statusText;
    });
  }); 
}
      
function addDataToPage(arr, obj) {
  arr.forEach(item => {
    item.innerText = obj[item.className];
  })
}

getData(arrUrl);
      
setTimeout(() => addDataToPage(arrCardItem1, arrJson[0]), 1000);
setTimeout(() => addDataToPage(arrCardItem2, arrJson[1]), 2000);
setTimeout(() => addDataToPage(arrCardItem3, arrJson[2]), 3000);

// setInterval(() => getData(arrUrl), 3000);
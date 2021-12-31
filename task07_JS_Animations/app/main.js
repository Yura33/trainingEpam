const dragItems = document.querySelectorAll('.app__garbage'),
      area =  document.querySelector('.app__area'),
      garbageCan =  document.querySelector('.app__garbage-can'),
      garbageCanOpen =  document.querySelector('.app__garbage-can-open');

const arrGarbage = [];
let leftStart; 
let topStart; 

function handlerDragstart(event) {
  this.style.opacity = 0;
  leftStart = event.offsetX;
  topStart = event.offsetY;
}

function handlerDragenter(event) {
  event.preventDefault();
}

function handlerDragover(event) {
  event.preventDefault();
  if(event.target === area) {
    garbageCan.classList.add('active');
    garbageCanOpen.classList.remove('active');
  } else if(event.target === garbageCanOpen) {
    garbageCan.classList.remove('active');
    garbageCanOpen.classList.add('active');
  }
}

function handlerDragend(event) {
  event.target.hidden = true;
  const parentElem = document.elementFromPoint(event.clientX, event.clientY);
  event.target.hidden = false;
  
  this.style.opacity = 1;
  
  event.target.style.left = event.pageX - parentElem.offsetLeft - leftStart + 'px';
  event.target.style.top = event.pageY - parentElem.offsetTop - topStart + 'px';
  
  if(parentElem === garbageCanOpen) {
    arrGarbage.push(event.target);
    event.target.style.display = 'none';
  }
  garbageCanOpen.classList.remove('active');
  garbageCan.classList.add('active');
  event.target.classList.remove('visible');
}

dragItems.forEach(item => {
  item.addEventListener('dragstart', handlerDragstart);
  item.addEventListener('dragend', handlerDragend);
})

area.addEventListener('dragenter', handlerDragenter);
area.addEventListener('dragover', handlerDragover);
garbageCan.addEventListener('dragover', handlerDragover);
garbageCanOpen.addEventListener('dragover', handlerDragover);

garbageCanOpen.addEventListener('click', () => {
  garbageCan.classList.toggle('active');
  garbageCanOpen.classList.toggle('active');
  if(arrGarbage.length > 0) {
    arrGarbage[arrGarbage.length - 1].removeAttribute('style');
    arrGarbage[arrGarbage.length - 1].classList.add('visible');
    arrGarbage.pop();
    garbageCan.classList.remove('active');
    garbageCanOpen.classList.add('active');
  }

  if(garbageCan.classList.entries('active')) {
    dragItems.forEach( item => item.classList.remove('visible'));
  }
});

const btns = document.querySelectorAll('.form__btn');

btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
  })
})
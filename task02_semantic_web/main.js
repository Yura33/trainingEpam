document.addEventListener('DOMContentLoaded', function() {

    function changeFormatDate(value) {
        if(value < 10) {
            '0' + value;
        }
        return value;
    }

    function creatDate() {

        const currentDate = new Date();
        const day = changeFormatDate(currentDate.getDate());
        const month = changeFormatDate(currentDate.getMonth() + 1);
        const year = currentDate.getFullYear();

        return day + '.' + month + '.' + year;
    }

    const date = document.querySelector('.footer__date');
    date.innerHTML = creatDate();

});
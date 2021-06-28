window.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabs = document.querySelectorAll('.tabcontent'),
        tabsList = document.querySelectorAll('.tabheader__item');

    function hideTabs() {
        tabs.forEach((item) => {
            item.style.display = 'none';
        });
        tabsList.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTab(i = 0) {
        tabs[i].style.display = 'block';
        tabsList[i].classList.add('tabheader__item_active');
    }
    tabsList[0].parentElement.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.matches('.tabheader__item')) {
            tabsList.forEach((item, i) => {
                if (item == target) {
                    hideTabs();
                    showTab(i);
                }
            });
        }

    });
    hideTabs();
    showTab();

    //timer

    const deadline = '2021-07-05T19:00:00';

    function getZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function timeRemain(endtime) {
        const t = Date.parse(endtime) - new Date(),
            days = Math.floor(t / 1000 / 60 / 60 / 24),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days,
            hours,
            minutes,
            seconds
        };
    }


    function setTimer(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            minutes = timer.querySelector('#minutes'),
            hours = timer.querySelector('#hours'),
            seconds = timer.querySelector('#seconds'),
            t = timeRemain(endtime);


        if (t.total < 0) {
            days.textContent = '00';
            minutes.textContent = '00';
            hours.textContent = '00';
            seconds.textContent = '00';
            clearInterval(timerID);
        } else {
            days.textContent = getZero(t.days);
            minutes.textContent = getZero(t.minutes);
            hours.textContent = getZero(t.hours);
            seconds.textContent = getZero(t.seconds);
        }

    }
    setTimer('.timer', deadline);
    const timerID = setInterval(setTimer, 1000, '.timer', deadline);
    


    //Modal
    const btnModal = document.querySelectorAll('[data-modal]'),
        modalForm = document.querySelector('.modal');
    
    btnModal.forEach((item) => {
        item.addEventListener('click', () => {
            modalForm.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    modalForm.addEventListener('click', (event) => {
        if (event.target && (event.target.matches('.modal') || 
        event.target.matches('.modal__close'))) {
            modalForm.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
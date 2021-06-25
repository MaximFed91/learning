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
        tabsList[i].classList.add('tabheader__item_active')
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

    const deadline = '2021-07-05';

    function timeRemain (endtime) {
        const t = Date.parse(endtime) - new Date(),
            days = Math.floor(t/1000/60/60/24),
            hours = (t/1000/60/60)%24,
            minutes = (t/1000/60)%60,
            seconds = (t/1000)%60;
        return {
            total: t,
            days,
            hours,
            minutes,
            seconds
        };
    }
    function setTiner (selector, endtime) {
        const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             minutes = timer.querySelector('#minutes'),
             hours = timer.querySelector('#hours'),
             seconds = timer.querySelector('#seconds');
    }
});
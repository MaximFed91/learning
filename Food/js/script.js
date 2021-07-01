'use strickt';
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

    function modalShow() {
        modalForm.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerID);
    }

    function modalClose() {
        modalForm.style.display = 'none';
        document.body.style.overflow = '';
    }

    btnModal.forEach((item) => {
        item.addEventListener('click', modalShow);
    });

    modalForm.addEventListener('click', (event) => {
        if (event.target && (event.target.matches('.modal') ||
                event.target.matches('.modal__close'))) {
            modalClose();
        }
    });
    const modalTimerID = setTimeout(modalShow, 5000);

    function scrolShowModal() {
        if (window.scrollY + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            modalShow();
            window.removeEventListener('scroll', scrolShowModal);
        }
    }
    window.addEventListener('scroll', scrolShowModal);

    //Class card

    class MenuCard {
        constructor(srcImg, alt, title, text, price, parentSelector, ...clases) {
            this.src = srcImg,
                this.alt = alt,
                this.title = title,
                this.text = text,
                this.price = price,
                this.clases = clases,
                this.cursUSD = 72,
                this.changeRUB(),
                this.parent = document.querySelector(parentSelector);
        }

        changeRUB() {
            this.price = this.price * this.cursUSD;
        }
        render() {
            const card = document.createElement('div');
            if (this.clases.length === 0) {
                this.clases[0] = 'menu__item';
            }
            this.clases.forEach((classItem) => {
                card.classList.add(classItem);
            });
            card.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(card);
        }
    }
    const getData = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`fail: ${res.status}`);
        }
        return await res.json();
    };

    getData('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    //Form

    const forms = document.querySelectorAll('form');
    forms.forEach((item) => {
        byntPostForm(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function byntPostForm (form) {
        const loadingImg = document.createElement('img'),
            messages = {
                ok: 'Спасибо! мы вам перезвоним.',
                loading: 'img/spinner.svg',
                fail: 'Что-то пошло не так...'
            };
            loadingImg.src = messages.loading;
            loadingImg.style.cssText = `
            display: block;
            margin: 0 auto
            `;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.append(loadingImg);
            const formData = new FormData(form),
                jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', jsonData)
            .then((data) => {
                loadingImg.remove();
                console.log(data);
                thanksFormModal(messages.ok);
            }).catch(() => {
                thanksFormModal(messages.fail);
            }).finally(() => {
                form.reset();
            });

        });
    }

    function thanksFormModal(message) {
        const modalContent = document.querySelector('.modal__content'),
            thanksContent = document.createElement('div');
        modalShow();
        modalContent.style.display = 'none';
        thanksContent.classList.add('modal__content');
        thanksContent.innerHTML = `
        <div class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
        `;
        document.querySelector('.modal__dialog').append(thanksContent);
        setTimeout(() => {
            thanksContent.remove();
            modalContent.style.display = 'block';
            modalClose();
        }, 4000);

    }

    

});
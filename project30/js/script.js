/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */


'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    document.querySelectorAll('.promo__adv img').forEach(element => {
        element.remove();
    });
    document.querySelector('.promo__genre').textContent = 'ДРАМА';
    document.querySelector('.promo__bg').style.background = "url('img/bg.jpg') center center / cover no-repeat";

    const moviesList = document.querySelector('.promo__interactive-list');

    const listCreat = (films, parent) => {
        parent.innerHTML = '';
        films.sort();
        films.forEach((item, i) => {
            parent.innerHTML += `
        <li class="promo__interactive-item">${i+1}.  ${item}
            <div class="delete" data-film="${i}"></div>
        </li>
    `;
        });
    };
    listCreat(movieDB.movies, moviesList);

    const inValue = document.querySelector('.adding__input'),
        checkLove = document.querySelector('.yes').previousElementSibling;
    let trashBaskets = document.querySelectorAll('.delete');
    document.querySelector('.add button').addEventListener('click', (event) => {
        event.preventDefault();
        let str = '';
        if (inValue.value.length > 21) {
            str = inValue.value.slice(0, 21) + '...';
        } else {
            str = inValue.value;
        }
        if (checkLove.checked) {
            console.log("Добавляем любимый фильм");
        }
        inValue.value = '';
        if (str) {
             movieDB.movies.push(str);
        listCreat(movieDB.movies, moviesList);
        deleteFilm();
        }
    });

    function deleteFilm() {
        trashBaskets = document.querySelectorAll('.delete');
        trashBaskets.forEach(element => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                movieDB.movies.splice(element.dataset.film, 1);
                listCreat(movieDB.movies, moviesList);
                deleteFilm();
            });
        });
    }
    deleteFilm();
});
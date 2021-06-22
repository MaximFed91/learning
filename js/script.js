"use strict";
const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start() {
        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt("how match films do you watch?", "");
        }
        if (personalMovieDB.count < 10) {
            alert('few movies');
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
            alert('normal');
        } else {
            alert('many');
        }

    },
    howMivies() {
        for (let i = 1; i <= personalMovieDB.count; i++) {
            let a = prompt("какой фильм?", "");
            while (!a || a.length == 0 || a.length > 50) {
                    a = prompt("какой фильм?", "");
            }
            let b = prompt('какая оценка', '');
            while (!b || b.length == 0 || b.length > 50) {
                    b = prompt('какая оценка', '');
                }
            personalMovieDB.movies[a] = b;
        }
    },
    writeYourGenres() {
        for (let i = 1; i <= 3; i++) {
            let a = prompt('how is your ' + i + ' favarite genres?', '');
            while (a == '' || a == null) {
                a = prompt('how is your ' + i + ' favarite genres?', '');
            }
            personalMovieDB.genres[i - 1] = a;
        }
        personalMovieDB.genres.forEach(function (gen, index) {
            console.log(`Любимфй жанр №${index + 1} - это ${gen}.`);
        });
    },
    showMyDB() {
        if (!personalMovieDB.privat) {
            console.log(personalMovieDB);
        }
    },
    toggleVisibleMyBD() {
        personalMovieDB.privat = !personalMovieDB.privat;
    },
};
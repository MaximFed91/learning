"use strict";
let numbersOfFilms = +prompt("how match films youu watch?", "");
console.log(numbersOfFilms);
const personalMovieDB = {
    count: numbersOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};
if (personalMovieDB.count < 10) {
    alert('few movies');
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
    alert('normal');
} else {
    alert('many');
}

for (let i = 1; i <= personalMovieDB.count; i++) {
    let x = 0,
        a = prompt("какой фильм?", "");
    while (x < 1) {
        if (!a) {
            a = prompt("какой фильм?", "");
        } else if (a.length == 0 || a.length > 50) {
            a = prompt("какой фильм?", "");
        } else {
            x++;
        }
    }
    x = 0;
    let b = prompt('какая оценка', '');
    while (x < 1) {
        if (!b) {
            b = prompt('какая оценка', '');
        } else if (b.length == 0 || b.length > 50) {
            b = prompt('какая оценка', '');
        } else {
            x++;
        }
    }
    personalMovieDB.movies[a] = b;
}
console.log(personalMovieDB);
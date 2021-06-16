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

const a = prompt("какой фильм?", ""),
    b = prompt('какая оценка', ''),
    c = prompt("какой фильм?", ""),
    d = prompt('какая оценка', '');

personalMovieDB.movies[a] = b;
personalMovieDB.movies[c] = d;

console.log(personalMovieDB);
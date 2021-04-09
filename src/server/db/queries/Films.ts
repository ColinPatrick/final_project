import { Query } from '../';
// all queries for the films table

const checkFilm = (filmid: number) => Query('SELECT * FROM Films WHERE Films.filmid = ?', [filmid])

const addToFilms = (newFilm: { filmid: number, name: string, poster: string }) => Query('INSERT INTO Films SET ?', newFilm);

export default {
    addToFilms,
    checkFilm
}
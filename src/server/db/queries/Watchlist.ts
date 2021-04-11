import { Query } from '../';
// all queries for the film logs table

// query to get entire watchlist for a user
const getUserWatchlist = (userid: number) => Query('SELECT Watchlist.*, Films.name, Films.poster FROM Watchlist JOIN Films on Films.filmid = Watchlist.filmid WHERE userid = ?', [userid]);
// query to add a new film to watchlist
const addToWatchlist = (newLog: { userid: number, filmid: number }) => Query('INSERT INTO Watchlist SET ?', newLog);
// query to remove a film from watchlist
const removeFromWatchlist = (id: number) => Query('DELETE FROM Watchlist WHERE id = ?', [id]);
// all queries are exported to be used on the logs api route
export default {
    getUserWatchlist,
    addToWatchlist,
    removeFromWatchlist
}
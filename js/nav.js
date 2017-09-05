new Vue({
    el: '#nav',
    data: {
        home: 'Home',
        games: 'Spiele',
        contact: 'Kontakt',
        gameItems: [
            {game: 'Mastermind', url: 'games/mastermind/mastermind.html'},
            {game: 'Flood', url: 'games/floodfill/floodfill.html'},
            {game: 'Minesweeper', url: 'games/minesweeper/minesweeper.html'}
        ]
    }
});

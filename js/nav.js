new Vue({
    el: '#nav',
    data: {
        home: 'Home',
        games: 'Spiele',
        contact: 'Kontakt',
        gameItems: [
            {game: 'Mastermind', url: '/HTMLGame/games/mastermind/mastermind.html', thumbnail: '/HTMLGame/pictures/mastermind.jpg'},
            {game: 'Flood', url: '/HTMLGame/games/floodfill/floodfill.html', thumbnail: '/HTMLGame/pictures/floodfill.png'},
            {game: 'Minesweeper', url: '/HTMLGame/games/minesweeper/minesweeper.html'}
        ]
    }
});

let nav = new Vue({
    el: '#nav',

    data: {
        home: 'Home',
        games: 'Spiele',
        contact: 'Kontakt',
        gameItems: [
            {game: 'Floodfill', url: '/HTMLGame/games/floodfill/floodfill.html', thumbnail: '/HTMLGame/pictures/floodfill.png'},
            {game: 'Mastermind', url: '/HTMLGame/games/mastermind/mastermind.html', thumbnail: '/HTMLGame/pictures/mastermind.jpg'},
            {game: 'Minesweeper', url: '/HTMLGame/games/minesweeper/minesweeper.html', thumbnail: '/HTMLGame/profilbild-Kopie-6.jpg'},
            {game: 'Sudoku', url: '/HTMLGame/games/Sudoku/Sudoku.html', thumbnail: '/HTMLGame/profilbild-Kopie-6.jpg'},
            {game: 'Untangle', url: '/HTMLGame/games/untangle/untangle.html', thumbnail: '/HTMLGame/profilbild-Kopie-6.jpg'}
        ]
    }
});

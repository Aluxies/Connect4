const { generateGameGrid, renderGameGrid } = require('./grid');
const { initPlayer } = require('./player');

function initGame() {

    console.clear();

    const GAME = generateGameGrid();

    const priority = Math.floor( Math.random() * 2 );
    const isFirstPlayer = priority === 1;

    const player1 = initPlayer( isFirstPlayer );
    const player2 = initPlayer( !isFirstPlayer );

    GAME.players = [ player1, player2 ];

    return GAME;

};

function startGame() {

    const GAME = initGame();

    const players = GAME.players;

    const firstPlayer = players.find( player => player.isFirstPlayer );
    const secondPlayer = players.find( player => !player.isFirstPlayer );

    console.log( `First player : ${firstPlayer.pseudo}` );
    console.log( `Second player : ${secondPlayer.pseudo}` );

    while ( true ) {

        renderGameGrid();

        firstPlayer.playPiece( GAME );

        renderGameGrid();

        secondPlayer.playPiece( GAME );

    };

};

module.exports = {
    startGame
};
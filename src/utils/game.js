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

    console.log( "First player : " + JSON.stringify( firstPlayer ) );
    console.log( "Second player : " + JSON.stringify( secondPlayer ) );

    renderGameGrid();

    firstPlayer.playPiece( 2, 2, GAME );

    renderGameGrid();

    secondPlayer.playPiece( 3, 3, GAME );

    renderGameGrid();

};

module.exports = {
    startGame
};
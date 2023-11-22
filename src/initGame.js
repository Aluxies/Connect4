const { generateGameGrid, renderGameGrid } = require('./utils/grid');
const prompt = require('prompt-sync')();

function initPlayer( isFirstPlayer ) {

    let pseudo = null;
    
    while ( pseudo === null ) {

        pseudo = prompt( "Enter first's player pseudo : " );

    };

    const player = {
        pseudo,
        isFirstPlayer,
    };

    console.log( `> Player's pseudo set to "${pseudo}"\n` );

    return player;

};

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

module.exports = {
    initGame
};
const { renderGameGrid } = require('./utils/grid');
const { initGame } = require('./initGame');

const GAME = initGame();

function playOnePiece( positionLine, positionColumn ) {

    if ( positionLine < 1 || positionLine > GAME.height ) {

        return console.error( `Invalid position line : must be between 1 and ${GAME.height} included.` );

    };

    if ( positionColumn < 1 || positionColumn > GAME.width ) {

        return console.error( `Invalid position column : must be between 1 and ${GAME.height} included.` );

    };

    const piece = 'J';

    const indexLine = positionLine - 1;
    const indexColumn = positionColumn - 1;

    GAME.grid[indexLine][indexColumn] = piece;

    console.log( `Piece ${piece} placed at position (${positionLine},${positionColumn})\n` );

};

console.log( renderGameGrid() );

playOnePiece( 2, 2 );

console.log( renderGameGrid() );
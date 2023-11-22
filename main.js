const GAMEGRID = [];
const height = 6;
const width = 7;

function generateGameGrid() {

    for ( let i=0; i<height; i++ ) {

        const line = [];

        for ( let j=0; j<width; j++ ) {

            line.push( 'X' );

        };

        GAMEGRID.push( line );

    };

};

function playOnePiece( positionLine, positionColumn ) {

    if ( positionLine < 1 || positionLine > height ) {

    };

    if ( positionColumn < 1 || positionColumn > width ) {

    };

    const piece = 'J';

    const indexLine = positionLine - 1;
    const indexColumn = positionColumn - 1;

    GAMEGRID[indexLine][indexColumn] = piece;

    console.log( `Piece ${piece} placed at position (${positionLine},${positionColumn})` );

};

generateGameGrid();

playOnePiece( 2, 2 );

for ( const line of GAMEGRID ) {

    console.log( JSON.stringify( line ) );

}
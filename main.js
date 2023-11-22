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

        return console.error( `Invalid position line : must be between 1 and ${height} included.` );

    };

    if ( positionColumn < 1 || positionColumn > width ) {

        return console.error( `Invalid position column : must be between 1 and ${height} included.` );

    };

    const piece = 'J';

    const indexLine = positionLine - 1;
    const indexColumn = positionColumn - 1;

    GAMEGRID[indexLine][indexColumn] = piece;

    console.log( `Piece ${piece} placed at position (${positionLine},${positionColumn})\n` );

};

function renderGameGrid() {

    let gridString = "";

    for ( const line of GAMEGRID ) {

        let lineString = "";

        for ( let i=0; i<line.length; i++ ) {

            lineString += `\t ${line[i]}`;

        };

        gridString += `${lineString}\n`;
    
    };

    return gridString;

};

generateGameGrid();

console.log( renderGameGrid() );

playOnePiece( 2, 2 );

console.log( renderGameGrid() );
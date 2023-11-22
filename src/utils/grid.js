const GAME = {
    grid : [],
    height : 6,
    width: 7,
};

function generateGameGrid() {

    const HEIGHT = GAME.height;
    const WIDTH = GAME.width;

    for ( let i=0; i<HEIGHT; i++ ) {

        const line = [];

        for ( let j=0; j<WIDTH; j++ ) {

            line.push( 'X' );

        };

        GAME.grid.push( line );

    };

    return GAME;

};

function renderGameGrid() {

    let gridString = "";

    for ( const line of GAME.grid ) {

        let lineString = "";

        for ( let i=0; i<line.length; i++ ) {

            lineString += `\t ${line[i]}`;

        };

        gridString += `${lineString}\n`;
    
    };

    return gridString;

};

module.exports = {
    generateGameGrid,
    renderGameGrid
};
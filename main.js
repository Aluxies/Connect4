function generateGameGrid() {

    const gameGrid = [];

    const height = 6;
    const width = 7;

    for ( let i=0; i<height; i++ ) {

        const line = [];

        for ( let j=0; j<width; j++ ) {

            line.push( j );

        };

        gameGrid.push( line );

    };

    return gameGrid;

};

const grid = generateGameGrid();

for ( const line of grid ) {

    console.log( JSON.stringify( line ) );

}
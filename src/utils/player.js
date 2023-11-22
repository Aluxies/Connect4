const prompt = require("prompt-sync")();

class Player {
  constructor(pseudo, isFirstPlayer, piece) {
    this.pseudo = pseudo;
    this.isFirstPlayer = isFirstPlayer;
    this.piece = piece;
  }

  playPiece(game) {
    
    console.log( `> Player ${this.pseudo} :\n` );

    const HEIGHT = game.height;
    const WIDTH = game.width;
    const GRID = game.grid;

    // const positionLine = askForPosition( HEIGHT, 'line' );
    const positionColumn = askForPosition( WIDTH  );

    const piece = this.piece;

    const indexColumn = positionColumn - 1;
    const indexLine = game.gridOccupations[indexColumn];

    GRID[indexLine][indexColumn] = piece;

    game.gridOccupations[indexColumn]--;

    console.log(
      `${this.pseudo} has placed piece ${piece} at position (${indexLine+1},${positionColumn})\n`
    );
  }
};

function askForPosition( maxValue ) {

  let position = null;

  while ( position === null ) {

    position = prompt( `Enter the position of the column : ` );
    position = parseInt( position );

    const hasError = verifyPosition( position, maxValue );

    if ( hasError ) position = null;

  };

  return position;

};

function verifyPosition( position, maxValue ) {

  if ( isNaN( position ) ) {
    console.error( `Invalid position column data type : must be a number` );
    return true;
  };
  
  if (position < 1 || position > maxValue) {
    console.error(
      `Invalid position column : must be between 1 and ${maxValue} included.`
    );
    return true;
  };

  return false;

};

function initPlayer(isFirstPlayer) {
  let pseudo = null;

  while (pseudo === null) {
    pseudo = prompt("Enter first's player pseudo : ");
  }

  let piece;

  if (isFirstPlayer) piece = "R";
  else piece = "J";

  const player = new Player(pseudo, isFirstPlayer, piece);

  console.log(`> Player's pseudo set to "${pseudo}"\n`);

  return player;
};

module.exports = {
  initPlayer,
};

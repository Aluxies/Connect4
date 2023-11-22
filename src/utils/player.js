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

    const positionLine = askForPosition( HEIGHT, 'line' );
    const positionColumn = askForPosition( WIDTH, 'column' );

    const piece = this.piece;
    const indexLine = positionLine - 1;
    const indexColumn = positionColumn - 1;

    GRID[indexLine][indexColumn] = piece;

    console.log(
      `${this.pseudo} has placed piece ${piece} at position (${positionLine},${positionColumn})\n`
    );
  }
};

function askForPosition( maxValue, word ) {

  let position = null;

  while ( position === null ) {

    position = prompt( `Enter the position of the ${word} : ` );
    position = parseInt( position );

    const hasError = verifyPositionLine( position, maxValue, word );

    if ( hasError ) position = null;

  };

  return position;

};

function verifyPositionLine( position, maxValue, word ) {

  if ( isNaN( position ) ) {
    console.error( `Invalid position ${word} data type : must be a number` );
    return true;
  };
  if (position < 1 || position > maxValue) {
    console.error(
      `Invalid position ${word} : must be between 1 and ${maxValue} included.`
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

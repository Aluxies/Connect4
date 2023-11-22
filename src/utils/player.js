const prompt = require("prompt-sync")();

class Player {
  constructor(pseudo, isFirstPlayer, piece) {
    this.pseudo = pseudo;
    this.isFirstPlayer = isFirstPlayer;
    this.piece = piece;
  }

  playPiece(game) {
    console.log(`> Player ${this.pseudo} :\n`);

    const HEIGHT = game.height;
    const WIDTH = game.width;
    const GRID = game.grid;

    const positionColumn = askForPositionColumn(WIDTH);
    const indexColumn = positionColumn - 1;

    const indexLine = game.gridOccupations[indexColumn];
    const positionLine = indexLine + 1;

    GRID[indexLine][indexColumn] = this.piece;

    game.gridOccupations[indexColumn]--;

    console.log(
      `${this.pseudo} has placed piece ${this.piece} at position (${positionLine},${positionColumn})\n`
    );
  }
}

function askForPositionColumn(width) {
  let position = null;

  while (position === null) {
    position = prompt(`Enter the position of the column : `);
    position = parseInt(position);

    const hasError = verifyPosition(position, width);

    if (hasError) position = null;
  }

  return position;
}

function verifyPosition(position, width) {
  if (isNaN(position)) {
    console.error(`Invalid position column data type : must be a number`);
    return true;
  }

  if (position < 1 || position > width) {
    console.error(
      `Invalid position column : must be between 1 and ${width} included.`
    );
    return true;
  }

  return false;
}

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
}

module.exports = {
  initPlayer,
};

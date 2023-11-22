const prompt = require("prompt-sync")();

class Player {
  constructor(pseudo, isFirstPlayer, piece) {
    this.pseudo = pseudo;
    this.isFirstPlayer = isFirstPlayer;
    this.piece = piece;
  }

  playPiece(positionLine, positionColumn, game) {
    const HEIGHT = game.height;
    const WIDTH = game.width;
    const GRID = game.grid;

    if (positionLine < 1 || positionLine > HEIGHT) {
      return console.error(
        `Invalid position line : must be between 1 and ${HEIGHT} included.`
      );
    }

    if (positionColumn < 1 || positionColumn > WIDTH) {
      return console.error(
        `Invalid position column : must be between 1 and ${WIDTH} included.`
      );
    }

    const piece = this.piece;
    const indexLine = positionLine - 1;
    const indexColumn = positionColumn - 1;

    GRID[indexLine][indexColumn] = piece;

    console.log(
      `${this.pseudo} has placed piece ${piece} at position (${positionLine},${positionColumn})\n`
    );
  }
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

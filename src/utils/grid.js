const GAME = {
  grid: [],
  gridOccupations: [],
  height: 6,
  width: 7,
};

function generateGameGrid() {
  const HEIGHT = GAME.height;
  const WIDTH = GAME.width;

  for (let i = 0; i < HEIGHT; i++) {
    const gridline = [];

    for (let j = 0; j < WIDTH; j++) {
      gridline.push("X");
    }

    GAME.grid.push(gridline);
  }

  const gridOccupations = [];

  for (let i = 0; i < WIDTH; i++) {
    gridOccupations.push(HEIGHT - 1);
  }

  GAME.gridOccupations = gridOccupations;

  return GAME;
}

function renderGameGrid() {
  let gridString = "";

  for (const line of GAME.grid) {
    let lineString = "";

    for (let i = 0; i < line.length; i++) {
      lineString += `\t ${line[i]}`;
    }

    gridString += `${lineString}\n`;
  }

  console.log(gridString);
}

module.exports = {
  generateGameGrid,
  renderGameGrid,
};

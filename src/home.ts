type Char = 'F' | 'S' | '/';

type Result = {
    winner : string;
    hasWinner : boolean;
};

const COLORS : string[] = [
    "#ff6e40",
    "#ffc13b",
    "#1868ae",
    "#FFA6C9",
    "#8FBC8B"
];

const GAME_HEIGHT : number = 6;
const GAME_WIDTH : number = 7;
const COUNT_TO_WIN : number = 4;
const GAME_GRID_OCCUPATIONS : number[] = [];

let boardElement : HTMLElement;
let messageElement : HTMLElement;
let trapezoidContainer : HTMLElement;

let defaultCellBackgroundColor : string = "";
let defaultCellHeight : string = "";
let defaultCellMargin : string = "";
let defaultCellPadding : string = "";
let colorFirstPlayer : string = "";
let colorSecondPlayer : string = "";
let isFirst : boolean = true;

document.addEventListener("DOMContentLoaded", () => {
    boardElement = document.getElementById("board") as HTMLElement;
    messageElement = document.getElementById("message") as HTMLElement;
    trapezoidContainer = document.getElementById('trapezoid-container') as HTMLElement;

    if (boardElement && messageElement) {
        createBoard();
    } else {
        console.error( "Error loading DOM" );
    }
});

function createBoard() : void {
    for (let i : number = 0; i < GAME_WIDTH; i++) {
        GAME_GRID_OCCUPATIONS[i] = 0;
        const column : HTMLElement = document.createElement('div');
        column.className = 'column';
        column.dataset.columnIndex = `${i}`;
        column.addEventListener("click", columnHandler);
        column.addEventListener("mouseover", columnMouseOver);
        column.addEventListener("mouseout", columnMouseOut);
        for (let j : number = 0; j < GAME_HEIGHT; j++) {
            const cell : HTMLElement = document.createElement("div") as HTMLElement;
            cell.className = `cell`;
            cell.id = `${i}-${j}`;
            column.appendChild(cell);
        }
        boardElement.appendChild(column);
    }
    const resetButton : HTMLElement = document.getElementById('buttonReset') as HTMLElement;
    const replayButton : HTMLElement = document.getElementById('buttonReplay') as HTMLElement;
    const playForMeButton : HTMLElement = document.getElementById('playForMe') as HTMLElement;
    playForMeButton.addEventListener("click", () => {
        const countClicks = 7;
        let cellToClick : HTMLElement;
        for ( let i=0; i<countClicks; i++) {
            cellToClick = document.getElementById(`${i % 2}-0`) as HTMLElement;

                cellToClick.click();
        }
        return true;
    });
    resetButton.addEventListener("click", onResetButton);
    setColors();
    const firstCell : HTMLElement = document.querySelectorAll('.cell').item(0) as HTMLElement
    defaultCellBackgroundColor = firstCell.style.backgroundColor;
    defaultCellHeight = firstCell.style.height;
    firstCell.getAttribute("padding");
    defaultCellPadding = firstCell.style.padding;
    defaultCellMargin = firstCell.style.margin;
}

function setColors() : void {
    let randomIndex : number;
    while (colorFirstPlayer === colorSecondPlayer) {
        randomIndex = Math.floor(Math.random() * COLORS.length);
        colorFirstPlayer = COLORS[randomIndex];
        randomIndex = Math.floor(Math.random() * COLORS.length);
        colorSecondPlayer = COLORS[randomIndex];
    }
}

function columnHandler(e : Event) : boolean {
    const column : HTMLElement = e.currentTarget as HTMLElement;
    const columnIndex : number = parseInt(column.dataset.columnIndex ?? "-1");
    if (columnIndex === -1) return true;

    if (GAME_GRID_OCCUPATIONS[columnIndex]+1 === GAME_HEIGHT) {
        column.classList.add("filled");
        column.removeEventListener("click", columnHandler);
        column.removeEventListener("mouseover", columnMouseOver);
        column.removeEventListener("mouseout", columnMouseOut);
    }

    let cellIndex : number = calculateNextCellIndex(columnIndex);

    const cell : HTMLElement = document.getElementById(`${columnIndex}-${cellIndex}`) as HTMLElement;
    placeColor(cell, columnIndex);
    determineWinner();
    columnMouseOver(e);
    return true;
}

function determineWinner() : void {
    let result : Result = { hasWinner: false, winner : '' };
    const cells : NodeListOf<HTMLElement> = document.querySelectorAll('.cell');
    result = checkColumns(result, cells);
    if (result.hasWinner) {
        console.log("oui1");
        return displayWinner(result);
    }
    result = checkLines(result, cells);
    if (result.hasWinner) {
        console.log("oui2");
        return displayWinner(result);
    }
    result = checkDiagonals(result, cells);
    if (result.hasWinner) {
        console.log("oui3");
        return displayWinner(result);
    }
}

function displayWinner(result : Result) : void {
    messageElement.innerHTML = `Winner ${result.winner}`;
    messageElement.style.color = result.winner === 'first' ? colorFirstPlayer : colorSecondPlayer;
    console.log(JSON.stringify(trapezoidContainer));
    trapezoidContainer.style.display = 'block';
    const winnerCell : HTMLElement = document.getElementById("winner-cell") as HTMLElement;
    winnerCell.style.backgroundColor = result.winner === 'first' ? colorFirstPlayer : colorSecondPlayer;
}

function columnMouseOver(e : Event) : boolean {
    const column : HTMLElement = e.currentTarget as HTMLElement;

    const columnIndex : number = parseInt(column.dataset.columnIndex ?? "-1");
    if (columnIndex === -1) return true;

    if (GAME_GRID_OCCUPATIONS[columnIndex] === GAME_HEIGHT) return true;

    const cellIndex : number = calculateNextCellIndex(columnIndex);
    const columnNextElement : HTMLElement = document.getElementById(`${columnIndex}-${cellIndex}`) as HTMLElement;
    setElementBackgroundColor(columnNextElement);
    columnNextElement.classList.add("preview");
    return true;
}

function setElementBackgroundColor(element : HTMLElement) : void {
    element.setAttribute("style", `background-color: ${getCurrentColor()}`);
}

function calculateNextCellIndex(columnIndex : number) : number {
    return GAME_HEIGHT -1 - GAME_GRID_OCCUPATIONS[columnIndex];
}

function columnMouseOut(e : Event) : boolean {
    const column : HTMLElement = e.currentTarget as HTMLElement;
    const columnIndex : number = parseInt(column.dataset.columnIndex ?? "-1");
    if (columnIndex === -1) return true;
    const cellIndex : number = calculateNextCellIndex(columnIndex);
    const columnNextElement : HTMLElement = document.getElementById(`${columnIndex}-${cellIndex}`) as HTMLElement;
    columnNextElement.classList.remove("preview");
    columnNextElement.style.backgroundColor = defaultCellBackgroundColor;
    return true;
}

function onResetButton() : boolean {
    resetColumns();
    resetCells();
    return true;
}

function resetColumns() : void {
    const columns : NodeListOf<HTMLElement> = document.querySelectorAll('.columns');
    columns.forEach((column : Element ) => {
        column.removeEventListener("click", columnHandler);
        column.removeEventListener("mouseover", columnMouseOver);
        column.removeEventListener("mouseout", columnMouseOut);
        column.classList.remove('filled');
    });
}

function resetCells() : void {
    const cells : NodeListOf<HTMLElement> = document.querySelectorAll('.cell');
    cells.forEach((cell: HTMLElement ) : void => {
        cell.style.backgroundColor = defaultCellBackgroundColor;
        cell.classList.remove('filled');
    });
    for ( let i : number =0; i<GAME_WIDTH; i++) {
        GAME_GRID_OCCUPATIONS[i] = 0;
    }
}

function placeColor(cell : HTMLElement, columnIndex : number) : void {
    cell.dataset.isFirst = `${isFirst}`;
    setElementBackgroundColor(cell);
    cell.classList.remove("preview");
    cell.classList.add("filled");

    GAME_GRID_OCCUPATIONS[columnIndex]++;
    isFirst = !isFirst;
}

function getCurrentColor() : String {
    return isFirst ? colorFirstPlayer : colorSecondPlayer;
}

function checkLines(result : Result, cells : NodeListOf<HTMLElement>) : Result {
    console.log("checkLines");
    let countFirst : number = 0;
    let countSecond : number = 0;
    let index : number= -1;
    const matrix : Char[][] = [];
    for ( let i : number=0; i< GAME_HEIGHT; i++ ) {
        countFirst = 0;
        countSecond = 0;
        const line : Char[] = [];
        for (let j : number=0; j<GAME_WIDTH; j++) {
            index = i + j * GAME_HEIGHT;
            if (cells[index].classList.contains('filled')) {
                if (cells[index].dataset.isFirst === "true") {
                    line.push('F');
                    countFirst++;
                    countSecond = 0;
                } else {
                    line.push('S');
                    countSecond++;
                    countFirst = 0;
                }
            } else {
                line.push('/');
                countFirst = 0;
                countSecond = 0;
            }
            if (countFirst === COUNT_TO_WIN || countSecond === COUNT_TO_WIN) {
                result.hasWinner = true;
                if (countFirst === COUNT_TO_WIN) {
                    result.winner = 'first';
                } else if (countSecond === COUNT_TO_WIN ) {
                    result.winner = 'second';
                }
                console.log("Winner !");
                return result;
            }
        }
        matrix.push(line);

    }
    console.table(matrix);
    return result;
}

function checkColumns(result : Result, cells : NodeListOf<HTMLElement> ) : Result {
    console.log("checkColumns");
    let countFirst : number = 0;
    let countSecond : number = 0;
    for ( let i : number =0; i< cells.length; i++ ) {
        if (i === GAME_WIDTH-1 ) {
            countFirst = 0;
            countSecond = 0;
        }
        if (cells[i].classList.contains('filled')) {
            if (cells[i].dataset.isFirst === "true") {
                countFirst++;
                countSecond = 0;
            } else {
                countSecond++;
                countFirst = 0;
            }
        } else {
            countFirst = 0;
            countSecond = 0;
        }
        if (countFirst === COUNT_TO_WIN || countSecond === COUNT_TO_WIN) {
            result.hasWinner = true;
            if (countFirst === COUNT_TO_WIN) {
                result.winner = 'first';
            } else if (countSecond === COUNT_TO_WIN ) {
                result.winner = 'second';
            }
            return result;
        }

    }
    return result;
}

function checkDiagonals(result : Result, cells : NodeListOf<HTMLElement>) : Result {
    return result;
}
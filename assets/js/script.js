// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    const gameArea = document.getElementById('game-area')
    const wormGame = new WormGame(gameArea, 20, 20);
    document.onkeydown = (event) => {
        if (!event.repeat) {
            wormGame.keyDown(event.keyCode);
        }
    };
});

class WormGame {
    constructor(area, rows, cols, callback) {
        this.area = area;
        this.area.style.setProperty('--rows', rows);
        this.area.style.setProperty('--cols', cols);
        this.rows = rows;
        this.cols = cols;
        this.grid = {};
        this.createGrid();
        this.callback = callback;
    }

    createGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                this.grid[row + ',' + col] = cell;
                this.area.appendChild(cell);
            }
        }
    }
}
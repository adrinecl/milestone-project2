// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    // This function is called each time the level, score or game over change.
    const callback = (level, score, gameOver) => {
        document.getElementById('level').innerText = level;
        document.getElementById('score').innerText = score;
        console.log(level, score, gameOver);
    };
    const gameArea = document.getElementById('game-area')
    const wormGame = new WormGame(gameArea, 20, 20, callback);

    document.onkeydown = (event) => {
        if (!event.repeat) {
            wormGame.keyDown(event.keyCode);
        }
    };

    // Connect the "New Game" button on the page to the wormGame.
    const newGame = document.getElementById('new-game');
    newGame.addEventListener('click', () => {
        wormGame.startNewGame();
        newGame.blur();
    });

    // Connect the audio toggle on the page to the wormGame.
    const soundToggle = document.getElementById('sound');
    soundToggle.addEventListener('click', () => {
        wormGame.settings.audio = soundToggle.checked;
    });
});

class WormGame {
    constructor(area, rows, cols, callback) {
        this.area = area;
        this.area.style.setProperty('--rows', rows);
        this.area.style.setProperty('--cols', cols);
        this.rows = rows;
        this.cols = cols;
        this.grid = {};
        this.loadAudio();
        this.createGrid();
        this.callback = callback;
        this.settings = {
            audio: false
        };
    }

    loadAudio() {
        this.audio = {
            eat_candy: new Audio('assets/audio/mixkit-unlock-game-notification-253.mp3'),
            new_level: new Audio('assets/audio/mixkit-player-boost-recharging-2040.mp3'),
            game_over: new Audio('assets/audio/mixkit-player-losing-or-failing-2042.mp3'),
            worm_dead: new Audio('assets/audio/mixkit-arcade-space-shooter-dead-notification-272.mp3')
        };
    }

    playAudio(name) {
        if (this.settings.audio) {
            this.audio[name].play();
        }
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

    invokeCallback() {
        this.callback(this.level, this.score, this.gameOver);
    }

    startNewGame() {
        this.gameOver = false;
        this.score = 0;
        this.level = 1;
        this.levelLengthGoal = 5;
        this.speed = 200;
        this.startNewLevel();
        this.invokeCallback();
    }

    startNewLevel() {
        this.candy = [];
        this.createNewWorm();
        this.createNewCandy();
        this.resetArea();
        this.resetGrid();
        this.placeWorm();
        this.placeCandy();
        this.resetGameTimer();
        this.startGameTimer();
        this.playAudio('new_level');
    }

    createNewWorm() {
        const headRow = this.randomRow(3);
        const headCol = this.randomRow(3);
        const goRight = headCol < this.cols / 2;
        const wormDir = goRight ? 1 : 3; // up, right, down, left
        const tailRow = headRow;
        const tailCol = goRight ? headCol - 1 : headCol + 1;
        const head = {
            row: headRow,
            col: headCol,
            color: this.randomColor()
        };
        const tail = {
            row: tailRow,
            col: tailCol,
            color: this.randomColor()
        };
        this.turn = 0;
        this.worm = {
            parts: [head, tail],
            direction: wormDir
        };
    }

    createNewCandy() {
        while (true) {
            const row = this.randomRow(1);
            const col = this.randomCol(1);
            const cell = this.getCell(row, col);

            if (cell.dataset.color) {
                continue;
            }
            if (cell.dataset.candy) {
                continue;
            }

            this.candy.push({
                row: row,
                col: col,
                color: this.randomColor()
            });
            break;
        }
    }

    randomRow(inset) {
        return Math.floor(Math.random() * (this.rows - inset * 2)) + inset;
    }

    randomCol(inset) {
        return Math.floor(Math.random() * (this.cols - inset * 2)) + inset;
    }

    randomColor() {
        return Math.floor(Math.random() * 5);
    }

    resetArea() {
        this.area.classList.remove('game-over');
    }

    resetGrid() {
        for (let cell of Object.values(this.grid)) {
            this.resetCell(cell);
        }
    }

    resetCell(cell) {
        delete cell.dataset.color;
        delete cell.dataset.candy;
        delete cell.dataset.indir;
        delete cell.dataset.outdir;
        cell.classList.remove('head');
        cell.classList.remove('tail');
    }

    placeWorm() {
        for (let part of this.worm.parts) {
            const cell = this.getCell(part.row, part.col);
            cell.dataset.color = part.color;
        }

        const head = this.worm.parts[0];
        const tail = this.worm.parts[this.worm.parts.length - 1];
        const headCell = this.getCell(head.row, head.col);
        const tailCell = this.getCell(tail.row, tail.col);
        headCell.classList.add('head');
        tailCell.classList.add('tail');
        headCell.dataset.indir = this.worm.direction;
        tailCell.dataset.outdir = this.worm.direction;
    }

    placeCandy() {
        for (let candy of this.candy) {
            const cell = this.getCell(candy.row, candy.col);
            cell.dataset.candy = candy.color;
        }
    }

    endGame() {
        this.gameOver = true;
        this.area.classList.add('game-over');
        this.resetGameTimer();
        this.playAudio('game_over');
    }

    resetGameTimer() {
        clearInterval(this.timer);
        delete this.timer;
    }

    startGameTimer() {
        this.timer = setInterval(() => this.move(), this.speed);
    }

    keyDown(keyCode) {
        if (keyCode == 37 || keyCode == 39) {
            this.turn = keyCode == 37 ? -1 : +1;
        }
    }

    move() {
        this.moveHead();
        this.moveBody();
        const tail = this.moveTail();

        if (this.isGameOver()) {
            this.endGame();
            this.invokeCallback();
            return;
        }

        const candy = this.eatCandy();
        if (candy) {
            this.score += 1;
            this.growTail(tail, candy);
            this.createNewCandy();
            this.placeCandy();
            this.invokeCallback();
        }

        if (this.worm.parts.length == this.levelLengthGoal) {
            this.level += 1;
            this.levelLengthGoal += 5;
            this.speed = Math.max(50, this.speed - 50);
            this.startNewLevel();
            this.invokeCallback();
        }
    }

    moveHead() {
        const head = this.worm.parts[0];
        let row = head.row;
        let col = head.col;
        let dir = (this.worm.direction + this.turn + 4) % 4;

        switch (dir) {
            case 0:
                row -= 1;
                break;
            case 1:
                col += 1;
                break;
            case 2:
                row += 1;
                break;
            case 3:
                col -= 1;
                break;
        }

        this.turn = 0;
        this.worm.direction = dir;
        this.worm.parts.unshift({
            row: row,
            col: col,
            color: head.color
        });

        const from = this.getCell(head.row, head.col);
        from.dataset.outdir = dir;
        from.classList.remove('head');

        if (this.inGameArea(row, col)) {
            const cell = this.getCell(row, col);
            cell.dataset.color = head.color;
            cell.dataset.indir = dir;
            cell.dataset.outdir = dir;
            cell.classList.add('head');
        }
    }

    moveBody() {
        for (let i = 1; i < this.worm.parts.length - 1; i++) {
            const part = this.worm.parts[i];
            const next = this.worm.parts[i + 1];
            const cell = this.getCell(part.row, part.col);
            part.color = next.color;
            cell.dataset.color = part.color;
        }
    }

    moveTail() {
        const tail = this.worm.parts.pop();
        const last = this.worm.parts[this.worm.parts.length - 1];
        const from = this.getCell(tail.row, tail.col);
        const cell = this.getCell(last.row, last.col);
        from.classList.remove('tail');
    
        // Don't mark the cell as a tail cell if the head is already there,
        // that is that head has eaten the tail! We could handle this case in
        // the CSS as well, but it gets a bit messy with a lot of duplicated
        // code, so to keep things simple, we only allow a cells to be either
        // head or tail, but not both at the same time.
        if (!cell.classList.contains('head')) {
            cell.classList.add('tail');
        }
    
        // Don't clear the body color of the cell that the tail used to be in,
        // if the head is now located there, because it will have overwritten
        // the color with its own, so clearing it here would mess with that.
        if (!from.classList.contains('head')) {
            delete from.dataset.color;
        }
    
        return tail;
    }

    growTail(tail, candy) {
        const last = this.worm.parts[this.worm.parts.length - 1];
        const cell = this.getCell(tail.row, tail.col);
        const from = this.getCell(last.row, last.col);
        tail.color = candy.color;
        this.worm.parts.push(tail);
        cell.dataset.color = tail.color;
        cell.dataset.outdir = from.dataset.indir;
        cell.classList.add('tail');
        from.classList.remove('tail');
    }

    eatCandy() {
        for (let i = 0; i < this.candy.length; i++) {
            const head = this.worm.parts[0];
            const item = this.candy[i];
            const cell = this.getCell(item.row, item.col);
            if (item.row == head.row && item.col == head.col) {
                this.playAudio('eat_candy');
                delete cell.dataset.candy;
                this.candy.splice(i, 1);
                return item;
            }
        }
        return null;
    }

    isGameOver() {
        const head = this.worm.parts[0];
        if (!this.inGameArea(head.row, head.col)) {
            console.log("Game over: hit a wall");
            return true;
        }
        if (this.inWormBody(head.row, head.col)) {
            console.log("Game over: hit the worm");
            return true;
        }
        return false;
    }

    inGameArea(row, col) {
        return row >= 0 && col >= 0 && row < this.rows && col < this.cols;
    }

    inWormBody(row, col) {
        for (let i = 1; i < this.worm.parts.length; i++) {
            const part = this.worm.parts[i];
            if (row == part.row && col == part.col) {
                return true;
            }
        }
        return false;
    }

    getCell(row, col) {
        return this.grid[row + ',' + col];
    }
}
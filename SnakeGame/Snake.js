class Snake {
    constructor(game) {
        this.game = game;

        // direction the snake is facing
        this.direction = "R";

        // the queue containing all the snake body parts locations
        this.squeue = new Queue();
        this.head = [2, 3];
        // start off as a 3 unit long snake
        this.squeue.enqueue([2, 1]);
        this.squeue.enqueue([2, 2]);
        this.squeue.enqueue([2, 3]);
        this.appleCount = 0;

        // the input from the user
        this.input = "R";

        pageCounter.textContent = "Apples Eaten: " + this.appleCount;
    }

    move() {
        // checks for if user presses on opposite side key
        // (snake can't turn opposite direction)
        if ((this.input != "R" && this.direction == "L"
            || this.input != "L" && this.direction == "R"
            || this.input != "U" && this.direction == "D"
            || this.input != "D" && this.direction == "U")
            && this.input != null) {
            this.direction = this.input;
        }

        // gets the next tile (in the direction the snake's facing)
        let [hx, hy] = this.head;
        switch (this.direction) {
            case "R":
                this.head = [hx, hy + 1];
                break;

            case "U":
                this.head = [hx - 1, hy];
                break;

            case "L":
                this.head = [hx, hy - 1];
                break;

            case "D":
                this.head = [hx + 1, hy];
                break;
        }
        this.squeue.enqueue([this.head[0], this.head[1]]);
        let tail;

        // check if apple is eaten
        [hx, hy] = this.head;
        let [ax, ay] = game.apple;
        if (hx == ax && hy == ay) {
            tiles[ax][ay].classList.remove("apple");
            this.appleCount++;
            this.game.apple = game.newAppleLoc();
            pageCounter.textContent = "Apples Eaten: " + this.appleCount;
        } else {
            tail = this.squeue.dequeue().data;
        }

        game.tick(this.head, tail);
    }
}

const GameStates = {
    NOT_STARTED: "Game not started yet",
    STARTED: "Game is in play",
    ENDED: "Game has ended"
};

class Game {
    constructor(n) {
        this.n = n;
        this.ticInterval = 200;
    }

    reset() {
        this.board = [...new Array(this.n)].map(() => new Array(this.n).fill("-"));

        this.snake = new Snake(this);
        this.gameState = GameStates.NOT_STARTED;

        // reset tiles on page
        let allTiles = document.getElementsByClassName("snakeBody");
        [...allTiles].forEach(e => e.classList.remove("snakeBody"));

        let appleTiles = document.getElementsByClassName("apple");
        [...appleTiles].forEach(e => e.classList.remove("apple"));

        this.apple = this.newAppleLoc();
        this.debug();

        // keeps the interval to clear it at end of game,
        // otherwise game speeds up on each reset
        // use function() so it's for the snake and not hte window...?
        this.interval = setInterval(function () {
            game.snake.move();
        }, this.ticInterval);

        pageMessages.innerHTML = "Game State: " + game.gameState;
    }

    newAppleLoc() {
        let loc = [Math.floor(Math.random() * this.n), Math.floor(Math.random() * this.n)];
        if (this.board[loc[0]][loc[1]] != "-") {
            return this.newAppleLoc();
        }
        console.log("new apple location: " + loc);

        // change text board
        this.board[loc[0]][loc[1]] = "@";

        // change html
        tiles[loc[0]][loc[1]].classList.add("apple");

        return loc;
    }

    debug() {
        console.log(this.board.join("\n"));
    }

    end() {
        clearInterval(this.interval);
        console.log("Apples collected: " + this.snake.appleCount);
        this.gameState = GameStates.ENDED;
        pageMessages.innerHTML = "Game State: " + this.gameState;
    }

    tick(head, tail) {

        // check if 
        if (head[0] >= this.n || head[1] >= this.n || head[0] < 0 || head[1] < 0) {
            this.end();
            return;
        }
        console.log(head + " " + tail);

        if (this.board[head[0]][head[1]] == '$') {
            this.end();
            return;
        }
        // html page board colors
        tiles[head[0]][head[1]].classList.add("snakeBody");

        if (tail != null) {
            tiles[tail[0]][tail[1]].classList.remove("snakeBody");
        }

        // text board
        this.board[head[0]][head[1]] = '$';
        if (tail != null) {
            this.board[tail[0]][tail[1]] = '-';
        }
        this.debug();
    }
}

let boardSize = 12;
let tiles = [];
// setting the html
let board = document.getElementById("board");
for (let i = 0; i < boardSize; i++) {
    let outerdiv = document.createElement("div");
    outerdiv.classList.add("row");

    let tilesRow = [];
    for (let j = 0; j < boardSize; j++) {
        let innerdiv = document.createElement("div");
        innerdiv.classList.add("tile");
        outerdiv.appendChild(innerdiv);

        tilesRow.push(innerdiv);
    }
    board.appendChild(outerdiv);
    tiles.push(tilesRow);
}

let pageCounter = document.getElementById("counter");
let pageMessages = document.getElementById("messages");
let startButton = document.getElementById("newGame");
startButton.addEventListener('click', start);
let game = new Game(boardSize);

// can use a map to hold all currently pressed keys instead
window.addEventListener("keydown", (event) => {
    if (game.gameState === GameStates.STARTED) {
        let dir;

        // gets snake's current direction
        switch (event.key) {
            case "ArrowUp":
                dir = "U";
                break;
            case "ArrowLeft":
                dir = "L";
                break;
            case "ArrowDown":
                dir = "D";
                break;
            case "ArrowRight":
                dir = "R";
                break;
        }
        game.snake.input = dir;
    }
});

function start() {
    game.reset();
    game.gameState = GameStates.STARTED;
    pageMessages.innerHTML = "Game State: " + game.gameState;
}

// make sure not every key murders snake
// 
class Snake {
    constructor(game) {
        this.game = game;
        this.direction = "R";
        this.squeue = new Queue();
        this.head = [2, 3];
        // start off as a 3 unit long snake
        this.squeue.enqueue([2, 1]);
        this.squeue.enqueue([2, 2]);
        this.squeue.enqueue([2, 3]);
        this.appleCount = 0;
        this.input = "R";

        pageCounter.textContent = "Apples Eaten: " + this.appleCount;
    }

    move() {
        let dir = this.direction;
        if (this.input == "R" && dir == "L"
            || this.input == "L" && dir == "R"
            || this.input == "U" && dir == "D"
            || this.input == "D" && dir == "U") {
        } else {
            this.direction = this.input;
        }
        dir = this.direction;

        if (dir == "R") {
            this.squeue.enqueue([this.head[0], this.head[1] + 1]);
            this.head = [this.head[0], this.head[1] + 1];
        } else if (dir == "U") {
            this.squeue.enqueue([this.head[0] - 1, this.head[1]]);
            this.head = [this.head[0] - 1, this.head[1]];
        } else if (dir == "L") {
            this.squeue.enqueue([this.head[0], this.head[1] - 1]);
            this.head = [this.head[0], this.head[1] - 1];
        } else if (dir == "D") {
            this.squeue.enqueue([this.head[0] + 1, this.head[1]]);
            this.head = [this.head[0] + 1, this.head[1]];
        }
        let tail;

        // check if apple is eaten
        let apple = game.apple;
        if (this.head[0] == apple[0] && this.head[1] == apple[1]) {
            tiles[apple[0]][apple[1]].classList.remove("apple");
            this.appleCount++;
            this.game.apple = game.newAppleLoc();
            pageCounter.textContent = "Apples Eaten: " + this.appleCount;
        } else {
            tail = this.squeue.dequeue().data;
        }

        game.tick(this.head, tail);
    }
}

class Game {
    constructor(n) {
        this.n = n;
    }

    reset() {
        this.board = [];
        for (let i = 0; i < this.n; i++) {
            let row = [];
            for (let j = 0; j < this.n; j++) {
                row.push('-');
            }
            this.board.push(row);
        }

        this.snake = new Snake(this);
        this.gameState = "NOT_STARTED";

        // reset tiles on page
        let allTiles = document.getElementsByClassName("snakeBody");
        while (allTiles.length > 0) {
            allTiles[0].classList.remove("snakeBody");
        }
        let appleTiles = document.getElementsByClassName("apple");
        while (appleTiles.length > 0) {
            appleTiles[0].classList.remove("apple");
        }

        this.apple = this.newAppleLoc();
        this.debug();

        this.interval = setInterval(function () {
            game.snake.move();
        }, 200);

        pageMessages.innerHTML = "Game State: " + game.gameState;
    }

    newAppleLoc() {
        let loc = [Math.round(Math.random() * (this.n - 1)), Math.round(Math.random() * (this.n - 1))];
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
        this.gameState = "ENDED";
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
    if (game.gameState === "IN_PLAY") {
        let dir;

        // gets snake's current direction
        switch (event.key) {
            case "w":
                dir = "U";
                break;
            case "a":
                dir = "L";
                break;
            case "s":
                dir = "D";
                break;
            case "d":
                dir = "R";
                break;
        }
        game.snake.input = dir;
    }
});

function start() {
    game.reset();
    game.gameState = "IN_PLAY";
    pageMessages.innerHTML = "Game State: " + game.gameState;
}


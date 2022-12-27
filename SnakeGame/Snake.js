class Game {
    constructor(snake) {
        this.reset(snake);
    }

    reset(snake) {
        this.n = 7;
        this.board = [];
        for (let i = 0; i < this.n; i++) {
            let row = [];
            for (let j = 0; j < this.n; j++) {
                row.push('-');
            }
            this.board.push(row);
        }
        this.debug();
        this.snake = snake;
        this.gameState = "NOT_STARTED";
        let allTiles = document.getElementsByClassName("snakeBody");
        while (allTiles.length > 0) {
            allTiles[0].classList.remove("snakeBody");
        }
        this.snakeBody = new Set();
        
    }

    debug() {
        console.log(this.board.join("\n"));
    }

    end() {
        console.log(this.snake.size);
        this.gameState = "ENDED";
    }

    tick(head, tail) {

        // check if 
        if (head[0] >= this.n || head[1] >= this.n || head[0] < 0 || head[1] < 0) {
            this.end();
            return;
        }
        this.snakeBody.add(head);
        this.snakeBody.delete(tail);

        console.log(head + " " + tail);

        // board colors
        tiles[head[0]][head[1]].classList.add("snakeBody");

        if (tail != null) {
            tiles[tail[0]][tail[1]].classList.remove("snakeBody");
        }
        this.board[head[0]][head[1]] = '$';
        if (tail != null) {
            this.board[tail[0]][tail[1]] = '-';
        }
        game.debug();
    }
}

class Snake {
    constructor() {
        this.reset();
    }

    reset() {
        this.direction = "R";
        this.snake = new Queue();
        this.head = [2, 3];
        // start off as a 3 unit long snake
        this.snake.enqueue([2, 1]);
        this.snake.enqueue([2, 2]);
        this.snake.enqueue([2, 3]);
        game.tick(this.head, null);

        this.size = 3;
    }

    move() {
        if (this.direction == "R") {
            this.snake.enqueue([this.head[0], this.head[1] + 1]);
            this.head = [this.head[0], this.head[1] + 1];
        } else if (this.direction == "U") {
            this.snake.enqueue([this.head[0] - 1, this.head[1]]);
            this.head = [this.head[0] - 1, this.head[1]];
        } else if (this.direction == "L") {
            this.snake.enqueue([this.head[0], this.head[1] - 1]);
            this.head = [this.head[0], this.head[1] - 1];
        } else if (this.direction == "D") {
            this.snake.enqueue([this.head[0] + 1, this.head[1]]);
            this.head = [this.head[0] + 1, this.head[1]];
        }
        let tail = this.snake.dequeue().data;

        game.tick(this.head, tail);
    }
}

let tiles = [];
// setting the html
let board = document.getElementById("board");
for (let i = 0; i < 7; i++) {
    let outerdiv = document.createElement("div");
    outerdiv.classList.add("row");

    let tilesRow = [];
    for (let j = 0; j < 7; j++) {
        let innerdiv = document.createElement("div");
        innerdiv.classList.add("tile");
        outerdiv.appendChild(innerdiv);

        tilesRow.push(innerdiv);
    }
    board.appendChild(outerdiv);
    tiles.push(tilesRow);
}
let startButton = document.getElementById("newGame");
startButton.addEventListener('click', start);
let game = new Game();
let snake = new Snake();

// can use a map to hold all currently pressed keys instead
window.addEventListener("keydown", (event) => {
    if (game.gameState === "IN_PLAY") {
        switch (event.key) {
            case "w":
                if (snake.direction != "D") {
                    snake.direction = "U";
                }
                break;
            case "a":
                if (snake.direction != "R") {
                    snake.direction = "L";
                }
                break;
            case "s":
                if (snake.direction != "U") {
                    snake.direction = "D";
                }
                break;
            case "d":
                if (snake.direction != "L") {
                    snake.direction = "R";
                }
                break;
            default:
                console.log(event.key);
                break;
        }
        snake.move();
    }
});

function start() {
    snake.reset();
    game.reset(snake);
    game.gameState = "IN_PLAY";
}


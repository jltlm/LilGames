class Game {
    constructor() {
        this.reset();
    }

    reset() {
        this.n = 7;
        this.board = [];
        for (let i = 0; i < this.n; i++) {
            let row = [];
            for (let j = 0; j < this.n; j++) {
                row.push('-');
            }
            this.board.push('-');
        }
    }

    debug() {
        console.log(this.board);
    }

    tick(snake) {
        this.board[snake.head[0]][snake.head[1]] = '$';
        this.board[snake.tail[0]][snake.tail[1]] = '-';
    }
}

class Snake {
    constructor(game) {
        this.reset();
    }

    reset() {
        this.direction = "R";
        // so I could do a queue-type of array, but this is fun too
        this.head = [2, 0];
        this.tail = [1, 0];
        game.tick(this);
    }
}

// setting the html
let board = document.getElementById("board");
for (let i = 0; i < 7; i++) {
    board.innerHTML += "<div>";
    for (let j = 0; j < 7; j++) {
        board.innerHTML += "<div class='tile'></div>";
    }
    board.innerHTML += "</div>";
}
let startButton = document.getElementById("newGame");
startButton.addEventListener('click', start);

let game = new Game();

function start() {
    let snake = new Snake(board);
    console.log(game.board);

}


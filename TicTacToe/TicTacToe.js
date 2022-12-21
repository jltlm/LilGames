class Game {

    constructor() {
        this.reset();
    }

    // resets the board
    reset() {
        this.n = 3;
        this.winner = [];
        this.moves = 0;
        this.user = 'X';
        this.board = [];
        for (let i = 0; i < this.n; i++) {
            let row = new Array(this.n).fill('-', 0);
            this.board.push(row);
        }
        this.messages = "Game - START!";
        this.complete = false;
    }

    // displays the board in text form
    // don't really need this, but it's good to see
    displayBoard() {
        let text = this.board.map(row => row.join(" ")).join("\n");
        console.log(text);
        return text;
    };

    // returns any messages from the game
    getMessages() {
        return this.messages;
    }

    // returns current user
    makeMove(x, y) {
        this.messages = "";
        if (this.complete) {
            this.messages = "GAME COMPLETED";
            return this.user;
        }

        if (this.board[x][y] !== '-') {
            this.messages = "Invalid move! Try again!";
            return this.user === 'X' ? 'O' : 'X';
        }

        this.board[x][y] = this.user;
        this.moves++;

        if (this.isWin(x, y)) {
            // string literal- why not just make every string like this then?
            // seems easier to do so, + consistency
            this.messages = `${this.user} is the winner!`;
            this.complete = true;
            highlightWinner();
            console.log(this.winner);
            return this.user;
        }

        if (this.moves === 9) {
            this.messages = "It's a tie!";
            return this.user;
        }

        let justWent = this.user;
        this.user = this.user === 'X' ? 'O' : 'X';
        return justWent;
    };

    // checks if a move makes a user win
    isWin(x, y) {
        let win1 = true;
        let win2 = true;
        let win3 = true;
        let win4 = true;

        
        // check row
        for (let i = 0; i < this.n; i++) {
            this.winner.push(`${x}${i}`);
            if (this.board[x][i] !== this.user) {
                win1 = false;
                this.winner = [];
                break;
            }
        }
        if (win1) {
            return true;
        }
        // check col
        for (let i = 0; i < this.n; i++) {
            this.winner.push(`${i}${y}`);
            if (this.board[i][y] !== this.user) {
                win2 = false;
                this.winner = [];
                break;
            }
        }
        if (win2) {
            return true;
        }

        // check diags
        for (let i = 0; i < this.n; i++) {
            this.winner.push(`${i}${i}`);
            if (this.board[i][i] !== this.user) {
                win3 = false;
                this.winner = [];
                break;
            }
        }
        if (win3) {
            return true;
        }

        for (let i = 0; i < this.n; i++) {
            this.winner.push(`${i}${this.n - 1 - i}`);
            if (this.board[i][this.n - 1 - i] !== this.user) {
                win4 = false;
                this.winner = [];
                break;
            }
        }
        if (win4) {
            return true;
        }

        return win1 || win2 || win3 || win4;
    };

}

let game = new Game();
let moves = document.getElementById("moves");
let messages = document.getElementById("messages");
let reset = document.getElementById("newGame");
let currPlayer = document.getElementById("currPlayer");
let buttons = [];
makeButtons();

// making the buttons and setting them to the game
function makeButtons() {
    for (let i = 0; i < game.n; i++) {
        for (let j = 0; j < game.n; j++) {
            aButton(i, j);
        }
    }
}

function aButton(i, j) {
    let button = document.getElementById(`${i}${j}`);
    button.addEventListener('click', function () {
        if (game.complete) {
            return;
        }
        buttons.push(button);

        let m = game.makeMove(i, j);

        button.classList.add("chosen");
        button.textContent = m;
        messages.textContent = "Messages: " + game.getMessages();
        debug.textContent = game.displayBoard();
        moves.textContent = "Move count: " + game.moves;
        currPlayer.textContent = "Current Player: " + game.user;
    });

}

function highlightWinner() {
    game.winner.forEach(tile => {
        document.getElementById(tile).classList.add("winner");
    });
}

// all the html bits that are reset upon a new game
function start() {
    console.log("New Game Started!");
    game.reset();
    let tiles = document.getElementsByClassName("winner");
    while (tiles.length > 0) {
        tiles[0].classList.remove("winner");
    }
    tiles = document.getElementsByClassName("chosen");
    while (tiles.length > 0) {
        tiles[0].classList.remove("chosen");
    }
    console.log(game.complete);
    document.getElementById("debug").textContent = game.displayBoard();
    moves.textContent = "Move count: " + game.moves;
    currPlayer.textContent = "Current Player: X";
    messages.textContent = "Messages: " + game.getMessages();
    buttons.forEach(element => element.textContent = ".");
}

reset.addEventListener('click', start);

// game... START!!!!
start();
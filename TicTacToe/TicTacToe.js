class Game {
    moves = 0;
    user = 'X';
    board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
    messages = "Game - START!";
    complete = false;

    reset() {
        this.moves = 0;
        this.user = 'X';
        this.board = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
        this.messages = "Game - START!";
        this.complete = false;
    }

    getMoves() {
        return this.moves;
    };

    displayBoard() {
        let text = '';
        for (let i = 0; i < 3; i++) {
            for (let k = 0; k < 3; k++) {
                text += " " + this.board[i][k];
            }
            text += "\n";
        }
        console.log(text);
        return text;
    };

    getMessages() {
        return this.messages;
    }

    makeMove(x, y) {
        this.messages = "";
        if (this.complete) {
            this.messages = "GAME COMPLETED";
            return;
        }

        if (this.board[x][y] != '-') {
            this.messages = "Invalid move! Try again!";
            if (this.user == 'X') {
                return 'O';
            } else {
                return 'X';
            }
        }

        this.board[x][y] = this.user;
        this.moves++;

        if (this.isWin(x, y)) {
            this.messages = this.user + " is the winner!";
            this.complete = true;
            return this.user;
        }

        if (this.moves == 9) {
            this.messages = "It's a tie!";
            return this.user;
        }

        if (this.user == 'X') {
            this.user = 'O';
            return 'X';
        } else {
            this.user = 'X';
            return 'O';
        }
    };

    isWin(x, y) {
        let win1 = true;
        let win2 = true;
        let win3 = true;
        let win4 = true;

        // check row
        for (let i = 0; i < 3; i++) {
            if (this.board[x][i] != this.user) {
                win1 = false;
            }
        }
        // check col
        for (let i = 0; i < 3; i++) {
            if (this.board[i][y] != this.user) {
                win2 = false;
            }
        }

        // check diags
        for (let i = 0; i < 3; i++) {
            if (this.board[i][i] != this.user) {
                win3 = false;
            }
        }

        for (let i = 0; i < 3; i++) {
            if (this.board[i][2 - i] != this.user) {
                win4 = false;
            }
        }

        return win1 || win2 || win3 || win4;
    };

}

let game = new Game();
let moves = document.getElementById("moves");
let messages = document.getElementById("messages");
let reset = document.getElementById("newGame");
let buttons = new Array();
makeButtons();
buttons.forEach(element => element.innerHTML = ".");

function makeButtons() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let button = document.getElementById(i + "" + j);
            button.addEventListener('click', function () {
                if (game.complete) {
                    return;
                }
                buttons.push(button);

                let m = game.makeMove(i, j);

                button.innerHTML = m;
                messages.innerHTML = "Messages: " + game.getMessages();
                debug.innerHTML = game.displayBoard();
                moves.innerHTML = "Move count: " + game.getMoves();
            });
        }
    }
}

function start() {
    console.log("New Game Started!");
    game.reset();
    console.log(game.complete);
    document.getElementById("debug").innerHTML = game.displayBoard();
    moves.innerHTML = "Move count: " + game.getMoves();
    messages.innerHTML = "Messages: " + game.getMessages();
    buttons.forEach(element => element.innerHTML = ".");
}

// why does this only work when I use "function()"?
reset.addEventListener('click', function () {
    start();
});


start();
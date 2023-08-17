const cells = document.querySelectorAll("[data-cell]");
const status = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            status.textContent = `Player ${cells[a].textContent} wins!`;
            gameActive = false;
            return cells[a].textContent;
        }
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        status.textContent = "It's a draw!";
        gameActive = false;
        return "draw";
    }

    return null;
};

const handleCellClick = (e) => {
    const cell = e.target;
    const index = [...cells].indexOf(cell);

    if (cell.textContent === "" && gameActive) {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        const winner = checkWinner();
        if (winner) {
            if (winner === "draw") {
                status.textContent = "It's a draw!";
            } else {
                status.textContent = `Player ${winner} wins!`;
            }
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
};

const restartGame = () => {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O", "winner");
    });
    currentPlayer = "X";
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);

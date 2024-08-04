const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-cell'));

    if (boardState[cellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.color = currentPlayer === 'X' ? '#FF6347' : '#1E90FF';

    if (checkWin()) {
        status.textContent = `${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        status.textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some((condition) => {
        return condition.every((index) => {
            return boardState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return boardState.every((cell) => {
        return cell !== '';
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
}

board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);

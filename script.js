let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
const statusDisplay = document.getElementById("status");

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]           
];

function handleClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (gameBoard[index] !== "" || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.textContent = `Player ${currentPlayer} Wins! 🎉`;
    isGameActive = false;
    return;
  }

  if (!gameBoard.includes("")) {
    statusDisplay.textContent = "It's a Draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
}

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleClick));
statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;

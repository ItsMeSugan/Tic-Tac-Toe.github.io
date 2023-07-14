const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
let circleTurn;
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.getElementById("restartButton");
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

// // Restart the game by event listener and calling the startGame function // //
restartButton.addEventListener("click", startGame);

// // starting the game by looping and removing classes // //
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleclick);
    cell.addEventListener("click", handleclick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

// // Hovering X and O before clicking // //
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

// // Target the click and find whether Win or Draw // //
function handleclick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  // place mark
  placeMark(cell, currentClass);

  // check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    // check for draw
    endGame(true);
  } else {
    // switch turns
    swapTurn();
    setBoardHoverClass();
  }
}

// Placing the Marking //
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// Swapping turn //
function swapTurn() {
  circleTurn = !circleTurn;
}

// // Checking the winning combination // //
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// // Checking for draw using every method // //
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

// // Ending the game with message and using show class // //
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

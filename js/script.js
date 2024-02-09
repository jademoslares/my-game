//variables
const boardEls = document.getElementById("board");
const modalEls = document.getElementById("myModal");
const btnEls = document.getElementsByClassName("btnGame1")[0];
const gameMessageEls = document.getElementById("game-message");
let enemies = [];
let board = [];
let rows = 4;
let columns = 5;
let firstChoice, secondChoice;
let cardSet; //holder of current game cards
let gameTime = 60;
let isTimerRunning;
let guess = 10;
let level = 1;
let enemiesRemaining;
let isWinner;

function render() {
  shuffleCards();
  startGame();
  gameInfo();
  isTimerRunning = true;
  setTimeout(gameTimeCountdown, 1500);
}
function shuffleCards() {
  if (level === 1) {
    columns = 3;
    rows = 2;
    enemiesRemaining = 3;
  } else if (level === 2) {
    columns = 4;
    rows = 2;
    enemiesRemaining = 4;
  } else if (level === 3) {
    columns = 4;
    rows = 3;
    enemiesRemaining = 6;
  } else if (level === 4) {
    columns = 4;
    rows = 4;
    enemiesRemaining = 8;
  } else if (level === 5) {
    columns = 5;
    rows = 4;
    enemiesRemaining = 10;
  }

  for (let i = 1; i <= enemiesRemaining; i++) {
    enemies.push("alien" + i);
  }
  cardSet = enemies.concat(enemies);
  for (let i = 0; i < cardSet.length; i++) {
    let x = Math.floor(Math.random() * cardSet.length);

    let tempHolder = cardSet[i];
    cardSet[i] = cardSet[x];
    cardSet[x] = tempHolder;
  }
}
function startGame() {
  // making of the board
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let hiddenImg = cardSet.pop();
      row.push(hiddenImg);

      let cardEls = document.createElement("img");
      cardEls.id = r.toString() + "-" + c.toString();
      cardEls.src = "/img/enemies/" + hiddenImg + ".png";
      cardEls.classList.add("alien");
      cardEls.addEventListener("click", selectCard);
      cardEls.style.width = 100 / columns + "%";
      cardEls.style.height = 100 / rows + "%";

      boardEls.append(cardEls);
    }
    board.push(row);
  }
  //show card for 1 second before hiding
  setTimeout(hideCards, 1000);
}

function gameInfo() {
  let gameTopEls = document.querySelector("#top-info");
  gameTopEls.innerHTML = `<h2>Memory Train</h2>
  <p>Level ${level} <span>Lives ${guess} Time ${gameTime}</span></p>`;
}

function hideCards() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let backCardEls = document.getElementById(
        r.toString() + "-" + c.toString()
      );
      let x = Math.floor(Math.random() * 6);
      backCardEls.src = "/img/holder/holder" + x.toString() + ".png";
    }
  }
}

function selectCard() {
  if (this.src.includes("holder")) {
    if (!firstChoice) {
      firstChoice = this;

      let cardID = firstChoice.id.split("-");
      let i = parseInt(cardID[0]);
      let d = parseInt(cardID[1]);

      firstChoice.src = "/img/enemies/" + board[i][d] + ".png";
    } else if (!secondChoice && this != firstChoice) {
      secondChoice = this;

      let cardID = secondChoice.id.split("-");
      let i = parseInt(cardID[0]);
      let d = parseInt(cardID[1]);

      secondChoice.src = "/img/enemies/" + board[i][d] + ".png";
      setTimeout(update, 1000);
    }
  }
}

function update() {
  //card choices checker
  if (firstChoice.src != secondChoice.src) {
    let x = Math.floor(Math.random() * 6);
    firstChoice.src = "/img/holder/holder" + x.toString() + ".png";
    secondChoice.src = "/img/holder/holder" + x.toString() + ".png";

    guess -= 1;
    gameInfo();
  } else {
    enemiesRemaining -= 1;
  }
  checkWinner();
  firstChoice = null;
  secondChoice = null;
}
function checkWinner() {
  if (gameTime === 0) {
    isWinner = false;
    isTimerRunning = false;
    boardEls.classList.add("disabled");
    gameMessageEls.innerHTML = "Times Up! Better Luck next time!";
    modalEls.style.display = "block";
    btnEls.innerHTML = "Restart";
  } else if (guess === 0) {
    isWinner = false;
    isTimerRunning = false;
    boardEls.classList.add("disabled");
    gameMessageEls.innerHTML = "Nice Try! You lose!";
    modalEls.style.display = "block";
    btnEls.innerHTML = "Restart";
  } else if (enemiesRemaining === 0 && level != 5) {
    isWinner = true;
    isTimerRunning = false;
    boardEls.classList.add("disabled");
    gameMessageEls.innerHTML = "Congratulations! You won!";
    modalEls.style.display = "block";
    btnEls.innerHTML = "Next Level";
  } else if (enemiesRemaining === 0 && level === 5) {
    isWinner = true;
    isTimerRunning = false;
    boardEls.classList.add("disabled");
    gameMessageEls.innerHTML = "Congratulations! You beat the game!";
    modalEls.style.display = "block";
    btnEls.innerHTML = "Play Again";
  }
}
btnEls.onclick = function () {
  if (isWinner) {
    if (level === 5) {
      level = 1;
      updateGame();
    } else {
      level += 1;
      updateGame();
    }
  } else if (!isWinner) {
    level = 1;
    updateGame();
  }
};

function updateGame() {
  modalEls.style.display = "none";
  boardEls.classList.remove("disabled");
  board = [];
  enemies = [];
  firstChoice = null;
  secondChoice = null;
  gameTime = 60;
  guess = 10;
  isWinner = null;
  empty(boardEls);
  render();
}

function empty(element) {
  while (element.firstElementChild) {
    element.firstElementChild.remove();
  }
}
function gameTimeCountdown() {
  if (!isTimerRunning) return;
  if (gameTime != 0) {
    gameTime -= 1;
    gameInfo();
    setTimeout(gameTimeCountdown, 1500);
  } else {
    checkWinner();
  }
}
render();

//variables
const boardEls = document.getElementById("board");
const modalEls = document.getElementById("myModal");
const btnRestartEls = document.getElementsByClassName("btnRestart")[0];
const gameMessageEls = document.getElementById("game-message");
const enemies = [
  "alien1",
  "alien2",
  "alien3",
  "alien4",
  "alien5",
  "alien6",
  "alien7",
  "alien8",
  "alien9",
  "alien10",
];
let board = [];
let rows = 4;
let columns = 5;
let firstChoice, secondChoice;
let cardSet; //holder of current game cards
let gameTime = 60;
let guess = 10;
let level = 1;
let enemiesRemaining = 10;
let isWinner;

function render() {
  shuffleCards();
  startGame();
  gameInfo();
  setTimeout(gameTimeCountdown, 1500);
}
function shuffleCards() {
  enemiesRemaining = 10;
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

  let gameBottomEls = document.querySelector("#bottom-info");
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
    boardEls.classList.add("disabled");
    gameMessageEls.innerHTML = "Times Up! Better Luck next time!";
    modalEls.style.display = "block";
  } else if (guess === 0) {
    isWinner = false;
    boardEls.classList.add("disabled");
    gameMessageEls.innerHTML = "Nice Try! You lose!";
    modalEls.style.display = "block";
  } else if (enemiesRemaining === 0) {
    isWinner = true;
    boardEls.classList.add("disabled");
    gameMessageEls.innerHTML = "Congratulations! You won!";
    modalEls.style.display = "block";
  }
}
btnRestartEls.onclick = function () {
  debugger;
  modalEls.style.display = "none";
  boardEls.classList.remove("disabled");
  board = [];
  rows = 4;
  columns = 5;
  firstChoice =null;
  secondChoice = null;
  cardSet = [];
  gameTime = 60;
  guess = 10;
  level = 1;
  enemiesRemaining = 10;
  isWinner;
  empty(boardEls);
  render();
};
function empty(element){
  while(element.firstElementChild){
    element.firstElementChild.remove();
  }
}
function gameTimeCountdown() {
  if (gameTime != 0) {
    gameTime -= 1;
    gameInfo();
    setTimeout(gameTimeCountdown, 1000);
  } else {
    checkWinner();
  }
}
render();

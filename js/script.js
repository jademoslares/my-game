//variables
const enemies = [
  alien1,
  alien2,
  alien3,
  alien4,
  alien5,
  alien6,
  alien7,
  alien8,
  alien9,
  alien10,
];
let board = [];
let rows = 3;
let columns = 10;
let firstChoice, secondChoice;

let cardSet; //holder of current game cards
let time = 0;
let guess = 5;
let numMatchToWin = 0;
let userMatch = 0;

function render() {
  shuffleCards();
  startGame();
}
function shuffleCards() {
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

      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = "/enemies/" + hiddenImg + ".png";
      card.classList.add("card");
      card.addEventListener("click", selectCard);
      document.getElementById("board").append(card);
    }
    board.push(row);
  }

  const boardEls = document.getElementById("board");

  //   boardEls.addEventListener("click",(event =>{
  //     if(event.target.tagName ==="IMG"){
  //         selectCard();
  //     }
  //   }));
  //show card for 1 second before hiding
  setTimeout(hideCards, 1000);
}

function hideCards() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      let x = Math.floor(Math.random() * 6);
      card.src = "/holder/holder" + x.toString();
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

      firstChoice.src = board[i][d] + ".png";
    } else if (!secondChoice && this != firstChoice) {
      secondChoice = this;

      let cardID = secondChoice.id.split("-");
      let i = parseInt(cardID[0]);
      let d = parseInt(cardID[1]);

      secondChoice.src = board[i][d] + ".png";
      setTimeout(update, 1000);
    }
  }
}

function update() {
  //card choices checker
  if (firstChoice.src != secondChoice.src) {
    firstChoice.src = "";
    secondChoice.src = "";

    guess -= 1;
  }

  firstChoice = null;
  secondChoice = null;
}
function gameTime(cb) {}

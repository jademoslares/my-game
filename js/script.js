//variables
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
let time = 0;
let guess = 5;
let numMatchToWin = 0;
let userMatch = 0;

window.onload = function () {
  render();
};
function render() {
  shuffleCards();
  startGame();
  console.log("javascript is ok");
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
      card.src = "/img/enemies/" + hiddenImg + ".png";
      card.classList.add("alien");
      card.addEventListener("click", selectCard);
      card.style.width = 100/columns +"%";
      card.style.height = 100/row +"%";
      document.getElementById("board").append(card);
    }
    board.push(row);
  }
  const alienEls = document.querySelector(".alien");
  alienEls.style
  //const boardEls = document.getElementById("board");
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
      card.src = "/img/holder/holder" + x.toString()+".png";
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
    firstChoice.src = "/img/holder/holder" + x.toString()+".png";
    secondChoice.src = "/img/holder/holder" + x.toString()+".png";

    guess -= 1;
  }

  firstChoice = null;
  secondChoice = null;
}
function gameTime(cb) {}

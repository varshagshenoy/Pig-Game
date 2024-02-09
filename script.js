"use strict";

let dice;
let currentScore = 0;
let totalScore = [0, 0];
let activePlayer = 1;
let gamePlaying = true;
let diceEl = document.querySelector(".dice");
let player1AreaEl = document.querySelector("#player1-area");
let player2AreaEl = document.querySelector("#player2-area");

// New Game Button*******************************************************

document
  .querySelector(".new-game-button")
  .addEventListener("click", function () {
    currentScore = 0;
    document.querySelector(`#current-score1`).textContent = 0;
    document.querySelector(`#current-score2`).textContent = 0;
    totalScore = [0, 0];
    document.querySelector(`#total-score1`).textContent = 0;
    document.querySelector(`#total-score2`).textContent = 0;
    document
      .querySelector(`#player${activePlayer}-area`)
      .classList.remove("winner");
    document.querySelector(
      `#player${activePlayer}-area h1`
    ).textContent = `PLAYER-${activePlayer}`;
    activePlayer = changeActivePlayer(2);
    gamePlaying = true;
    player1AreaEl.classList.add("active-player");
    diceEl.classList.add("hidden");
  });

// Roll Dice Button******************************************************

document
  .querySelector(".roll-dice-button")
  .addEventListener("click", function () {
    if (gamePlaying) {
      dice = Math.trunc(Math.random() * 6) + 1;
      diceEl.classList.remove("hidden");
      diceEl.src = `dice-${dice}.png`;
      if (dice !== 1) {
        currentScore += dice;
        document.querySelector(`#current-score${activePlayer}`).textContent =
          currentScore;
      } else {
        currentScore = 0;
        document.querySelector(`#current-score${activePlayer}`).textContent =
          currentScore;
        activePlayer = changeActivePlayer(activePlayer);
      }
    }
  });

// Hold Button***********************************************************

document.querySelector(".hold-button").addEventListener("click", holdButton);

function holdButton() {
  if (gamePlaying) {
    totalScore[activePlayer - 1] += currentScore;
    document.querySelector(`#total-score${activePlayer}`).textContent =
      totalScore[activePlayer - 1];
    currentScore = 0;
    document.querySelector(`#current-score${activePlayer}`).textContent = 0;

    if (totalScore[activePlayer - 1] >= 100) {
      document
        .querySelector(`#player${activePlayer}-area`)
        .classList.add("winner");
      document.querySelector(`#player${activePlayer}-area h1`).textContent =
        "WINNER!";
      gamePlaying = false;
    } else {
      activePlayer = changeActivePlayer(activePlayer);
    }
  }
}

// Change Active Player**************************************************

function changeActivePlayer(activePlayer) {
  if (activePlayer === 1) {
    player2AreaEl.classList.add("active-player");
    player1AreaEl.classList.remove("active-player");
    return 2;
  } else {
    player1AreaEl.classList.add("active-player");
    player2AreaEl.classList.remove("active-player");
    return 1;
  }
}

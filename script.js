'use strict';

let currentPlayer = 0;
let scores = [0, 0];
let currentScore = 0;
let isPlaying = true;

const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const newGameButton = document.querySelector('.btn--new');
const diceImage = document.querySelector('.dice');

const playerElements = document.querySelectorAll('.player');
const scoreElements = document.querySelectorAll('.score');
const currentScoreElements = document.querySelectorAll('.current-score');

function switchPlayer() {
  currentScore = 0;
  currentScoreElements[currentPlayer].textContent = currentScore;
  playerElements[currentPlayer].classList.remove('player--active');
  currentPlayer = 1 - currentPlayer;
  playerElements[currentPlayer].classList.add('player--active');
}

function initGame() {
  currentPlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  isPlaying = true;

  scoreElements[0].textContent = '0';
  scoreElements[1].textContent = '0';
  currentScoreElements[0].textContent = '0';
  currentScoreElements[1].textContent = '0';

  playerElements[0].classList.remove('player--winner');
  playerElements[1].classList.remove('player--winner');
  playerElements[0].classList.add('player--active');
  playerElements[1].classList.remove('player--active');

  diceImage.style.display = 'none';
}

rollDiceButton.addEventListener('click', function () {
  if (isPlaying) {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    diceImage.src = `dice-${diceValue}.png`;
    diceImage.style.display = 'block';

    if (diceValue !== 1) {
      currentScore += diceValue;
      currentScoreElements[currentPlayer].textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdButton.addEventListener('click', function () {
  if (isPlaying) {
    scores[currentPlayer] += currentScore;
    scoreElements[currentPlayer].textContent = scores[currentPlayer];

    if (scores[currentPlayer] >= 100) {
      isPlaying = false;
      diceImage.style.display = 'none';
      document.getElementById(`name--${currentPlayer}`).textContent = 'Winner!';
      playerElements[currentPlayer].classList.add('player--winner');
      playerElements[currentPlayer].classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGameButton.addEventListener('click', initGame);

initGame(); // Initialize the game

'use strict';

// Selecting elements
const p0ScoreEl = document.querySelector('#score--0');
const p1ScoreEl = document.querySelector('#score--1');
const p0El = document.querySelector('.player--0');
const p1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Variables
let activePlayer = 0;
let activeCurrentScore = 0;
let scores = [0, 0];
let gameActive = true;

// Functions
function randomNumber(){
    return Math.floor(Math.random() * 6) + 1;
}
function changePlayer(){
    p0El.classList.toggle('player--active');
    p1El.classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
}

// Set up
p0ScoreEl.textContent = 0;
p1ScoreEl.textContent = 0;
diceEl.classList.add('hidden');

// When the "roll" button is clicked
btnRoll.addEventListener('click', function () {
    if (gameActive) {
        // If dice is hidden, remove hidden class
        if (diceEl.classList.contains('hidden')) {
            diceEl.classList.remove('hidden');
        }

        // Roll dice and display
        let rndNum = randomNumber();
        diceEl.src = `dice-${rndNum}.png`

        // Checking to see if 1 was rolled
        if (rndNum === 1) {
            activeCurrentScore = 0;
            // document.querySelector(activePlayer === 0 ? '#current--0' : '#current--1').textContent = activeCurrentScore
            document.getElementById(`current--${activePlayer}`).textContent = activeCurrentScore
            changePlayer();
        } else {
            // else, add dice value to current score
            activeCurrentScore += rndNum;
            // document.querySelector(activePlayer === 0 ? '#current--0' : '#current--1').textContent = activeCurrentScore
            document.getElementById(`current--${activePlayer}`).textContent = activeCurrentScore
        }
    }

})

// When the "hold" button is clicked
btnHold.addEventListener('click', function () {
    if (gameActive) {
        // Storing the active score for the correct player
        scores[activePlayer] += activeCurrentScore;
        // Updating score for player
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
        // Resetting current score back to 0
        activeCurrentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent = activeCurrentScore;
        // Checking if the game has been won
        if (scores[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
            gameActive = false;
        }
        // Switching player
        changePlayer();
    }

})

// When the 'new game' button is clicked
btnNew.addEventListener('click', function(){
    activePlayer = 0;
    activeCurrentScore = 0;
    scores = [0, 0];
    gameActive = true;
    p0ScoreEl.textContent = scores[0];
    p1ScoreEl.textContent = scores[1];
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    p0El.classList.add('player--active');
    p0El.classList.remove('player--winner');
    p1El.classList.remove('player--active');
    p1El.classList.remove('player--winner');
})
// Valitsee elementit
const diceResult = document.getElementById('dice-result');
const message = document.getElementById('message');
const scorePlayer1 = document.getElementById('score-player1');
const scorePlayer2 = document.getElementById('score-player2');
const roundPlayer1 = document.getElementById('round-player1');
const roundPlayer2 = document.getElementById('round-player2');

const rollDiceBtn = document.getElementById('roll-dice');
const holdScoreBtn = document.getElementById('hold-score');

// Pelimuuttujat
let currentRoundScore = 0;
let totalScores = [0, 0];
let activePlayer = 0;
let gameOver = false;

function rollDice() {
    if (gameOver) return;

    const roll = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = roll;

    if (roll === 1) {
        // Nolla kierrospisteet ja vuoron vaihto
        currentRoundScore = 0;
        message.textContent = `Pelaaja ${activePlayer + 1} heitti ykkösen! Vuoro vaihtuu.`;
        switchPlayer();
    } else {
        // Lisää pisteet kierrokselle
        currentRoundScore += roll;
        updateRoundScore();
    }
}

function holdScore() {
    if (gameOver) return;

    // Lisää kierroksen pisteet kokonaispisteisiin
    totalScores[activePlayer] += currentRoundScore;

    if (totalScores[activePlayer] >= 100) {
        // Peli päättyy
        gameOver = true;
        message.textContent = `Pelaaja ${activePlayer + 1} voitti pelin!`;
        return;
    }

    // Vaihda pelaajaa
    currentRoundScore = 0;
    updateScores();
    switchPlayer();
}

function switchPlayer() {
    currentRoundScore = 0;
    updateRoundScore();
    activePlayer = activePlayer === 0 ? 1 : 0;
}

function updateScores() {
    scorePlayer1.textContent = totalScores[0];
    scorePlayer2.textContent = totalScores[1];
}

function updateRoundScore() {
    if (activePlayer === 0) {
        roundPlayer1.textContent = currentRoundScore;
        roundPlayer2.textContent = '0';
    } else {
        roundPlayer2.textContent = currentRoundScore;
        roundPlayer1.textContent = '0';
    }
}

// Nappien kuuntelijat
rollDiceBtn.addEventListener('click', rollDice);
holdScoreBtn.addEventListener('click', holdScore);

const dice1Result = document.getElementById('dice1-result');
const dice2Result = document.getElementById('dice2-result');
const message = document.getElementById('message');
const scorePlayer1 = document.getElementById('score-player1');
const scorePlayer2 = document.getElementById('score-player2');
const roundPlayer1 = document.getElementById('round-player1');
const roundPlayer2 = document.getElementById('round-player2');

const rollDiceBtn = document.getElementById('roll-dice');
const holdScoreBtn = document.getElementById('hold-score');
const resetGameBtn = document.getElementById('reset-game');

let currentRoundScore = 0;
let totalScores = [0, 0];
let activePlayer = 0;
let gameOver = false;
let doubleCount = 0;

function rollDice() {
    if (gameOver) return;

    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    dice1Result.textContent = dice1;
    dice2Result.textContent = dice2;

    if (dice1 === 1 && dice2 === 1) {
        currentRoundScore += 25;
        message.textContent = `Kaksi ykköstä! Saat 25 pistettä.`;
        doubleCount = 0;
    } else if (dice1 === 1 || dice2 === 1) {
        currentRoundScore = 0;
        message.textContent = `Yksi ykkönen heitetty! Vuoro vaihtuu ilman pisteitä.`;
        switchPlayer();
    } else if (dice1 === dice2) {
        const points = (dice1 + dice2) * 2;
        currentRoundScore += points;
        doubleCount++;
        message.textContent = `Tuplat! Heitit ${dice1} ja ${dice2}, saat ${points} pistettä.`;

        if (doubleCount === 3) {
            currentRoundScore = 0;
            message.textContent = `Kolme tuplaa peräkkäin! Vuoro vaihtuu ilman pisteitä.`;
            switchPlayer();
        }
    } else {
        currentRoundScore += dice1 + dice2;
        doubleCount = 0;
        message.textContent = `Heitit ${dice1} ja ${dice2}, saat ${dice1 + dice2} pistettä.`;
    }

    updateRoundScore();
}

function holdScore() {
    if (gameOver) return;

    totalScores[activePlayer] += currentRoundScore;

    // Päivitetään pisteet ennen voittotarkistusta
    updateScores();

    if (totalScores[activePlayer] >= 100) {
        gameOver = true;
        message.textContent = `Pelaaja ${activePlayer + 1} voitti pelin!`;
        return;
    }

    currentRoundScore = 0;
    doubleCount = 0;
    switchPlayer();
}


function switchPlayer() {
    currentRoundScore = 0;
    doubleCount = 0;
    updateRoundScore();
    activePlayer = activePlayer === 0 ? 1 : 0;
    message.textContent = `Pelaaja ${activePlayer + 1} vuoro.`;
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

function resetGame() {
    currentRoundScore = 0;
    totalScores = [0, 0];
    activePlayer = 0;
    gameOver = false;
    doubleCount = 0;

    dice1Result.textContent = '-';
    dice2Result.textContent = '-';
    message.textContent = '';
    updateScores();
    updateRoundScore();
}

rollDiceBtn.addEventListener('click', rollDice);
holdScoreBtn.addEventListener('click', holdScore);
resetGameBtn.addEventListener('click', resetGame);

let scores1Dice = [0, 0];
let currentScore1Dice = 0;
let activePlayer1Dice = 0;

const rollDiceBtn1 = document.getElementById('roll-dice-1dice');
const holdBtn1 = document.getElementById('hold-1dice');
const restartBtn1 = document.getElementById('restart-1dice');
const currentScoreDisplay1 = document.getElementById('current-score-1dice');
const score1Display1 = document.getElementById('score1-1dice');
const score2Display1 = document.getElementById('score2-1dice');
const messageDisplay1 = document.getElementById('message-1dice');

function switchPlayer1Dice() {
    currentScore1Dice = 0;
    currentScoreDisplay1.textContent = currentScore1Dice;
    activePlayer1Dice = activePlayer1Dice === 0 ? 1 : 0;
    messageDisplay1.textContent = `Pelaaja ${activePlayer1Dice + 1}:n vuoro!`;
    messageDisplay1.style.color = 'black';
}

function resetGame1Dice() {
    scores1Dice = [0, 0];
    currentScore1Dice = 0;
    activePlayer1Dice = 0;
    score1Display1.textContent = '0';
    score2Display1.textContent = '0';
    currentScoreDisplay1.textContent = '0';
    messageDisplay1.textContent = 'Peli alkaa! Pelaaja 1 aloittaa.';
    rollDiceBtn1.disabled = false;
    holdBtn1.disabled = false;
    restartBtn1.style.display = 'none';
}

rollDiceBtn1.addEventListener('click', () => {
    const dice = Math.floor(Math.random() * 6) + 1;

    if (dice === 1) {
        messageDisplay1.textContent = `Pelaaja ${activePlayer1Dice + 1} heitti ykkösen! Vuoro siirtyy.`;
        messageDisplay1.style.color = 'red';
        switchPlayer1Dice();
    } else {
        currentScore1Dice += dice;
        currentScoreDisplay1.textContent = currentScore1Dice;
        messageDisplay1.textContent = `Heitit ${dice}. Voit jatkaa tai pitää pisteet.`;
    }
});

holdBtn1.addEventListener('click', () => {
    scores1Dice[activePlayer1Dice] += currentScore1Dice;

    if (activePlayer1Dice === 0) {
        score1Display1.textContent = scores1Dice[0];
    } else {
        score2Display1.textContent = scores1Dice[1];
    }

    if (scores1Dice[activePlayer1Dice] >= 100) {
        messageDisplay1.textContent = `Pelaaja ${activePlayer1Dice + 1} voitti pelin!`;
        rollDiceBtn1.disabled = true;
        holdBtn1.disabled = true;
        restartBtn1.style.display = 'inline-block';
    } else {
        switchPlayer1Dice();
    }
});

restartBtn1.addEventListener('click', resetGame1Dice);

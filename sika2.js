let scores2Dice = [0, 0];
let currentScore2Dice = 0;
let activePlayer2Dice = 0;
let doubleCount2Dice = 0;

const rollDiceBtn2 = document.getElementById('roll-dice-2dice');
const holdBtn2 = document.getElementById('hold-2dice');
const restartBtn2 = document.getElementById('restart-2dice');
const dice1Display2 = document.getElementById('dice1');
const dice2Display2 = document.getElementById('dice2');
const currentScoreDisplay2 = document.getElementById('current-score-2dice');
const score1Display2 = document.getElementById('score1-2dice');
const score2Display2 = document.getElementById('score2-2dice');
const messageDisplay2 = document.getElementById('message-2dice');

function switchPlayer2Dice() {
    currentScore2Dice = 0;
    currentScoreDisplay2.textContent = currentScore2Dice;
    doubleCount2Dice = 0;
    activePlayer2Dice = activePlayer2Dice === 0 ? 1 : 0;
    messageDisplay2.textContent = `Pelaaja ${activePlayer2Dice + 1}:n vuoro!`;
    messageDisplay2.style.color = 'black';
}

function resetGame2Dice() {
    scores2Dice = [0, 0];
    currentScore2Dice = 0;
    activePlayer2Dice = 0;
    doubleCount2Dice = 0;
    score1Display2.textContent = '0';
    score2Display2.textContent = '0';
    currentScoreDisplay2.textContent = '0';
    dice1Display2.textContent = '-';
    dice2Display2.textContent = '-';
    messageDisplay2.textContent = 'Peli alkaa! Pelaaja 1 aloittaa.';
    rollDiceBtn2.disabled = false;
    holdBtn2.disabled = false;
    restartBtn2.style.display = 'none';
}

rollDiceBtn2.addEventListener('click', () => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    dice1Display2.textContent = dice1;
    dice2Display2.textContent = dice2;

    if (dice1 === 1 && dice2 === 1) {
        currentScore2Dice += 25;
        messageDisplay2.textContent = 'Kaksi ykköstä! Saat 25 pistettä.';
        messageDisplay2.style.color = 'green';
    } else if (dice1 === 1 || dice2 === 1) {
        messageDisplay2.textContent = 'Ykkönen yhdellä nopalla! Vuoro siirtyy.';
        messageDisplay2.style.color = 'red';
        switchPlayer2Dice();
    } else if (dice1 === dice2) {
        doubleCount2Dice++;
        currentScore2Dice += (dice1 + dice2) * 2;
        messageDisplay2.textContent = `Tuplat! Saat ${(dice1 + dice2) * 2} pistettä.`;

        if (doubleCount2Dice === 3) {
            messageDisplay2.textContent = 'Kolme tuplaa peräkkäin! Vuoro siirtyy ilman pisteitä.';
            switchPlayer2Dice();
        }
    } else {
        doubleCount2Dice = 0;
        currentScore2Dice += dice1 + dice2;
        messageDisplay2.textContent = `Heitit ${dice1} ja ${dice2}. Nykyinen summa: ${currentScore2Dice}`;
    }

    currentScoreDisplay2.textContent = currentScore2Dice;
});

holdBtn2.addEventListener('click', () => {
    scores2Dice[activePlayer2Dice] += currentScore2Dice;

    if (activePlayer2Dice === 0) {
        score1Display2.textContent = scores2Dice[0];
    } else {
        score2Display2.textContent = scores2Dice[1];
    }

    if (scores2Dice[activePlayer2Dice] >= 100) {
        messageDisplay2.textContent = `Pelaaja ${activePlayer2Dice + 1} voitti pelin!`;
        rollDiceBtn2.disabled = true;
        holdBtn2.disabled = true;
        restartBtn2.style.display = 'inline-block';
    } else {
        switchPlayer2Dice();
    }
});

restartBtn2.addEventListener('click', resetGame2Dice);

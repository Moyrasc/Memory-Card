// Comienzo del juego
const btnStart = document.querySelector('.btn-start');

// Temporizador

const timerGame = document.querySelector('.temp');

// Contador de movimientos

const moveCount = document.querySelector('.move');

// Lógica de cartas

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}
// Buscar coincidencias de ambas cartas

function checkForMatch() {
    if (firstCard.dataset.character === secondCard.dataset.character) {
            disableCards();
            return;
    }
        
    unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}
//restablezco las variables firstCard y secondCard después de cada ronda

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Hacer que las cartas sean aleatorias

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

//  Recorremos los elementos y con el evento cada vez que hagamos click en la carta, flipCard se activa y se gira
cards.forEach(card => card.addEventListener('click', flipCard));


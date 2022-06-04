const btnStart = document.querySelector('.btn-start');
const timerGame = document.querySelector('.temp');
const cards = document.querySelectorAll('.memory-card');
const moveCount = document.querySelector('.move');

// Comienzo del juego
btnStart.addEventListener('click',startGame);

function startGame (){
  if(btnStart.textContent === "Start"){

  //  Recorremos los elementos y con el evento cada vez que hagamos click en la carta, flipCard se activa y se gira
  cards.forEach(card => card.addEventListener('click', flipCard));
paused = false;
btnStart.textContent = "Restart"
}
// Reiniciamos el juego
else if (btnStart.textContent=== "Restart"){
    location.reload();
}

}
let match = 0;
let count = 0;
let paused = true;
// Temporizador
const interval = setInterval(()=>{
  if(!paused){
    timerGame.textContent = count++;
  } 
  }, 1000)

// Contador de movimientos



// Lógica de cartas
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
      match++;
      if(match == 6){
        paused = true;
}
      console.log(match);
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
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();





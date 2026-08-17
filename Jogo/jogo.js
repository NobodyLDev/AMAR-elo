const PHOTOS = [
  "../assets/foto1.jpeg",
  "../assets/foto2.jpeg",
  "../assets/foto3.jpeg",
  "../assets/foto4.jpeg",
  "../assets/foto5.jpeg",
  "../assets/foto6.jpeg",
  "../assets/foto7.jpeg",
  "../assets/foto8.jpeg",
];

const board = document.getElementById("game-board");
const statMoves = document.getElementById("stat-moves");
const statTime = document.getElementById("stat-time");
const statPairs = document.getElementById("stat-pairs");
const restartBtn = document.getElementById("restart-btn");
const winOverlay = document.getElementById("win-overlay");
const winSummary = document.getElementById("win-summary");
const playAgainBtn = document.getElementById("play-again-btn");

let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let lockBoard = false;
let timer = null;
let seconds = 0;

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function startTimer() {
  clearInterval(timer);
  seconds = 0;
  statTime.textContent = "00:00";
  timer = setInterval(() => {
    seconds++;
    statTime.textContent = formatTime(seconds);
  }, 1000);
}

function buildBoard() {
  clearInterval(timer);
  flippedCards = [];
  matchedCount = 0;
  moves = 0;
  lockBoard = false;
  seconds = 0;
  statMoves.textContent = "0";
  statTime.textContent = "00:00";
  statPairs.textContent = `0/${PHOTOS.length}`;
  winOverlay.classList.add("hidden");

  const deck = shuffle([...PHOTOS, ...PHOTOS]);
  board.innerHTML = "";

  deck.forEach((src) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.photo = src;
    card.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-card-front">✦</div>
        <div class="memory-card-back"><img src="${src}" alt="" loading="lazy"></div>
      </div>
    `;
    card.addEventListener("click", () => onCardClick(card));
    board.appendChild(card);
  });
}

function onCardClick(card) {
  if (lockBoard) return;
  if (card.classList.contains("flipped") || card.classList.contains("matched")) return;
  if (!timer) startTimer();

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    statMoves.textContent = moves.toString();
    checkMatch();
  }
}

function checkMatch() {
  const [a, b] = flippedCards;
  const isMatch = a.dataset.photo === b.dataset.photo;

  if (isMatch) {
    a.classList.add("matched");
    b.classList.add("matched");
    matchedCount++;
    statPairs.textContent = `${matchedCount}/${PHOTOS.length}`;
    flippedCards = [];
    if (matchedCount === PHOTOS.length) {
      clearInterval(timer);
      setTimeout(showWin, 500);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      a.classList.remove("flipped");
      b.classList.remove("flipped");
      flippedCards = [];
      lockBoard = false;
    }, 800);
  }
}

function showWin() {
  winSummary.textContent = `${moves} jogadas em ${formatTime(seconds)}.`;
  winOverlay.classList.remove("hidden");
}

restartBtn.addEventListener("click", buildBoard);
playAgainBtn.addEventListener("click", buildBoard);

buildBoard();

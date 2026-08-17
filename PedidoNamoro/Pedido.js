let clickCount = 0;
const simButton = document.querySelector(".button.yes");
const noButton = document.querySelector(".button.no");

// Array de mensagens personalizadas
const messages = [
    "Ooh, tem certeza que deseja apertar isso?",
    "Estou te avisando, melhor pensar bem..",
    "Você é destemida né?!!",
    "Caramba você quer mesmo isso",
    "Okay então, vamos lá..."
];

// Evento para o botão "Sim"
simButton.addEventListener("click", function () {
    clickCount++;

    // Exibindo mensagens personalizadas de acordo com o clique
    if (clickCount <= messages.length) {
        alert(messages[clickCount - 1]);
    } else {
        // Depois do 5º clique, redireciona para outro site
        window.location.href = "../flowers4u/index.html";
    }
});

// Foge do botão "Não" — funciona no hover (desktop) e no toque (celular)
function dodgeNoButton() {
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const maxX = Math.max(window.innerWidth - buttonWidth - 20, 20);
    const maxY = Math.max(window.innerHeight - buttonHeight - 20, 100);

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noButton.style.position = "fixed";
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
}

noButton.addEventListener("mouseover", dodgeNoButton);
noButton.addEventListener("touchstart", function (e) {
    e.preventDefault();
    dodgeNoButton();
}, { passive: false });

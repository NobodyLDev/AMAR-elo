// Seleciona todos os botões de play e players de áudio
const playButtons = document.querySelectorAll('.play-button');
const audioPlayers = document.querySelectorAll('.audio-player');

playButtons.forEach((button, index) => {
  let isPlaying = false;
  const audio = audioPlayers[index];

  button.addEventListener('click', () => {
    // Pausa todos os áudios antes de tocar o atual
    audioPlayers.forEach((player, i) => {
      if (i !== index) {
        player.pause();
        playButtons[i].textContent = '▶';
      }
    });

    if (isPlaying) {
      audio.pause();
      button.textContent = '▶';
    } else {
      audio.play();
      button.textContent = '⏸';
    }
    isPlaying = !isPlaying;
  });

  audio.addEventListener('ended', () => {
    button.textContent = '▶';
    isPlaying = false;
  });
});

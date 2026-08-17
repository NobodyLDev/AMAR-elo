// Função para abrir a modal
function openModal(image) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    modal.style.display = 'block';
    modalImg.src = image.src; // Define a imagem da modal como a imagem clicada
  }
  
  // Função para fechar a modal
  function closeModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
  }
  
  // Fecha a modal ao clicar fora da imagem
  window.onclick = function (event) {
    const modal = document.getElementById('image-modal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
  
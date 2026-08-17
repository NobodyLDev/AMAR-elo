// Gera um céu de estrelas discreto no fundo da página
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const container = document.createElement('div');
  container.id = 'stars-bg';
  document.body.prepend(container);

  const count = window.innerWidth < 600 ? 40 : 80;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    const size = (Math.random() * 1.6 + 1).toFixed(2);
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    if (!prefersReducedMotion) {
      star.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
      star.style.animationDuration = (3 + Math.random() * 3).toFixed(2) + 's';
    } else {
      star.style.animation = 'none';
      star.style.opacity = '0.4';
    }
    frag.appendChild(star);
  }
  container.appendChild(frag);
})();

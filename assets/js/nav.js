// Menu mobile (hamburguer) + destaque do link ativo
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.navbar ul');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Marca o link da página atual como ativo
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar ul li a').forEach((link) => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === current) link.classList.add('active');
  });
});

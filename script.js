// Schjoldr — enkel nav-toggle og skjema-handler
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute(
        'aria-expanded',
        links.classList.contains('open') ? 'true' : 'false'
      );
    });
  }

  // Kontaktskjema
  const form = document.querySelector('#kontakt-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('navn');
      const status = document.querySelector('#form-status');
      if (status) {
        status.textContent = `Takk, ${name}! Jeg tar kontakt snart.`;
        status.style.color = '#00d9ff';
      }
      form.reset();
    });
  }

  // Jevn scroll for anker-lenker
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

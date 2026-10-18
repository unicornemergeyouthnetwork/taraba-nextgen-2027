(() => {
  const player = document.getElementById('story-video');
  const error = document.getElementById('story-error');
  document.querySelectorAll('.story-choice').forEach(button => {
    button.addEventListener('click', () => {
      player.pause();
      document.querySelectorAll('.story-choice').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      const name = button.querySelector('strong').textContent;
      document.getElementById('story-name').textContent = name;
      document.getElementById('story-role').textContent = button.querySelector('.story-person > span').textContent;
      player.setAttribute('aria-label', `${name}’s delegate story`);
      error.hidden = true;
      player.poster = button.dataset.poster;
      player.src = button.dataset.video;
      player.load();
    });
  });
  player.addEventListener('error', () => { error.hidden = false; });
  const box = document.getElementById('photoLightbox');
  const closeButton = box.querySelector('button');
  let opener;
  const close = () => {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    opener?.focus();
  };
  document.querySelectorAll('[data-photo]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      const image = document.getElementById('lightboxImage');
      image.src = button.dataset.photo;
      image.alt = button.querySelector('img').alt;
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    });
  });
  closeButton.addEventListener('click', close);
  box.addEventListener('click', event => { if (event.target === box) close(); });
  box.addEventListener('keydown', event => {
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') { event.preventDefault(); closeButton.focus(); }
  });
})();

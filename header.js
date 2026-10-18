(() => {
  const header = document.querySelector('header');
  const toggle = header?.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;
  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.hidden = false;
  header.classList.add('nav-ready');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      close();
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) close();
  });
  matchMedia('(max-width: 1000px)').addEventListener('change', close);
})();

(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.hero-copy > *, .hero-info-item, .overview-heading > *, .delegate-breakdown > li, .about > *, .media-heading > *, .tradition-card, .story-feature, .story-list, .recapbox, .eligibility-intro, .eligibility-list > li, .formhead, .footer-top > *');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('enter-once');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  targets.forEach(element => {
    const siblings = [...element.parentElement.children];
    element.style.setProperty('--entrance-delay', `${Math.min(siblings.indexOf(element), 3) * 65}ms`);
    observer.observe(element);
  });
  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    targets.forEach(element => element.classList.remove('enter-once'));
  });
})();

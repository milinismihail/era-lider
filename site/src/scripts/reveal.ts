const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
  el.style.transitionDelay = Math.min(i * 40, 180) + 'ms';
  observer.observe(el);
});

(() => {
  const nodes = document.querySelectorAll('[data-sr]');
  if (!('IntersectionObserver' in window) || !nodes.length) {
    nodes.forEach(n => n.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const el = entry.target;
        const delay = el.getAttribute('data-sr-delay');
        if (delay) el.style.transitionDelay = `${parseInt(delay,10)}ms`;
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });

  nodes.forEach(el => io.observe(el));

  document.querySelectorAll('.sr-stagger').forEach(group => {
    [...group.querySelectorAll('[data-sr]')].forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });
})();



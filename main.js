(function () {
  const cfg = window.HIGHLIGHTS_CUTTER_CONFIG || {};
  const fallback = "mailto:" + (cfg.contactLabel || "CONTATO_COMERCIAL_A_CONFIGURAR");
  document.querySelectorAll('.contact-link').forEach(link => link.href = cfg.contactUrl || fallback);
  document.getElementById('year').textContent = new Date().getFullYear();
  const header = document.querySelector('[data-header]');
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 16), { passive: true });
  const button = document.querySelector('.menu-toggle'), nav = document.querySelector('#main-nav');
  button.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') === 'true'; button.setAttribute('aria-expanded', !open); nav.classList.toggle('open', !open); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { button.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }));
  const observer = new IntersectionObserver(items => items.forEach(item => { if (item.isIntersecting) { item.target.classList.add('is-visible'); observer.unobserve(item.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}());

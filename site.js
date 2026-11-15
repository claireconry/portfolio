// Sticky nav border + mobile menu
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });
const toggle = document.getElementById('menu-toggle');
if (toggle) toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? 'Close' : 'Menu';
});

// Scroll reveals
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hero flow card (home only)
const steps = document.querySelectorAll('.flow-step');
const timeEl = document.getElementById('fc-time');
if (steps.length && timeEl) {
  const times = ['0.4s', '1.1s', '1.8s', '2.6s'];
  const runFlow = () => {
    steps.forEach(s => s.classList.remove('done'));
    timeEl.textContent = '0.0s';
    steps.forEach((s, i) => setTimeout(() => { s.classList.add('done'); timeEl.textContent = times[i]; }, 1400 + i * 700));
  };
  if (reduce) { steps.forEach(s => s.classList.add('done')); timeEl.textContent = times[3]; }
  else { runFlow(); setInterval(runFlow, 7000); }
}

// Copy email
const copyBtn = document.getElementById('copy-email');
if (copyBtn) copyBtn.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('claire.conry1@gmail.com'); copyBtn.textContent = 'Copied to clipboard'; }
  catch { copyBtn.textContent = 'claire.conry1@gmail.com'; }
  setTimeout(() => copyBtn.textContent = 'Copy email address', 2400);
});

const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

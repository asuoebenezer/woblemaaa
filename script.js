// Navbar background change + back-to-top button on scroll
const nav = document.getElementById('mainNav');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Close mobile menu after clicking a link
document.querySelectorAll('#navMenu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navMenu');
    if (menu.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Scroll-reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated counters
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + (el.dataset.plain ? '' : '+');
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// Contact form validation (front-end only)
const form = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.classList.add('was-validated');

  if (!form.checkValidity()) return;

  const name = document.getElementById('name').value.trim();
  formAlert.textContent = `Thank you, ${name}! Your message has been received. We will get back to you soon.`;
  formAlert.classList.remove('d-none');
  form.reset();
  form.classList.remove('was-validated');
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
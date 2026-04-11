/* ============================================================
   CallRecoverAI — App Logic
   ============================================================ */

// ---- Mobile Nav ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ---- Nav shadow on scroll ----
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 32px rgba(0,0,0,0.5)'
      : 'none';
  }, { passive: true });
}

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Animated Counters ----
function animateCounter(el, target, duration) {
  duration = duration || 1400;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(target * eased);
    el.textContent = val >= 1000 ? val.toLocaleString() : val;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'), 10);
        if (!isNaN(target)) animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ---- Demo Phone Animation ----
const demoMessages = document.getElementById('demo-messages');

const conversation = [
  { type: 'ai',    text: 'Hey — sorry we missed you. This is ABC Roofing. Still need help?',  delay: 800 },
  { type: 'reply', text: 'Yes! My roof is leaking after the storm. Need someone ASAP.',        delay: 2200 },
  { type: 'ai',    text: "We're on it. What's your zip code?",                                  delay: 3400 },
  { type: 'reply', text: '85201',                                                               delay: 4400 },
  { type: 'ai',    text: 'Perfect — we cover that area. Available today 2-5pm?',               delay: 5600 },
  { type: 'reply', text: '3pm works great.',                                                    delay: 6700 },
  { type: 'ai',    text: 'Booked! Mike will be there at 3pm. Confirmation sent.',              delay: 7800 },
];

let demoRunning = false;

function startDemoAnimation() {
  if (demoRunning || !demoMessages) return;
  demoRunning = true;

  conversation.forEach(function(item) {
    setTimeout(function() {
      if (!document.contains(demoMessages)) return;
      const msg = document.createElement('div');
      msg.className = 'msg ' + (item.type === 'ai' ? 'ai' : 'reply');
      msg.textContent = item.text;
      demoMessages.appendChild(msg);
      demoMessages.scrollTop = demoMessages.scrollHeight;
    }, item.delay);
  });

  setTimeout(function() {
    const msgs = demoMessages.querySelectorAll('.msg.ai, .msg.reply');
    msgs.forEach(function(el) {
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = '0';
    });
    setTimeout(function() {
      msgs.forEach(function(el) { el.remove(); });
      demoRunning = false;
      startDemoAnimation();
    }, 600);
  }, 11000);
}

const phoneEl = document.querySelector('.phone-wrap');
if (phoneEl) {
  const phoneObserver = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) startDemoAnimation();
      });
    },
    { threshold: 0.4 }
  );
  phoneObserver.observe(phoneEl);
}

// ---- FAQ Accordion ----
document.querySelectorAll('.faq-q').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-q').forEach(function(b) {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// ---- Smooth scroll with nav offset ----
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
});

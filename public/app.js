/* ============================================================
   CallRecoverAI — App Logic
   ============================================================ */

// ---- Mobile Nav ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- Hero Canvas: Animated Grid + Glow Orbs ----
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const orbs = [
    { x: 0.28, y: 0.55, r: 0.42, color: 'rgba(108,71,255,0.2)',   vx: 0.00010, vy: 0.00006 },
    { x: 0.72, y: 0.30, r: 0.32, color: 'rgba(160,118,255,0.14)', vx: -0.00008, vy: 0.00012 },
    { x: 0.50, y: 0.82, r: 0.28, color: 'rgba(74,0,224,0.12)',    vx: 0.00006, vy: -0.00009 },
  ];

  let w = 0, h = 0;

  function resize() {
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width  = w * (window.devicePixelRatio || 1);
    canvas.height = h * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  function drawGrid() {
    const cell = 48;
    ctx.strokeStyle = 'rgba(108,71,255,0.07)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= w; x += cell) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y <= h; y += cell) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
  }

  function drawOrbs() {
    orbs.forEach(orb => {
      orb.x += orb.vx;
      orb.y += orb.vy;
      if (orb.x < 0 || orb.x > 1) orb.vx *= -1;
      if (orb.y < 0 || orb.y > 1) orb.vy *= -1;

      const cx     = orb.x * w;
      const cy     = orb.y * h;
      const radius = orb.r * Math.max(w, h);
      const grad   = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, orb.color);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    drawOrbs();
    drawGrid();
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize);
  frame();
}

initHeroCanvas();

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
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Demo Phone Animation ----
const demoMessages = document.getElementById('demo-messages');

const conversation = [
  { type: 'ai',    text: 'Hey — sorry we missed you. This is ABC Roofing. Still need help?',   delay: 1000 },
  { type: 'reply', text: 'Yes! My roof is leaking after the storm. Need someone ASAP.',         delay: 2600 },
  { type: 'ai',    text: 'We\'re on it. What\'s your zip code?',                                delay: 3800 },
  { type: 'reply', text: '85201',                                                                delay: 4900 },
  { type: 'ai',    text: 'Perfect — we cover that. Available today between 2–5pm?',             delay: 6000 },
  { type: 'reply', text: '3pm works great.',                                                     delay: 7200 },
  { type: 'ai',    text: '✅ Booked! Mike will be there at 3pm. Confirmation sent.',             delay: 8400 },
];

let demoRunning = false;

function startDemoAnimation() {
  if (demoRunning) return;
  demoRunning = true;

  conversation.forEach(({ type, text, delay }) => {
    setTimeout(() => {
      if (!document.contains(demoMessages)) return;
      const msg = document.createElement('div');
      msg.className = `msg ${type}`;
      msg.textContent = text;
      demoMessages.appendChild(msg);
      demoMessages.scrollTop = demoMessages.scrollHeight;
    }, delay);
  });

  // Soft-reset and loop
  setTimeout(() => {
    const extras = demoMessages.querySelectorAll('.msg.ai, .msg.reply');
    extras.forEach(el => {
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = '0';
    });
    setTimeout(() => {
      extras.forEach(el => el.remove());
      demoRunning = false;
      startDemoAnimation();
    }, 600);
  }, 12000);
}

// Trigger when phone is in view
const phoneEl = document.querySelector('.demo-phone');
if (phoneEl) {
  const phoneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) startDemoAnimation();
      });
    },
    { threshold: 0.5 }
  );
  phoneObserver.observe(phoneEl);
}

// ---- Animated Counters (dashboard stats) ----
function animateCounter(el, target, duration = 1200) {
  const start    = performance.now();
  const startVal = 0;
  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased);
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
  { threshold: 0.6 }
);
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ---- FAQ Accordion ----
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    // Open clicked if it wasn't already open
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// ---- Phone number auto-format ----
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 10) {
      val = `(${val.slice(0,3)}) ${val.slice(3,6)}-${val.slice(6,10)}`;
    }
    e.target.value = val;
  });
}

// ---- Signup Form ----
const form    = document.getElementById('signup-form');
const success = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      business_name: form.business_name.value.trim(),
      owner_name:    form.owner_name.value.trim(),
      phone:         form.phone.value.trim(),
      email:         form.email.value.trim(),
      niche:         form.niche.value,
      plan:          form.plan.value,
      submitted_at:  new Date().toISOString(),
    };

    // TODO: Replace with real webhook/API endpoint
    // fetch('https://hooks.zapier.com/your-webhook-url', {
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // });
    console.log('New signup:', data);

    form.style.display = 'none';
    success.style.display = 'block';
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// ---- Smooth scroll with nav offset ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- Nav shadow on scroll ----
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20
    ? '0 4px 28px rgba(0,0,0,0.45)'
    : 'none';
}, { passive: true });

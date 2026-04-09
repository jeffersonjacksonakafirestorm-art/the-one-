/* ============================================================
   CallRecoverAI — App Logic
   ============================================================ */

// ---- Mobile Nav ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ---- Demo Phone Animation ----
const demoMessages = document.getElementById('demo-messages');

const conversation = [
  { type: 'ai',    text: 'Hey! Sorry we missed your call — this is ABC Roofing. How can we help you today?', delay: 1200 },
  { type: 'reply', text: 'Hi yeah I need a roof inspection. My roof is leaking after the storm.',             delay: 2800 },
  { type: 'ai',    text: 'Got it — we can get someone out to you. Are you available this week for a free estimate?', delay: 4200 },
  { type: 'reply', text: 'Yes! Wednesday morning works.',                                                     delay: 5600 },
  { type: 'ai',    text: 'Perfect. I just booked you for Wednesday at 9am. You\'ll get a confirmation text shortly! 🎉', delay: 7000 },
];

let animationStarted = false;

function startDemoAnimation() {
  if (animationStarted) return;
  animationStarted = true;

  conversation.forEach(({ type, text, delay }) => {
    setTimeout(() => {
      const msg = document.createElement('div');
      msg.className = `msg ${type}`;
      msg.textContent = text;
      demoMessages.appendChild(msg);
      demoMessages.scrollTop = demoMessages.scrollHeight;
    }, delay);
  });

  // Loop the animation
  setTimeout(() => {
    // Remove non-"missed" messages and restart
    const extras = demoMessages.querySelectorAll('.msg.ai, .msg.reply');
    extras.forEach(el => el.remove());
    animationStarted = false;
    startDemoAnimation();
  }, 10000);
}

// Intersection observer to trigger animation when phone is visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) startDemoAnimation();
    });
  },
  { threshold: 0.5 }
);

const phoneEl = document.querySelector('.demo-phone');
if (phoneEl) observer.observe(phoneEl);

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

    // Open clicked (if it wasn't already open)
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// ---- Phone number formatting ----
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
const form = document.getElementById('signup-form');
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

    // Log to console (replace with real API/webhook endpoint later)
    console.log('New signup:', data);

    // Show success state
    form.style.display = 'none';
    success.style.display = 'block';

    // Scroll success into view
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// ---- Smooth scroll offset for fixed nav ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---- Subtle nav shadow on scroll ----
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

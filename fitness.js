/* ============================================================
   ApexFit Coaching — fitness.js
   Handles: canvas background, scroll reveal, counters, FAQ,
            mobile nav, smooth scroll, Calendly init
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. CANVAS HERO BACKGROUND
     Floating energy particles with glow trails
  ---------------------------------------------------------- */
  (function initCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles;

    const PARTICLE_COUNT = 70;
    const ORANGE = '255,107,43';
    const AMBER  = '255,154,60';
    const PURPLE = '160,80,220';

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function Particle() {
      this.reset(true);
    }
    Particle.prototype.reset = function (initial) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.6 + 0.2);
      this.r  = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.6 + 0.1;
      const palette = [ORANGE, AMBER, PURPLE];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    };
    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.0008;
      if (this.y < -10 || this.alpha <= 0) this.reset(false);
    };
    Particle.prototype.draw = function () {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.shadowBlur  = 8;
      ctx.shadowColor = `rgba(${this.color},0.5)`;
      ctx.fillStyle   = `rgba(${this.color},${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    /* slow moving glow orbs */
    const orbs = [
      { x: 0.7, y: 0.4, r: 250, c: ORANGE,  vx: 0.15, vy: 0.1  },
      { x: 0.2, y: 0.6, r: 200, c: PURPLE,  vx: -0.1, vy: 0.12 },
      { x: 0.5, y: 0.2, r: 180, c: AMBER,   vx: 0.08, vy: -0.09 },
    ];

    function drawOrbs() {
      orbs.forEach(o => {
        o.x += o.vx / W;
        o.y += o.vy / H;
        if (o.x < 0.1 || o.x > 0.9) o.vx *= -1;
        if (o.y < 0.1 || o.y > 0.9) o.vy *= -1;
        const grd = ctx.createRadialGradient(o.x * W, o.y * H, 0, o.x * W, o.y * H, o.r);
        grd.addColorStop(0,   `rgba(${o.c},0.06)`);
        grd.addColorStop(1,   `rgba(${o.c},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(o.x * W, o.y * H, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      drawOrbs();
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(loop);
    }

    function init() {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
      loop();
    }

    window.addEventListener('resize', resize);
    init();
  })();


  /* ----------------------------------------------------------
     2. NAVIGATION — shadow on scroll + mobile hamburger
  ---------------------------------------------------------- */
  (function initNav() {
    const nav       = document.getElementById('fitNav');
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', open);
        /* animate hamburger → X */
        const spans = hamburger.querySelectorAll('span');
        if (open) {
          spans[0].style.transform = 'translateY(7px) rotate(45deg)';
          spans[1].style.opacity   = '0';
          spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
          spans[0].style.transform = '';
          spans[1].style.opacity   = '';
          spans[2].style.transform = '';
        }
      });

      /* close on link click */
      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          navLinks.classList.remove('open');
          const spans = hamburger.querySelectorAll('span');
          spans[0].style.transform = '';
          spans[1].style.opacity   = '';
          spans[2].style.transform = '';
        });
      });
    }
  })();


  /* ----------------------------------------------------------
     3. SCROLL REVEAL via IntersectionObserver
  ---------------------------------------------------------- */
  (function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            /* stagger children inside grids */
            const delay = entry.target.dataset.delay
              ? parseFloat(entry.target.dataset.delay)
              : 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay * 1000);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    /* add small stagger to plan/testi/number grid children */
    document.querySelectorAll('.plans-grid, .testi-grid, .numbers-grid').forEach(grid => {
      Array.from(grid.children).forEach((child, idx) => {
        child.dataset.delay = (idx * 0.12).toFixed(2);
      });
    });

    items.forEach(el => observer.observe(el));
  })();


  /* ----------------------------------------------------------
     4. ANIMATED COUNTERS (big-num elements)
  ---------------------------------------------------------- */
  (function initCounters() {
    const nums = document.querySelectorAll('.big-num[data-target]');
    if (!nums.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const dur    = 1600;
        const start  = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / dur, 1);
          /* ease-out cubic */
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });

    nums.forEach(el => observer.observe(el));
  })();


  /* ----------------------------------------------------------
     5. FAQ ACCORDION
  ---------------------------------------------------------- */
  (function initFaq() {
    const list = document.getElementById('faqList');
    if (!list) return;

    list.addEventListener('click', e => {
      const btn = e.target.closest('.faq-q');
      if (!btn) return;

      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');

      /* close all */
      list.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-a').hidden = true;
      });

      /* toggle current */
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  })();


  /* ----------------------------------------------------------
     6. SMOOTH SCROLL — offset for fixed nav height
  ---------------------------------------------------------- */
  (function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH   = document.getElementById('fitNav')?.offsetHeight ?? 68;
        const top    = target.getBoundingClientRect().top + window.scrollY - navH - 12;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  })();


  /* ----------------------------------------------------------
     7. STRIPE PAYMENT LINK BUTTONS
     When a href is still a placeholder, convert the button into
     a styled "Coming Soon" badge instead of showing an alert.
     Replace hrefs in fitness.html with your actual Stripe URLs
     (buy.stripe.com/...) and the buttons will auto-activate.
  ---------------------------------------------------------- */
  (function initStripeButtons() {
    document.querySelectorAll('.btn-plan').forEach(btn => {
      const href = btn.getAttribute('href');
      if (!href || href.startsWith('YOUR_STRIPE')) {
        /* Mark as Coming Soon — looks intentional, not broken */
        btn.textContent = 'Coming Soon';
        btn.classList.add('coming-soon');
        btn.removeAttribute('href');
        btn.setAttribute('role', 'status');
        btn.setAttribute('aria-label', 'Coming soon — payment link not yet configured');
      }
      /* If it's a real Stripe URL the browser navigates normally */
    });
  })();


  /* ----------------------------------------------------------
     8. FREE RESOURCES FORM — show success message on submit
  ---------------------------------------------------------- */
  (function initResourceForm() {
    const form    = document.getElementById('resource-form');
    const success = document.getElementById('resource-success');
    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /*
        TODO: wire up your email service here.
        Options: Mailchimp, ConvertKit, Beehiiv, Formspree, etc.
        Example with Formspree:
          fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: form.email.value })
          });
      */

      form.hidden = true;
      success.hidden = false;
      success.focus();
    });
  })();


  /* ----------------------------------------------------------
     9. CALENDLY — notify if placeholder URL is still in place
  ---------------------------------------------------------- */
  (function checkCalendly() {
    const widget = document.querySelector('.calendly-inline-widget');
    if (!widget) return;
    const url = widget.dataset.url || '';
    if (url.includes('YOUR_CALENDLY_USERNAME')) {
      /* Replace the widget div with a friendly notice */
      widget.innerHTML = `
        <div style="
          display:flex; flex-direction:column; align-items:center;
          justify-content:center; height:100%; min-height:300px;
          background:var(--surface2); border-radius:14px;
          color:var(--text-muted); text-align:center; padding:2rem; gap:1rem;
        ">
          <div style="font-size:2.5rem;">&#128197;</div>
          <strong style="color:var(--text);font-size:1.1rem;">Calendly Not Yet Connected</strong>
          <p style="max-width:360px;font-size:0.9rem;line-height:1.7;">
            To enable booking:
            <ol style="text-align:left;margin-top:0.75rem;padding-left:1.25rem;display:flex;flex-direction:column;gap:0.4rem;">
              <li>Create a free account at <strong>calendly.com</strong></li>
              <li>Create a <em>30 Minute Meeting</em> event type</li>
              <li>In <code>fitness.html</code> replace <code>YOUR_CALENDLY_USERNAME</code>
                  with your actual Calendly username in the <code>data-url</code> attribute</li>
            </ol>
          </p>
        </div>`;
      widget.style.height = 'auto';
    }
  })();

})();

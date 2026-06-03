'use strict';

// ── Scroll reveal ──────────────────────────────────────────────
// Adds [data-revealed] to elements when they enter the viewport.
// CSS handles the transition. Immediately resolved if
// prefers-reduced-motion is set (CSS also handles this, but we
// skip the observer entirely to avoid any flash).

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.revealed = '';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    revealObserver.observe(el);
  });
} else {
  // Instantly reveal everything so reduced-motion users see content
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    el.dataset.revealed = '';
  });
}

// ── Hero name — letter-by-letter cascade ───────────────────────
// Splits the h1 into per-character spans so each letter staggers in.
// Overrides the CSS heroEnter fallback; CSS fallback still fires if
// JS is unavailable or motion is reduced.

const heroH1 = document.querySelector('.opening h1');
if (heroH1 && !prefersReduced) {
  const text = heroH1.textContent.trim();
  let delay = 60;
  heroH1.style.animation = 'none'; // cancel CSS whole-h1 heroEnter
  heroH1.style.opacity  = '1';     // reveal (was opacity:0 from backwards fill)
  heroH1.innerHTML = [...text].map(ch => {
    if (ch === ' ') return '<span class="h1-space">&thinsp;&thinsp;&thinsp;</span>';
    const out = `<span class="h1-letter" style="animation-delay:${delay}ms">${ch}</span>`;
    delay += 32;
    return out;
  }).join('');
}

// ── Nav hide / show on scroll ──────────────────────────────────
// Slides nav off-screen when scrolling down, back when scrolling up.
// Only activates past the nav height to avoid jumping at page top.

const nav = document.querySelector('.site-nav');

if (nav) {
  let lastScrollY = 0;
  let ticking = false;
  const NAV_H = nav.offsetHeight;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > NAV_H) {
          nav.classList.toggle('nav--hidden', y > lastScrollY);
        } else {
          nav.classList.remove('nav--hidden');
        }
        lastScrollY = y;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

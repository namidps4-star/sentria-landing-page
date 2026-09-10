document.addEventListener('DOMContentLoaded', () => {
  initCursorSpotlight();
  initNavScroll();
  init3DTilt();
  initScrollObserver();
});

/* 1. DYNAMIC CURSOR LIGHTING EFFECT */
function initCursorSpotlight() {
  const spotlight = document.getElementById('cursorSpotlight');
  if (!spotlight) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let spotlightX = mouseX;
  let spotlightY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateSpotlight() {
    spotlightX += (mouseX - spotlightX) * 0.08;
    spotlightY += (mouseY - spotlightY) * 0.08;
    spotlight.style.left = `${spotlightX}px`;
    spotlight.style.top = `${spotlightY}px`;
    requestAnimationFrame(animateSpotlight);
  }
  animateSpotlight();
}

/* 2. NAVIGATION GLASS STICKY STATE */
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* 3. PARALLAX 3D TILT EFFECT FOR CARDS */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* 4. SCROLL REVEAL & STAT COUNTERS INTERSECTION OBSERVER */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observerOptions = {
    root: null,
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Trigger embedded bar chart animations
        const bars = entry.target.querySelectorAll('.bar, .big-bar');
        bars.forEach((bar) => bar.classList.add('animated'));

        // Trigger risk fill animations
        const riskFills = entry.target.querySelectorAll('.risk-fill');
        riskFills.forEach((fill) => fill.classList.add('animated'));

        // Trigger dynamic count-up elements
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach((counter) => animateCounter(counter));

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}

/* 5. COUNT-UP ANIMATION FOR DASHBOARD METRICS */
function animateCounter(el) {
  if (el.classList.contains('counted')) return;
  el.classList.add('counted');

  const target = parseInt(el.getAttribute('data-target'), 10) || 0;
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800; // ms
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;

  const counterInterval = setInterval(() => {
    frame++;
    const progress = easeOutExpo(frame / totalFrames);
    const currentVal = Math.round(target * progress);

    let formattedVal = currentVal.toString();
    if (target === 0) formattedVal = '00';
    else if (currentVal < 10 && target >= 10 && target < 100) {
      formattedVal = '0' + currentVal;
    }

    el.innerText = `${prefix}${formattedVal}${suffix}`;

    if (frame === totalFrames) {
      clearInterval(counterInterval);
    }
  }, frameRate);
}

// Cubic Easing Formula for Smooth Counter Deceleration
function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
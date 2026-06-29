/* ============================================
   CUSTOM CURSOR FOLLOW
============================================ */
const cursor = document.getElementById('cursor');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor(){
  // ease toward target for a slight trailing feel
  cursorX += (mouseX - cursorX) * 0.22;
  cursorY += (mouseY - cursorY) * 0.22;
  if(cursor){
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// hover state on interactive elements
const hoverTargets = document.querySelectorAll(
  'a, button, .bento-item, .item-slot, .github-btn'
);
hoverTargets.forEach((el) => {
  el.addEventListener('mouseenter', () => cursor && cursor.classList.add('is-hover'));
  el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('is-hover'));
});

/* ============================================
   SCROLL REVEAL (fade-up, staggered & rhythmic)
============================================ */
const revealEls = document.querySelectorAll('.fade-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      // small stagger so items feel like they "load in" one by one
      const delay = (entry.target.dataset.delayIndex || 0) * 70;
      setTimeout(() => {
        entry.target.classList.add('in-view');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach((el, index) => {
  el.dataset.delayIndex = index % 4; // keeps stagger short & rhythmic, not laggy
  revealObserver.observe(el);
});

/* ============================================
   LIVE CLOCK (system info vibe)
============================================ */
const clockEl = document.getElementById('clock');

function updateClock(){
  if(!clockEl) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${hh}:${mm}:${ss}`;
}
updateClock();
setInterval(updateClock, 1000);

/* ============================================
   SUBTLE TILT ON PROJECT CARDS (data-tilt attr)
============================================ */
const tiltCards = document.querySelectorAll('[data-tilt]');
tiltCards.forEach((card) => {
  const baseTilt = parseFloat(card.dataset.tilt) || 0;
  card.style.transform = `rotate(${baseTilt * 0.3}deg)`;

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .2s ease';
    card.style.transform = `rotate(0deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = `rotate(${baseTilt * 0.3}deg) translateY(0)`;
  });
});

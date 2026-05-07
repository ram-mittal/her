/* ═══════════════════════════════════════════
   ROMANTIC WEBSITE — JavaScript
   Floating Hearts, Scroll Animations,
   Love Overlay & Confetti
═══════════════════════════════════════════ */

// ─── FLOATING HEARTS ───────────────────────
const heartEmojis = ['💕', '❤️', '🌸', '💖', '💗', '💝', '🌹', '💞', '✨', '🥺'];

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  const left = Math.random() * 100;
  const duration = 8 + Math.random() * 10;
  const delay = Math.random() * 5;
  const size = 1 + Math.random() * 1.2;

  heart.style.cssText = `
    left: ${left}%;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    font-size: ${size}rem;
  `;

  document.getElementById('heartsContainer').appendChild(heart);

  // Remove after animation to prevent DOM bloat
  setTimeout(() => {
    heart.remove();
  }, (duration + delay) * 1000);
}

// Spawn hearts continuously
setInterval(createHeart, 800);
for (let i = 0; i < 8; i++) createHeart(); // Initial batch


// ─── SCROLL REVEAL ─────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Staggered pill reveal
const tagWrapObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pills = entry.target.querySelectorAll('.adore-tag-pill');
      pills.forEach((pill, idx) => {
        setTimeout(() => {
          pill.classList.add('visible-pill');
        }, idx * 60);
      });
      tagWrapObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const tagWrap = document.querySelector('.adore-tags-wrap');
if (tagWrap) tagWrapObserver.observe(tagWrap);



// ─── LOVE OVERLAY ──────────────────────────
function triggerLove() {
  const overlay = document.getElementById('loveOverlay');
  overlay.classList.add('active');

  // Launch confetti-style hearts
  launchHearts();

  // Vibrate if supported (mobile)
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 400]);
  }
}

function closeLove() {
  const overlay = document.getElementById('loveOverlay');
  overlay.classList.remove('active');
}

// Close on background click
document.getElementById('loveOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeLove();
});

// ─── BURST HEARTS ON BUTTON CLICK ──────────
function launchHearts() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.style.cssText = `
        position: fixed;
        font-size: ${1.5 + Math.random() * 2}rem;
        left: ${20 + Math.random() * 60}%;
        bottom: 20%;
        pointer-events: none;
        z-index: 10000;
        animation: burstHeart ${1.5 + Math.random() * 2}s ease-out forwards;
      `;
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }, i * 80);
  }
}

// Inject burst keyframe dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes burstHeart {
    0%   { transform: translateY(0) scale(0.5) rotate(${Math.random() * 60 - 30}deg); opacity: 1; }
    60%  { opacity: 0.9; }
    100% { transform: translateY(-60vh) scale(1.4) rotate(${Math.random() * 180 - 90}deg); opacity: 0; }
  }
`;
document.head.appendChild(style);


// ─── SMOOTH SCROLL OFFSET ──────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ─── PARALLAX HERO (subtle) ─────────────────
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero');
  if (hero && scrollY < window.innerHeight) {
    hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
  }
});


// ─── CURSOR TRAIL HEARTS (desktop only) ────
if (window.innerWidth > 768) {
  let lastTrail = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrail < 200) return;
    lastTrail = now;

    if (Math.random() > 0.5) return; // 50% chance for subtlety

    const trail = document.createElement('div');
    trail.textContent = ['💕','❤️','✨','🌸'][Math.floor(Math.random() * 4)];
    trail.style.cssText = `
      position: fixed;
      left: ${e.clientX - 10}px;
      top: ${e.clientY - 10}px;
      font-size: 1.2rem;
      pointer-events: none;
      z-index: 9998;
      animation: trailFade 0.8s ease-out forwards;
    `;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 800);
  });

  const trailStyle = document.createElement('style');
  trailStyle.textContent = `
    @keyframes trailFade {
      0%   { transform: scale(0.8) translateY(0); opacity: 1; }
      100% { transform: scale(0) translateY(-25px); opacity: 0; }
    }
  `;
  document.head.appendChild(trailStyle);
}


// ─── SECTION ACTIVE HIGHLIGHTING ───────────
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Could add nav highlighting here in future
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));


// ─── PAGE LOAD ANIMATION ───────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});


// ─── EASTER EGG: Konami Code = Love Message ─
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konami[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konami.length) {
      triggerLove();
      konamiIdx = 0;
    }
  } else {
    konamiIdx = 0;
  }
});

// ─── PASSWORD VAULT LOGIC ──────────────────
const passwordScreen = document.getElementById('passwordScreen');
const passwordInput = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');
const passwordError = document.getElementById('passwordError');

if (passwordScreen) {
  // Prevent scrolling while locked
  document.body.style.overflow = 'hidden';

  function checkPassword() {
    const val = passwordInput.value.trim().toLowerCase();
    if (val === 'piku') {
      passwordScreen.classList.add('unlocked');
      document.body.style.overflow = '';
      
      // Auto play music on unlock if possible
      const bgMusic = document.getElementById('bgMusic');
      const musicToggleBtn = document.getElementById('musicToggleBtn');
      if (bgMusic) {
        bgMusic.play().then(() => {
          musicToggleBtn.classList.add('playing');
        }).catch(() => {
          // Autoplay blocked by browser until user interaction
        });
      }
      
      // Launch a burst of hearts
      launchHearts();
    } else {
      passwordError.style.display = 'block';
      // Trigger reflow to restart animation
      passwordError.style.animation = 'none';
      passwordError.offsetHeight; /* trigger reflow */
      passwordError.style.animation = null;
    }
  }

  unlockBtn.addEventListener('click', checkPassword);
  passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
  });
}

// ─── LIVE TIME TOGETHER TIMER ──────────────
const daysCount = document.getElementById('daysCount');
const hoursCount = document.getElementById('hoursCount');
const minutesCount = document.getElementById('minutesCount');
const secondsCount = document.getElementById('secondsCount');

if (daysCount) {
  // Start date: Jan 22, 2026, 10:00 PM
  const startDate = new Date('2026-01-22T22:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const diff = now - startDate;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      daysCount.textContent = days;
      hoursCount.textContent = hours;
      minutesCount.textContent = minutes;
      secondsCount.textContent = seconds;
    }
  }
  
  // Initial call and interval
  updateTimer();
  setInterval(updateTimer, 1000);
}

// ─── MUSIC PLAYER LOGIC ────────────────────
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtn = document.getElementById('musicToggleBtn');

if (musicToggleBtn && bgMusic) {
  bgMusic.volume = 0.4; // Soft background volume
  
  musicToggleBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggleBtn.classList.add('playing');
    } else {
      bgMusic.pause();
      musicToggleBtn.classList.remove('playing');
    }
  });
}

// ─── TAP FOR KISS MARK ─────────────────────
const kissEmojis = ['💋', '💌', '💕', '💗'];

document.addEventListener('click', (e) => {
  // Don't add kiss marks if clicking on interactive elements
  if (e.target.closest('button, a, input, .password-card')) return;

  const kiss = document.createElement('div');
  kiss.classList.add('kiss-mark');
  kiss.textContent = kissEmojis[Math.floor(Math.random() * kissEmojis.length)];
  
  kiss.style.left = `${e.clientX}px`;
  kiss.style.top = `${e.clientY}px`;
  
  document.body.appendChild(kiss);
  
  // Clean up element after animation finishes
  setTimeout(() => {
    kiss.remove();
  }, 1000);
});

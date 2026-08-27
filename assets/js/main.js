// ===== Intro invitation =====
const introOverlay = document.getElementById('introOverlay');
const introEnter = document.getElementById('introEnter');

document.body.style.overflow = 'hidden';

introEnter.addEventListener('click', () => {
  document.body.style.overflow = '';
  introOverlay.classList.add('hide');
  setTimeout(() => introOverlay.remove(), 700);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Countdown =====
const WEDDING_DATE = new Date('2027-07-24T14:30:00');

const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMinutes = document.getElementById('cd-minutes');
const cdSeconds = document.getElementById('cd-seconds');

function pad(n) {
  return String(n).padStart(2, '0');
}

function updateCountdown() {
  const diff = WEDDING_DATE.getTime() - Date.now();

  if (diff <= 0) {
    cdDays.textContent = '00';
    cdHours.textContent = '00';
    cdMinutes.textContent = '00';
    cdSeconds.textContent = '00';
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  cdDays.textContent = pad(days);
  cdHours.textContent = pad(hours);
  cdMinutes.textContent = pad(minutes);
  cdSeconds.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Lightbox gallery =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('[data-lightbox]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    lightboxImg.src = link.getAttribute('href');
    lightboxImg.alt = link.querySelector('img').alt;
    lightbox.classList.add('open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== Header background on scroll =====
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 20 ? '0 4px 20px -8px rgba(60,55,34,0.2)' : 'none';
});

// ===== RSVP multi-guest =====
const guestList = document.getElementById('guestList');
const addGuestBtn = document.getElementById('addGuestBtn');
const MAX_GUESTS = 8;

function renumberGuests() {
  const blocks = guestList.querySelectorAll('.guest-block');
  blocks.forEach((block, i) => {
    const n = i + 1;
    block.querySelector('.guest-number').textContent = `Pessoa ${n}`;
    block.querySelector('input[type="text"]').name = `Pessoa ${n} - Nome`;
    block.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.name = `Pessoa ${n} - Confirmação`;
    });
    block.querySelector('textarea').name = `Pessoa ${n} - Restrição alimentar`;
    block.querySelector('.remove-guest').classList.toggle('is-hidden', blocks.length === 1);
  });
  addGuestBtn.style.display = blocks.length >= MAX_GUESTS ? 'none' : 'block';
}

function createGuestBlock() {
  const block = document.createElement('div');
  block.className = 'guest-block';
  block.innerHTML = `
    <div class="guest-block-header">
      <span class="guest-number"></span>
      <button type="button" class="remove-guest">Remover</button>
    </div>
    <div class="field">
      <label>Nome</label>
      <input type="text" required>
    </div>
    <div class="field">
      <label>Confirma presença?</label>
      <div class="radio-group">
        <label><input type="radio" value="Sim, contamos estar presentes!" required> Sim, contamos estar presentes!</label>
        <label><input type="radio" value="Não poderemos comparecer"> Não poderemos comparecer</label>
      </div>
    </div>
    <div class="field">
      <label>Alguma restrição alimentar?</label>
      <textarea></textarea>
    </div>
  `;
  block.querySelector('.remove-guest').addEventListener('click', () => {
    block.remove();
    renumberGuests();
  });
  return block;
}

guestList.querySelector('.remove-guest').addEventListener('click', () => {
  if (guestList.querySelectorAll('.guest-block').length > 1) {
    guestList.querySelector('.guest-block').remove();
    renumberGuests();
  }
});

addGuestBtn.addEventListener('click', () => {
  guestList.appendChild(createGuestBlock());
  renumberGuests();
});

renumberGuests();

// ===== RSVP: also log to Google Sheet (parallel to FormSubmit email) =====
const SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyzdrUc1tP_CFllqI0Jw_1WNj5Nf82iXiEOT4szWS60UToWgFYaFK1h0MaoGyf_KJhVLw/exec';
const rsvpForm = document.getElementById('rsvpForm');

rsvpForm.addEventListener('submit', () => {
  try {
    const data = new FormData(rsvpForm);
    navigator.sendBeacon(SHEET_WEBAPP_URL, data);
  } catch (err) {
    // Silent fail: FormSubmit still handles the primary submission/email.
  }
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

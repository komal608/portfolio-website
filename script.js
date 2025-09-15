// ========= Utilities =========
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({behavior: 'smooth', block:'start'});
      if (window.innerWidth < 980) hideMobileNav();
    }
  });
});

// ========== Mobile menu toggle ==========
const menuToggle = $('#menu-toggle');
const nav = $('.nav');

function showMobileNav(){
  nav.style.display = 'flex';
  nav.style.flexDirection = 'column';
  nav.style.position = 'absolute';
  nav.style.right = '24px';
  nav.style.top = '64px';
  nav.style.background = 'rgba(0,0,0,0.5)';
  nav.style.padding = '12px';
  nav.style.borderRadius = '8px';
}
function hideMobileNav(){
  nav.removeAttribute('style');
}

menuToggle && menuToggle.addEventListener('click', ()=>{
  if (nav.style.display === 'flex') hideMobileNav();
  else showMobileNav();
});

// ========== Typing effect ==========
const typingEl = document.querySelector('.typing');
const titles = ["Web Developer", "Data Analyst"];
let tIndex = 0, cIndex = 0;
(function typeLoop(){
  const current = titles[tIndex];
  cIndex++;
  typingEl.textContent = current.slice(0, cIndex);
  if (cIndex === current.length){
    setTimeout(()=>{
      let er = setInterval(()=>{
        cIndex--;
        typingEl.textContent = current.slice(0, cIndex);
        if (cIndex === 0){
          clearInterval(er);
          tIndex = (tIndex + 1) % titles.length;
          setTimeout(typeLoop, 300);
        }
      }, 40);
    }, 900);
  } else {
    setTimeout(typeLoop, 120);
  }
})();

// ========== Form behavior ==========
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

form && form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');

  formMsg.textContent = 'Preparing message...';

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  const mailto = `mailto:komalshobha1010@gmail.com?subject=${subject}&body=${body}`;

  window.location.href = mailto;
  formMsg.textContent = 'Mail client should open. If it did not, please email komalshobha1010@gmail.com directly.';
});

// Mail me quick button
const mailMeBtn = document.getElementById('mail-me');
mailMeBtn && mailMeBtn.addEventListener('click', () => {
  window.location.href = 'mailto:komalshobha1010@gmail.com';
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Accessibility: disable animations if prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('*').forEach(el => {
    el.style.transitionDuration = '0ms';
  });
}

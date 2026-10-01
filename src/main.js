const scenes = document.querySelectorAll('.scene, .reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => entry.target.classList.toggle('visible', entry.isIntersecting));
}, { threshold: 0.16 });
scenes.forEach(scene => observer.observe(scene));

const notes = [...document.querySelectorAll('.float-note')];
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    notes.forEach((note, index) => {
      const offset = (y * (0.035 + index * 0.012));
      note.style.transform = `translate3d(${Math.sin(y / 430 + index) * 24}px, ${-offset}px, 0) rotate(${offset * .18}deg)`;
    });
    ticking = false;
  });
}
addEventListener('scroll', onScroll, { passive: true });

const soundButton = document.querySelector('.sound');
soundButton.addEventListener('click', () => {
  const active = soundButton.getAttribute('aria-pressed') === 'true';
  soundButton.setAttribute('aria-pressed', String(!active));
  soundButton.lastChild.textContent = active ? ' Sound' : ' Sound on';
});

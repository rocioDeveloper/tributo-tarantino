import '../styles/main.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FILMS, asset } from '../data/films';
import { $, $$, splitText, prefersReducedMotion } from '../lib/dom';
import { initCursor } from '../lib/cursor';

gsap.registerPlugin(ScrollTrigger);

const SHOW_PRELOADER = true;

/* ---------- 1. Generar tarjetas de la línea de tiempo ---------- */
function renderTimeline() {
  const track = $('[data-tl-track]');
  const cards = FILMS.map((f) => `
    <a class="card" href="./biblioteca.html#${f.id}" data-tl-card data-hover="VER">
      <div class="card__head"><span class="card__year" data-tl-year>${f.year}</span><span class="card__num">Nº ${f.num}</span></div>
      <div class="card__img" data-tl-img>
        ${f.poster
          ? `<img src="${asset(f.poster)}" alt="${f.title}" loading="lazy">`
          : `<div class="placeholder">póster: ${f.title}</div>`}
      </div>
      <div class="card__title">${f.title}</div>
    </a>`).join('');
  const mystery = `
    <div class="card" data-tl-card>
      <div class="card__head"><span class="card__year">20??</span><span class="card__num">Nº 10</span></div>
      <div class="card__img card__img--mystery" data-tl-img>?</div>
      <div class="card__title">La décima</div>
    </div>`;
  track.insertAdjacentHTML('beforeend', cards + mystery);
}

/* ---------- 2. Manchas de sangre (generadas con números pseudoaleatorios fijos) ---------- */
function renderSplats() {
  let seed = 7;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  $$('[data-splat]').forEach((el) => {
    const [cx, cy] = el.dataset.splat!.split(',').map(Number);
    el.style.transformOrigin = `${cx}% ${cy}%`;
    for (let i = 0; i < 60; i++) {
      const big = i < 6;
      const ang = rand() * Math.PI * 2;
      const dist = big ? rand() * 12 : 4 + rand() * 40;
      const size = big ? 8 + rand() * 14 : 0.6 + rand() * 3;
      const stretch = big ? 1 + rand() * 2 : 1 + rand() * 0.4;
      const d = document.createElement('i');
      Object.assign(d.style, {
        left: `${cx + Math.cos(ang) * dist}vw`,
        top: `${cy + Math.sin(ang) * dist * 1.4}vh`,
        width: `${size * stretch}vw`,
        height: `${size}vw`,
        filter: big ? 'blur(6px)' : 'none',
        opacity: big ? '0.85' : '1',
        transform: `translate(-50%,-50%) rotate(${ang * 57.3}deg)`,
      });
      el.appendChild(d);
    }
  });
}

/* ---------- 3. Entrada: preloader + hero ---------- */
function intro() {
  const chars = $$('[data-split]').flatMap((el) => splitText(el));
  const img = $('[data-hero-img]');
  const photo = img.querySelector('img')!;
  gsap.set(chars, { yPercent: 110 });
  gsap.set(img, { clipPath: 'inset(100% 0% 0% 0%)' });
  gsap.set(photo, { scale: 1.3 });

  const tl = gsap.timeline();
  if (SHOW_PRELOADER) {
    const counter = { v: 0 };
    const out = $('[data-counter]');
    tl.to(counter, { v: 100, duration: 2, ease: 'power2.inOut', onUpdate: () => { out.textContent = String(Math.round(counter.v)); } })
      .to('[data-wipe-y]', { y: '0%', duration: 0.6, ease: 'power4.inOut' })
      .to('[data-wipe-r]', { y: '0%', duration: 0.6, ease: 'power4.inOut' }, '-=.4')
      .to('[data-preloader]', { yPercent: -100, duration: 0.8, ease: 'power4.inOut' });
  } else {
    gsap.set('[data-preloader]', { display: 'none' });
  }
  tl.to(img, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.out' }, '-=.4')
    .to(photo, { scale: 1, duration: 1.6, ease: 'power3.out' }, '<')
    .to(chars, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.035 }, '<.2')
    .from('[data-hero-hint]', { opacity: 0, y: 10, duration: 0.5 }, '-=.3');
}

/* ---------- 4. Animaciones ligadas al scroll ---------- */
function scrollAnimations() {
  const heroScroll = { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('[data-hero-img]', { yPercent: 12, ease: 'none', scrollTrigger: heroScroll });
  gsap.to('[data-hero-title]', { yPercent: -40, opacity: 0.2, ease: 'none', scrollTrigger: heroScroll });

  const words = splitText($('[data-words]'), 'words');
  gsap.fromTo(words, { opacity: 0.12 }, {
    opacity: 1, stagger: 0.1, ease: 'none',
    scrollTrigger: { trigger: '[data-words]', start: 'top 80%', end: 'bottom 45%', scrub: true },
  });

  // Scroll horizontal: la sección se fija (pin) y el track se desplaza en X.
  const track = $('[data-tl-track]');
  const dist = () => track.scrollWidth - innerWidth;
  const horizontal = gsap.to(track, {
    x: () => -dist(), ease: 'none',
    scrollTrigger: { trigger: '[data-tl]', pin: true, start: 'top top', end: () => `+=${dist()}`, scrub: 1, invalidateOnRefresh: true },
  });
  gsap.to('[data-tl-progress]', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { trigger: '[data-tl]', start: 'top top', end: () => `+=${dist()}`, scrub: true },
  });
  $$('[data-tl-card]').forEach((card) => {
    const st = { trigger: card, containerAnimation: horizontal, start: 'left 85%', toggleActions: 'play none none reverse' };
    gsap.from(card.querySelector('[data-tl-img]'), { clipPath: 'inset(0% 0% 100% 0%)', rotate: -4, duration: 1, ease: 'power4.out', scrollTrigger: st });
    gsap.from(card.querySelector('[data-tl-year]') ?? card.firstElementChild, { yPercent: 60, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: st });
  });

  gsap.to('[data-marquee]', { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });

  const [s1, s2] = $$('[data-splat]');
  gsap.timeline({ scrollTrigger: { trigger: '[data-blood]', start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
    .to({}, { duration: 0.15 })
    .to(s1, { opacity: 1, scale: 1, duration: 0.25, ease: 'power4.out' })
    .to({}, { duration: 0.15 })
    .to(s2, { opacity: 1, scale: 1, duration: 0.25, ease: 'power4.out' })
    .fromTo('[data-cta]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.12 })
    .to({}, { duration: 0.2 });

  addEventListener('load', () => ScrollTrigger.refresh());
}

/* ---------- Arranque ---------- */
renderTimeline();
renderSplats();
initCursor();
if (prefersReducedMotion()) {
  gsap.set('[data-preloader]', { display: 'none' });
  gsap.set('[data-splat], [data-cta]', { opacity: 1, scale: 1 });
} else {
  intro();
  scrollAnimations();
}

import '../styles/main.css';
import { gsap } from 'gsap';
import { FILMS, asset } from '../data/films';
import { AWARDS, AWARD_NAMES } from '../data/awards';
import { $, $$ } from '../lib/dom';
import type { Film } from '../types';

const PULL_DISTANCE = 48; // px que sube la cinta al pasar el ratón

const shelfView = $('[data-shelf-view]');
const detailView = $('[data-detail]');

/* ---------- Render: estantería ---------- */
function renderShelf() {
  $('[data-spines]').innerHTML = FILMS.map((f) => `
    <button class="spine" data-spine="${f.id}" aria-label="${f.title}" style="background:${f.color ?? '#0E0B0A'}">
      ${f.spine
        ? `<img src="${asset(f.spine)}" alt="">`
        : `<div class="spine__fallback" style="color:${f.ink ?? '#F0B31A'}"><b>${f.year}</b><strong>${f.title}</strong><em>VHS</em></div>`}
      <span class="spine__tag">VER →</span>
    </button>`).join('');

  const rows = [AWARDS.slice(0, 6), AWARDS.slice(6)];
  $('[data-awards]').innerHTML = rows.map((row) => `
    <div class="awards__row">
      ${row.map((a) => `
        <div class="award award--${a.type}" tabindex="0" aria-label="${a.label}">
          <div class="award__tip"><span>${AWARD_NAMES[a.type]}</span><span>${a.year}</span><span>${a.label}</span></div>
          <div class="award__body"><div class="award__head"></div><div class="award__neck"></div><div class="award__base"></div></div>
        </div>`).join('')}
    </div>
    <div class="plank"></div>`).join('');
}

function bindShelf() {
  $$('[data-spine]').forEach((el) => {
    const tag = $('.spine__tag', el);
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { y: -PULL_DISTANCE, rotate: -1.5, duration: 0.45, ease: 'back.out(2)' });
      gsap.to(tag, { opacity: 1, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { y: 0, rotate: 0, duration: 0.5, ease: 'power3.out' });
      gsap.to(tag, { opacity: 0, duration: 0.2 });
    });
    el.addEventListener('click', () => {
      gsap.to(el, { y: -innerHeight, duration: 0.5, ease: 'power3.in', onComplete: () => go(el.dataset.spine!) });
    });
  });

  $$('.award').forEach((el) => {
    const body = $('.award__body', el), tip = $('.award__tip', el);
    const show = () => { gsap.to(body, { y: -10, duration: 0.3, ease: 'back.out(2)' }); gsap.to(tip, { opacity: 1, y: -6, duration: 0.25 }); };
    const hide = () => { gsap.to(body, { y: 0, duration: 0.3 }); gsap.to(tip, { opacity: 0, y: 0, duration: 0.2 }); };
    el.addEventListener('mouseenter', show); el.addEventListener('focus', show);
    el.addEventListener('mouseleave', hide); el.addEventListener('blur', hide);
  });
}

/* ---------- Render: ficha ---------- */
function renderDetail(f: Film, i: number) {
  const prev = FILMS[(i - 1 + FILMS.length) % FILMS.length];
  const next = FILMS[(i + 1) % FILMS.length];
  $('[data-d-num]').textContent = `Película nº ${f.num} · ${f.year}`;
  $('[data-d-poster]').innerHTML = f.poster
    ? `<img src="${asset(f.poster)}" alt="${f.title}">`
    : `<div class="placeholder">póster: ${f.title}</div>`;
  $('[data-d-title]').textContent = f.title;
  $('[data-d-tags]').innerHTML = [f.year, `${f.runtime} min`, f.genre].map((t) => `<span>${t}</span>`).join('');
  $('[data-d-synopsis]').textContent = f.synopsis;
  $('[data-d-cast]').innerHTML = f.cast.map((a) => `<li>${a}</li>`).join('');
  $('[data-d-note]').textContent = f.note;
  const p = $<HTMLButtonElement>('[data-prev]'), n = $<HTMLButtonElement>('[data-next]');
  p.textContent = `← ${prev.title}`; p.onclick = () => go(prev.id);
  n.textContent = `${next.title} →`; n.onclick = () => go(next.id);
}

/* ---------- Router por hash: biblioteca.html#pulp ---------- */
function go(id: string | null) {
  history.replaceState(null, '', id ? `#${id}` : location.pathname);
  show();
}

function show() {
  const id = location.hash.slice(1);
  const i = FILMS.findIndex((f) => f.id === id);
  scrollTo(0, 0);
  if (i >= 0) {
    renderDetail(FILMS[i], i);
    shelfView.hidden = true; detailView.hidden = false;
    gsap.fromTo('[data-d-poster]', { clipPath: 'inset(0% 0% 100% 0%)', rotate: -3 }, { clipPath: 'inset(0% 0% 0% 0%)', rotate: 0, duration: 1, ease: 'power4.out' });
    gsap.fromTo('[data-d-in]', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.15 });
  } else {
    shelfView.hidden = false; detailView.hidden = true;
    gsap.fromTo('[data-spine]', { yPercent: 105, y: 0, rotate: 0 }, { yPercent: 0, duration: 1, stagger: 0.06, ease: 'power4.out' });
    gsap.fromTo('[data-shelf-title]', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' });
  }
}

renderShelf();
bindShelf();
$('[data-back]').addEventListener('click', () => go(null));
addEventListener('hashchange', show);
show();

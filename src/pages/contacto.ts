import '../styles/main.css';
import { gsap } from 'gsap';
import { $, $$ } from '../lib/dom';

const TITLES = ['Reservoir Dogs', 'Pulp Fiction', 'Jackie Brown', 'Kill Bill', 'Death Proof', 'Inglourious Basterds', 'Django Unchained', 'The Hateful Eight', 'Once Upon a Time in Hollywood'];
let favorite = 'Pulp Fiction';

const form = $<HTMLFormElement>('[data-form]');
const sent = $('[data-sent]');
const chips = $('[data-chips]');

function renderChips() {
  chips.innerHTML = TITLES.map((t) =>
    `<button type="button" class="chip" aria-pressed="${t === favorite}" data-film="${t}">${t}</button>`).join('');
}

chips.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest<HTMLButtonElement>('[data-film]');
  if (!btn) return;
  favorite = btn.dataset.film!;
  renderChips();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  // TODO: conectar a un servicio real (Formspree, Netlify Forms…). Ver TAREAS.md.
  $('[data-name]').textContent = String(data.get('nombre'));
  form.hidden = true; sent.hidden = false;
  gsap.from('[data-sent] > *', { y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' });
});

$('[data-reset]').addEventListener('click', () => {
  form.reset(); form.hidden = false; sent.hidden = true;
});

renderChips();
gsap.from('[data-rise]', { yPercent: 110, duration: 1, stagger: 0.1, ease: 'power4.out' });
gsap.from($$('[data-in]'), { y: 30, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out', delay: 0.3 });

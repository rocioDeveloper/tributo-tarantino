import { gsap } from 'gsap';

/** Cursor circular que sigue al ratón y crece sobre enlaces. Muestra data-hover como etiqueta. */
export function initCursor() {
  if (!matchMedia('(hover: hover)').matches) return;
  const cur = document.createElement('div');
  cur.className = 'cursor';
  const label = document.createElement('span');
  cur.appendChild(label);
  document.body.appendChild(cur);
  document.body.classList.add('has-cursor');

  const xTo = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' });
  addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); });
  addEventListener('mouseover', (e) => {
    const t = (e.target as Element).closest('a, button, [data-hover]');
    const txt = t?.getAttribute('data-hover') ?? '';
    gsap.to(cur, { scale: t ? (txt ? 6 : 2.4) : 1, duration: 0.3 });
    label.textContent = txt;
    gsap.to(label, { opacity: txt ? 1 : 0, duration: 0.2 });
  });
}

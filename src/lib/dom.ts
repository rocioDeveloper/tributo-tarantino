/** querySelector tipado que falla con un mensaje claro si el elemento no existe. */
export function $<T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T {
  const el = root.querySelector<T>(sel);
  if (!el) throw new Error(`No se encontró ${sel}`);
  return el;
}

export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T[] =>
  [...root.querySelectorAll<T>(sel)];

/** Parte un texto en <span> por letra o por palabra para animarlos uno a uno. */
export function splitText(el: HTMLElement, mode: 'chars' | 'words' = 'chars'): HTMLSpanElement[] {
  const text = el.textContent?.trim() ?? '';
  el.textContent = '';
  const parts = mode === 'words' ? text.split(' ') : [...text];
  return parts.map((p, i) => {
    const s = document.createElement('span');
    s.textContent = p === ' ' ? '\u00a0' : p;
    s.style.display = 'inline-block';
    el.appendChild(s);
    if (mode === 'words' && i < parts.length - 1) el.appendChild(document.createTextNode(' '));
    return s;
  });
}

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

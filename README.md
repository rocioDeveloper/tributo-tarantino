# Tarantino · Página tributo

Sitio tributo a Quentin Tarantino hecho con **Vite + TypeScript + GSAP**. Proyecto de aprendizaje: el diseño se itera en Claude Design y se implementa aquí.

## Ejecutar

```bash
npm install
npm run dev       # servidor local en http://localhost:5173
npm run build     # genera /dist listo para publicar
npm run preview   # prueba el build
```

## Estructura

```
├── index.html            # Principal
├── biblioteca.html       # Estantería VHS + ficha (biblioteca.html#pulp)
├── contacto.html         # Formulario
├── public/assets/        # Imágenes (se copian tal cual al build)
└── src/
    ├── types.ts          # Interfaces Film y Award
    ├── data/films.ts     # Datos de las películas
    ├── data/awards.ts    # Datos de los premios
    ├── lib/dom.ts        # Helpers: $, $$, splitText, prefersReducedMotion
    ├── lib/cursor.ts     # Cursor personalizado
    ├── pages/*.ts        # Lógica y animaciones de cada página
    └── styles/main.css   # Estilos (variables en :root)
```

## Animaciones (GSAP)

| Efecto | Archivo | Herramienta |
| --- | --- | --- |
| Contador y cortinillas | home.ts → `intro()` | `gsap.timeline` |
| Texto letra por letra | home.ts, contacto.ts | `stagger` + `yPercent` |
| Imagen que se destapa | home.ts, biblioteca.ts | `clipPath: inset()` |
| Parallax del hero | home.ts | `ScrollTrigger` + `scrub` |
| Scroll horizontal | home.ts | `pin` + `containerAnimation` |
| Manchas de sangre | home.ts | timeline con `scrub` |
| Cursor | cursor.ts | `gsap.quickTo` |
| VHS que sale del estante | biblioteca.ts | `back.out` en hover |

## Publicar en GitHub Pages

1. `npm run build`
2. Sube el contenido de `dist/` a la rama `gh-pages` (o usa la acción oficial *Deploy static content to Pages*).

## Flujo de trabajo

Diseño en Claude Design → `CHANGELOG.md` con los cambios → implementación aquí → commit con la versión.
Tareas pendientes para practicar: ver `TAREAS.md`.

## Aviso legal

Página tributo sin ánimo de lucro con fines educativos. Sin relación oficial con Quentin Tarantino ni con ningún estudio. Los derechos de películas, imágenes y marcas pertenecen a sus propietarios.

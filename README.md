# Tarantino · Página tributo

Sitio web tributo a Quentin Tarantino. Es un proyecto de aprendizaje para entender cómo trabajar con IA, TypeScript, GSAP y Vite, y cómo construir un frontend optimizado. El foco principal está en las animaciones de GSAP y en cómo integrarlas en una interfaz real.

El proyecto se irá refinando con cada iteración.

**Versión:** 0.0.1

### Cambios en 0.0.1

* &#x20;En el primer mockup tenían problemas de color. Fondo del hero de la página principal cambiado a `#FE0000` para coincidir con el fondo de la imagen.

## Páginas

* **Principal** (`Principal.dc.html`): pantalla de carga, presentación de Quentin Tarantino y línea de tiempo horizontal de su filmografía (1992 – hoy) controlada por el scroll.
* **Biblioteca** (`Biblioteca.dc.html`): estante de cintas VHS. Al pasar el ratón la cinta sale del estante; al hacer clic se abre la ficha de la película (año, duración, género, sinopsis, reparto y un detalle).
* **Contacto** (`Contacto.dc.html`): formulario con selector de película favorita y mensaje de confirmación.

## Animaciones (GSAP 3.12)

|Efecto|Dónde|Herramienta|
|-|-|-|
|Contador y cortinillas de entrada|Principal|`gsap.timeline`|
|Texto que sube letra por letra|Principal, Contacto|`stagger` + `yPercent`|
|Imagen que se destapa|Principal, Biblioteca|`clipPath: inset()`|
|Parallax de la portada|Principal|`ScrollTrigger` + `scrub`|
|Texto que se ilumina por palabras|Principal|`ScrollTrigger` + `scrub`|
|Scroll horizontal fijado|Principal|`pin` + `containerAnimation`|
|Cursor que sigue al ratón|Principal|`gsap.quickTo`|
|Cinta de texto infinita|Principal|`repeat: -1`|
|VHS que sale del estante|Biblioteca|`back.out` en hover|

## Paleta

|Color|Hex|Uso aproximado|
|-|-|-|
|Rojo|`#E8171B`|30 %|
|Amarillo|`#F0B31A`|30 %|
|Negro|`#0E0B0A`|20 %|
|Blanco|`#F6F1E7`|10 %|

Tipografías (Google Fonts): **Corben** (títulos, alternativa libre a la tipografía de los créditos de Tarantino), **Anton** y **Courier Prime**.

## Ejecutar en local

Las páginas cargan GSAP y las fuentes desde CDN, así que hace falta conexión a internet. Sirve la carpeta con cualquier servidor estático:

```bash
npx serve .
# o
python3 -m http.server 8000
```

Abre `http://localhost:8000/Principal.dc.html`.

## Estructura

```
├── Principal.dc.html
├── Biblioteca.dc.html
├── Contacto.dc.html
├── support.js        # runtime de los componentes
├── assets/           # pósters, VHS y retratos
└── README.md
```

## Hoja de ruta

* \[ ] Optimizar imágenes (WebP/AVIF, `loading="lazy"`, tamaños responsivos).
* \[ ] Añadir pósters de Jackie Brown, Death Proof y The Hateful Eight.
* \[ ] Respetar `prefers-reduced-motion`.
* \[ ] Rutas reales para cada ficha de película.
* \[ ] Cambiar tipografia principal
* \[ ] Agregar datos de premios
* \[ ] Cambiar animación de texto biografía.
* \[ ] Añadir una imagen a cuerpo completo de Quentin a la biografía

## Aviso legal

Esta es una página tributo sin ánimo de lucro, hecha con fines educativos. No tiene relación oficial con Quentin Tarantino ni con ningún estudio. Todos los derechos sobre las películas, imágenes, pósters, títulos y marcas pertenecen a sus respectivos propietarios.


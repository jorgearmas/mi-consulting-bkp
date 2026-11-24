# Pendientes — 21 nov 2026

Contexto: se reemplazó el sitio viejo por la exportación de Perplexity (copiada tal cual al root) y se agregó `privacy.html`. **Nada está commiteado todavía** — no hacer commit hasta revisar esto.

Para verlo: `python3 -m http.server 8000` → http://localhost:8000

## Lista de arreglos

1. ~~Sacar el script de Perplexity~~ ✅ Hecho (22 nov): borrado de las 9 páginas.
2. ~~Comprimir imágenes~~ ✅ Hecho (22 nov): `hero.webp` (2400 px, 330 KB) y `services.webp` (72 KB) para la página, `hero.jpg` (112 KB) para la vista previa al compartir. PNG originales `assets/hero.png` y `assets/services.png` (12 MB): ✅ Decidido (22 nov), se quedan en el repo como fuente de las versiones comprimidas.
3. ~~Calendly~~ ✅ Decidido (22 nov): queda el "discovery call" actual (`calendly.com/consultwithmi/discovery-call-fractional-food-safety-department`).
4. **Formspree** (lo vemos después): no sabemos a qué correo llegan los formularios. Contacto (`index.html`) → `mlgoqzvq`; capacitación (`training-inquiry.html`) → `xdapqbjj`. Averiguar quién es dueño de esos formularios, o crear uno propio y reemplazar los IDs.
5. **Correo de contacto:** 10 links usan `info@manufacturingintelligence.ai` y 1 usa `sam@consultwithmi.com`. Decidir cuál queda.
6. ~~Página de privacidad~~ ✅ Hecha (`privacy.html`, link en el footer de todas las páginas y en `sitemap.xml`). Falta revisar:
   - Correo de contacto de la política (puse `info@manufacturingintelligence.ai`; la vieja usaba `marketing@consultwithmi.com`).
   - ~~Mención a LinkedIn Lead Gen Forms~~ ✅ Se queda.
   - ~~Aviso en los formularios~~ ✅ Agregado (22 nov): "By submitting this form, you agree to our Privacy Policy" en contacto y en training-inquiry.
   - Que Sam lea el texto antes de publicar (no lo revisó un abogado).

7. **SEO y GEO al máximo** (auditoría del 23 nov). Lo que ya está bien: título, description, canonical y robots en todas las páginas; un solo h1; alt en las imágenes; Open Graph y Twitter Card; JSON-LD `LocalBusiness` + `FAQPage` (15 preguntas) en la home y `BreadcrumbList` en las páginas de temas; `robots.txt` abierto a todos los bots, incluidos los de IA.
   - ~~`sameAs` apuntaba a la portada de LinkedIn~~ ✅ Hecho (23 nov): ahora va a `linkedin.com/company/miconsultingroup/`.
   - **Correcciones rápidas:**
     - Agregar `training-inquiry.html` al `sitemap.xml`.
     - Poner `<lastmod>` a cada URL del sitemap.
     - Agregar `dateModified` al JSON-LD de cada página.
     - Agregar Open Graph y Twitter Card a `privacy.html`.
   - **Datos estructurados (lo que más pesa para GEO):**
     - `Person` para Sam Peña: credenciales (SQF Practitioner, PCQI, Six Sigma…), años de experiencia, su LinkedIn en `sameAs`, y conectado a la empresa como `founder`. Necesito sus credenciales exactas.
     - `Service` + `Offer` para los 3 planes: BUILD $5,000, GROWTH $2,500 y SUSTAIN $1,500/mes.
     - `Course` en `enroll-sqf`, `enroll-haccp` y `enroll-pcqi`, con proveedor, modalidad e idioma.
     - `FAQPage` en `sqf`, `haccp`, `pcqi` y `fsma-204`. Hoy solo la home lo tiene, así que hay que escribir preguntas y respuestas por tema.
     - `areaServed` más fino: California, Central Valley y Bakersfield, además de EE. UU. Sumar teléfono y `openingHours` si los hay.
   - **Para las IA:**
     - `llms.txt` en el root: resumen del negocio, servicios, precios y links a cada página.
     - Respuestas directas al inicio de cada página de tema, en 2 o 3 frases que se puedan citar tal cual (qué es, quién lo necesita, cuánto tarda o cuesta).
     - Datos concretos y verificables: número de clientes y de auditorías aprobadas, y testimonios con nombre y empresa, si Sam los autoriza.
   - **Contenido nuevo:**
     - Versión en español de las páginas principales, con `hreflang` en ambas versiones. Se ofrece soporte bilingüe y hoy no hay nada en español; la competencia en búsquedas como "consultor SQF en español" o "capacitación HACCP en español" es baja.
     - Artículos o guías que respondan preguntas frecuentes de búsqueda: costo de la certificación SQF, SQF vs. BRCGS, checklist de auditoría SQF, fechas de FSMA 204.
     - Enlaces internos entre las páginas de temas, inscripciones y la home, con texto descriptivo.
   - **Fuera del sitio:**
     - Google Business Profile en Bakersfield.
     - Alta en Google Search Console y Bing Webmaster Tools (Bing alimenta a ChatGPT), y enviar el sitemap.
     - Página de LinkedIn de la empresa completa y con link al sitio.
     - Aparecer en directorios del sector: SQFI consultant registry, asociaciones de alimentos de California.
   - **Técnico:**
     - Revisar Core Web Vitals en producción con PageSpeed Insights, sobre todo el LCP del hero.
     - Precargar `hero.webp` con `<link rel="preload">`.
     - Revisar el contraste en modo oscuro.

## Hecho el 23 nov

- Switch de modo claro/oscuro en el nav de todas las páginas. El sitio abre siempre en modo claro, sin importar la configuración del sistema, y la elección se guarda en `localStorage`.
- `sameAs` del JSON-LD de la home apunta a la página de LinkedIn de la empresa.

## Hecho el 22 nov

- Diseño: se aplicó la filosofía visual del sitio anterior sobre el de Perplexity (bloque "DESIGN LAYER" al final de `style.css` + fuentes Montserrat/Fraunces/Archivo). Contenido, textos y scripts sin cambios. Sin foto de Sam.
- Ajustes de diseño en la home: hero navy con foto nítida y texto a la izquierda (se quitó la línea "SQF Only · Tech Driven · People First" del hero), cards Problema/Solución con borde gris/verde y flecha verde, cards de departamentos con borde verde, estrella en "Every Client Starts Here", fondos alternados en cada sección (también en `fsma-204.html`), y secciones más anchas (encabezados, roadmap, tabla de cadencia, pasos, testimonio, quiz y FAQ).
- Logo y favicon: se reemplazó el escudo SVG de Perplexity por el logo PNG del sitio viejo (`logo_mi.png` en el menú, `logo_mi_blanco.png` en el footer y en modo oscuro) y se restauraron los favicons viejos en `assets/`.

## Al final

- Commit (todo lo de arriba más `CLAUDE.md` actualizado).

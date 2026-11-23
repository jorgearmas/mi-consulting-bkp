# Pendientes — 21 nov 2026

Contexto: se reemplazó el sitio viejo por la exportación de Perplexity (copiada tal cual al root) y se agregó `privacy.html`. **Nada está commiteado todavía** — no hacer commit hasta revisar esto.

Para verlo: `python3 -m http.server 8000` → http://localhost:8000

## Lista de arreglos

1. ~~Sacar el script de Perplexity~~ ✅ Hecho (22 nov): borrado de las 9 páginas.
2. ~~Comprimir imágenes~~ ✅ Hecho (22 nov): `hero.webp` (2400 px, 330 KB) y `services.webp` (72 KB) para la página, `hero.jpg` (112 KB) para la vista previa al compartir. **Pendiente:** decidir qué hacer con los PNG originales `assets/hero.png` y `assets/services.png` (12 MB, ya no se usan, nunca entraron a git).
3. ~~Calendly~~ ✅ Decidido (22 nov): queda el "discovery call" actual (`calendly.com/consultwithmi/discovery-call-fractional-food-safety-department`).
4. **Formspree** (lo vemos después): no sabemos a qué correo llegan los formularios. Contacto (`index.html`) → `mlgoqzvq`; capacitación (`training-inquiry.html`) → `xdapqbjj`. Averiguar quién es dueño de esos formularios, o crear uno propio y reemplazar los IDs.
5. **Correo de contacto:** 10 links usan `info@manufacturingintelligence.ai` y 1 usa `sam@consultwithmi.com`. Decidir cuál queda.
6. ~~Página de privacidad~~ ✅ Hecha (`privacy.html`, link en el footer de todas las páginas y en `sitemap.xml`). Falta revisar:
   - Correo de contacto de la política (puse `info@manufacturingintelligence.ai`; la vieja usaba `marketing@consultwithmi.com`).
   - ~~Mención a LinkedIn Lead Gen Forms~~ ✅ Se queda.
   - ~~Aviso en los formularios~~ ✅ Agregado (22 nov): "By submitting this form, you agree to our Privacy Policy" en contacto y en training-inquiry.
   - Que Sam lea el texto antes de publicar (no lo revisó un abogado).

## Hecho el 22 nov

- Diseño: se aplicó la filosofía visual del sitio anterior sobre el de Perplexity (bloque "DESIGN LAYER" al final de `style.css` + fuentes Montserrat/Fraunces/Archivo). Contenido, textos y scripts sin cambios. Sin foto de Sam.
- Ajustes de diseño en la home: hero navy con foto nítida y texto a la izquierda (se quitó la línea "SQF Only · Tech Driven · People First" del hero), cards Problema/Solución con borde gris/verde y flecha verde, cards de departamentos con borde verde, estrella en "Every Client Starts Here", fondos alternados en cada sección (también en `fsma-204.html`), y secciones más anchas (encabezados, roadmap, tabla de cadencia, pasos, testimonio, quiz y FAQ).
- Logo y favicon: se reemplazó el escudo SVG de Perplexity por el logo PNG del sitio viejo (`logo_mi.png` en el menú, `logo_mi_blanco.png` en el footer y en modo oscuro) y se restauraron los favicons viejos en `assets/`.

## Al final

- Commit (todo lo de arriba más `CLAUDE.md` actualizado).

# Guion de presentación — ExpressDelivery

**Situación evaluativa 2 · 60% de la nota · Evaluación individual**
15 minutos de exposición + 5 minutos de preguntas abiertas.

> La presentación pesa más que el encargo (60% vs 40%) y **cada integrante se evalúa por
> separado**. Cada uno debe poder explicar el proyecto completo, no solo su parte.

---

## Reparto de los 15 minutos

| Bloque | Minutos | Expone | Indicador que cubre |
|---|---|---|---|
| Contexto del caso y solución propuesta | 2 | Axel | — |
| Estructura HTML y semántica | 3 | Axel | IE1.1.3 (10%) |
| Diseño CSS externo y responsividad | 4 | Alexis | IE1.1.4 (15%) |
| Validaciones con JavaScript (demo en vivo) | 4 | Isidora | IE1.2.2 (15%) |
| Repositorio y trabajo colaborativo | 2 | Los tres | IE1.3.2 (20%) |

---

## Bloque 1 — Contexto (Axel, 2 min)

ExpressDelivery hace 150 entregas diarias con 18 vehículos y 22 repartidores, gestionando
todo con planillas Excel y llamadas telefónicas. La demanda creció 60% en dos años y el
sistema manual se quebró: 20% de rutas ineficientes, 15% de la jornada perdida en
desplazamientos, 50 llamadas diarias preguntando dónde está el paquete y 25% de rotación
anual de repartidores.

La Entrega 1 construye la cara visible del sistema: la tienda donde el cliente contrata
sus envíos, y el panel donde la empresa gestiona el catálogo y los usuarios.

---

## Bloque 2 — HTML y semántica (Axel, 3 min) · IE1.1.3

**Qué mostrar:** abrir `index.html` en el editor y recorrer la estructura.

**Qué decir:**

- La página no está armada con `<div>` genéricos. Cada zona usa la etiqueta que describe
  su función: `<header>` para el encabezado, `<nav>` para el menú, `<main>` para el
  contenido principal, `<section>` para cada bloque temático, `<article>` para cada
  unidad independiente (una tarjeta de producto, un blog) y `<footer>` para el pie.
- **Por qué importa:** un lector de pantalla puede saltar directamente al `<main>` sin
  leer el menú completo; los buscadores identifican qué parte de la página es el
  contenido real; y el código queda legible para el siguiente que lo mantenga.
- La navegación es completa: hipervínculos entre las 18 vistas, imágenes con `alt`
  descriptivo, botones operativos, un video embebido en el home, seis formularios
  interactivos y un footer informativo con datos de contacto.
- Detalle a mencionar: `<article>` se usa cuando el contenido tiene sentido por sí solo
  fuera de la página; `<section>` cuando es un bloque temático que depende del contexto.

**Preguntas probables:**
- *¿Por qué `<section>` y no `<div>`?* → `<div>` no comunica nada; `<section>` declara que
  es un bloque temático con su propio título, y por eso cada uno lleva `aria-labelledby`
  apuntando a su encabezado.
- *¿Dónde usaron `<aside>`?* → En el resumen lateral del carrito y en el panel de datos de
  contacto: contenido relacionado pero secundario.

---

## Bloque 3 — CSS externo y responsividad (Alexis, 4 min) · IE1.1.4

**Qué mostrar:** `assets/css/estilos.css` desde arriba, y luego achicar la ventana del
navegador en vivo para que se vea el cambio de layout.

**Qué decir:**

- Hay **un solo archivo de estilos** para las 18 páginas, enlazado con
  `<link rel="stylesheet" href="assets/css/estilos.css">`. No existe ni un estilo en línea
  ni un `<style>` dentro del HTML.
- **Por qué externa:** si el cliente pide cambiar el color corporativo, se modifica una
  línea en un archivo y cambian las 18 páginas. Con estilos en línea habría que buscar y
  editar cientos de etiquetas.
- El archivo empieza con un bloque `:root` de **variables CSS** (`--ed-azul`,
  `--ed-naranja`, `--ed-radio`...). Es el mismo principio llevado un paso más allá: los
  valores se declaran una vez y se reutilizan en todo el archivo.
- Está organizado en 13 secciones comentadas: tokens, base, navegación, hero, tarjetas,
  botones, formularios, carrito, blogs, estados, footer, panel admin y media queries.
- **Bootstrap** aporta la grilla y los componentes base; nuestra hoja se carga **después**
  para poder sobrescribirlo. Ese orden es deliberado y hay que saber explicarlo.
- **Responsividad:** tres breakpoints. Bajo 992px el panel admin pasa de menú lateral a
  menú horizontal; bajo 576px los botones ocupan el ancho completo. Esto responde a una
  restricción del caso: los repartidores usan smartphone y tienen manejo básico de
  tecnología, por eso botones grandes y texto claro.

**Preguntas probables:**
- *¿Por qué Bootstrap antes que su CSS?* → Por la cascada: en igualdad de especificidad
  gana la regla que se declara después.
- *¿Qué pasa si no hay internet?* → Bootstrap viene de CDN, así que se pierde su grilla,
  pero los estilos propios son locales y el sitio conserva identidad y estructura.

---

## Bloque 4 — Validaciones en JavaScript (Isidora, 4 min) · IE1.2.2

**Qué mostrar (demo en vivo, no diapositivas):**

1. Abrir `registro.html`. Escribir `juan@hotmail.com` → aparece el mensaje de dominio no
   permitido **mientras se escribe**, sin apretar enviar.
2. Escribir un RUN inválido (`123456789`) → mensaje de dígito verificador incorrecto.
   Corregirlo por uno válido (`190110222`) → el borde pasa a verde.
3. Escribir en la dirección y mostrar el **contador de caracteres** avanzando.
4. Elegir una región → mostrar que el select de comuna se llena solo con las comunas de
   esa región.
5. Apretar Registrar con campos vacíos → el formulario **no se envía** y todos los errores
   aparecen a la vez.

**Qué decir:**

- Los `<form>` llevan `novalidate` **a propósito**: eso apaga los mensajes por defecto del
  navegador (que salen en el idioma del sistema y no se pueden estilizar) y deja que se
  muestren solo nuestros mensajes en español, ubicados justo debajo del campo con problema.
- Cada campo tiene una función validadora que devuelve texto vacío si está correcto o el
  mensaje de error si no. Se conectan a los eventos `input` y `blur` para validar en
  tiempo real, y se vuelven a ejecutar todas al enviar. Si alguna falla,
  `event.preventDefault()` bloquea el envío.
- El **RUN se valida con Módulo 11**, no solo por formato: se multiplica cada dígito de
  derecha a izquierda por la serie 2,3,4,5,6,7 (que se repite), se suma, y el dígito
  verificador es 11 menos el resto de dividir por 11, con los casos especiales 10 = K y
  11 = 0.
- Además de las reglas del enunciado, el equipo agregó **reglas de negocio propias**: RUN
  y correo únicos, código de producto único, stock crítico que no puede superar al stock,
  y edad mínima de 13 años.
- El **carrito** guarda en `localStorage` solo el código y la cantidad de cada producto.
  El precio se lee del catálogo al mostrar, así que si el administrador cambia un precio,
  el carrito del cliente se actualiza solo.

**Preguntas probables:**
- *¿Por qué guardar solo el código en el carrito y no el producto completo?* → Para que el
  precio nunca quede congelado y desactualizado.
- *¿Qué pasa si el usuario borra el localStorage?* → El sistema vuelve a cargar los datos
  originales desde `datos.js`; hay una función `restablecerProductos()` para eso.
- *¿Por qué no usan la validación HTML `required` sola?* → Porque no permite mensajes
  personalizados ni reglas de negocio como el Módulo 11.

---

## Bloque 5 — Repositorio y colaboración (los tres, 2 min) · IE1.3.2

**Qué mostrar:** GitHub abierto, pestaña de commits, y en la terminal:

```bash
git log --oneline --graph --all
git shortlog -sn
```

**Qué decir (cada uno una razón, para que se note el aporte individual):**

- **Axel:** *Permite volver atrás sin perder el avance.* Cuando detectamos que los RUN de
  prueba tenían mal el dígito verificador, revertimos solo ese cambio.
- **Alexis:** *Deja constancia de quién hizo qué.* Trabajamos en tres ramas separadas por
  frente —HTML, CSS y JavaScript— para no pisarnos, e integramos por pull request.
- **Isidora:** *Obliga a trabajar en unidades pequeñas y completas.* Un commit que se
  describe en una línea es un cambio acotado y probado; "cambios varios" esconde tres
  problemas mezclados.

---

## Checklist antes de presentar

- [ ] El repositorio está **público** y el enlace funciona en una ventana de incógnito.
- [ ] Los commits aparecen con los **tres nombres** (revisar `git shortlog -sn`).
- [ ] El proyecto abre sin errores en la consola del navegador (F12).
- [ ] Probar el login con los tres perfiles: administrador, vendedor y cliente.
- [ ] Vaciar el `localStorage` antes de la demo para partir con los datos originales
      (F12 → Application → Local Storage → borrar las claves `ed_*`).
- [ ] Tener el ERS y la planilla abiertos en otra pestaña por si los piden.
- [ ] Cada integrante debe poder explicar **cualquier** parte del proyecto, no solo la suya.

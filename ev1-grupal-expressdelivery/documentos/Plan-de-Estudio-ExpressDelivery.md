# Plan de estudio completo — ExpressDelivery

Esto está pensado para que quedes capaz de responder cualquier pregunta sobre
el proyecto, no solo tu parte. Está dividido en bloques: primero los
fundamentos (HTML, CSS, JS en general), después el recorrido específico de
nuestro código archivo por archivo, y al final un diálogo tipo simulacro de
interrogación.

No te lo aprendas de memoria. Léelo, ábrete el código al lado, y ve
comprobando que cada cosa que dice acá la encuentras en el archivo real.

---

# PARTE 1 — FUNDAMENTOS

## 1.1 HTML — ¿para qué sirve y por qué lo escribimos así?

HTML no es "el diseño" — es la **estructura y el significado** del
contenido. El CSS decide cómo se ve, el HTML decide qué es cada cosa.

**Etiquetas semánticas que usamos y por qué:**
- `<header>` — el encabezado de la página (ahí va el logo y el menú).
- `<nav>` — específicamente para bloques de navegación (el menú principal,
  o el "breadcrumb" tipo Home > Blogs > Caso 1).
- `<main>` — el contenido principal único de la página. Solo debe haber uno
  por página.
- `<section>` — un bloque temático dentro de la página (ej: "Cómo sigues tu
  envío").
- `<article>` — algo que tiene sentido leído solo, fuera de contexto (una
  tarjeta de blog, una tarjeta de producto).
- `<footer>` — el pie de página.
- `<form>` — agrupa los campos de un formulario para que el navegador sepa
  qué se está enviando.

**¿Por qué importa esto y no es solo estética?**
1. **Accesibilidad:** un lector de pantalla (para personas con discapacidad
   visual) usa estas etiquetas para navegar la página por bloques. Si todo
   fuera `<div>`, no tendría cómo saber qué es el menú y qué es el
   contenido.
2. **SEO:** buscadores como Google entienden mejor de qué trata la página.
3. **Mantenibilidad:** cualquiera que abra el código entiende la estructura
   de un vistazo, sin tener que leer clases CSS para adivinar qué es cada
   `<div>`.

**Atributos que vale la pena poder explicar:**
- `alt` en las imágenes: texto alternativo si la imagen no carga, y lo que
  lee un lector de pantalla. Por eso nunca lo dejamos vacío.
- `aria-label`, `aria-labelledby`, `aria-current`: le dan información extra
  de accesibilidad a elementos que no la tienen por defecto (un botón sin
  texto, indicar cuál es la página actual en el menú).
- `required`, `min`, `max`, `maxlength` en los `<input>`: validación básica
  que hace el navegador solo, antes incluso de que corra nuestro JavaScript.

## 1.2 CSS — ¿para qué sirve y cómo está organizado el nuestro?

**Los tres lugares donde se puede poner CSS**, de memoria:
1. Inline: `style="color: red;"` directo en la etiqueta.
2. Interno: un bloque `<style>` dentro del `<head>`.
3. Externo: un archivo `.css` aparte, enlazado con `<link>` — **es el que
   usamos nosotros** (`assets/css/estilos.css`), porque el enunciado lo pide
   explícito y porque así el mismo archivo aplica a las 18 páginas: cambias
   un color una vez y se actualiza en todos lados.

**El box model (esto lo preguntan seguro):** todo elemento HTML es una caja
compuesta por, de adentro hacia afuera: `content` → `padding` (espacio
interno) → `border` (el borde) → `margin` (espacio externo, fuera de la
caja). Si algo se ve "pegado" a otra cosa, casi siempre es un problema de
padding o margin.

**Variables CSS (`:root { --ed-azul: ... }`):** en vez de escribir
`#1e2a3a` en 15 lugares distintos, lo escribimos una vez como variable y
después usamos `var(--ed-azul)`. Si el profesor pregunta "¿y si quieren
cambiar el color de marca?", la respuesta es: se cambia una sola línea en
`:root` y se actualiza en todo el sitio.

**Diseño responsivo:** usamos `@media (max-width: 991.98px)` y
`@media (max-width: 575.98px)` — son reglas que solo aplican cuando la
pantalla es más angosta que ese ancho. Así el sitio se ve bien en celular
(clave, porque los repartidores usan celular) y en escritorio.

**Bootstrap vs. nuestro CSS propio:** Bootstrap da la base (la grilla de
columnas, los componentes como el navbar o los botones). Nuestro
`estilos.css` se carga **después** de Bootstrap en el `<head>`, justamente
para poder sobrescribir sus estilos por defecto y darle la identidad visual
de ExpressDelivery (colores, tarjetas, etc.).

## 1.3 JavaScript — conceptos que hay que tener sólidos

- **Variable vs. función vs. objeto vs. arreglo:** una variable guarda un
  dato (`const nombre = "Juan"`), una función es un bloque de código
  reutilizable, un objeto agrupa datos relacionados con `{clave: valor}`
  (ej. un producto), y un arreglo es una lista de cosas (`[]`) — nuestro
  catálogo completo de productos es un arreglo de objetos.
- **DOM (Document Object Model):** es la representación en memoria de la
  página HTML que el navegador arma, y que JavaScript puede leer y
  modificar. `document.getElementById("grilla-productos")` busca en esa
  estructura el elemento con ese `id`.
- **`innerHTML`:** una forma de insertar HTML dentro de un elemento desde
  JavaScript. Lo usamos todo el tiempo para "dibujar" las tarjetas de
  producto dinámicamente.
- **Eventos:** `addEventListener("click", function() {...})` — le dice al
  navegador "cuando pase esto, ejecuta esta función". Es la base de que un
  botón realmente haga algo.
- **`localStorage`:** una especie de librito que el navegador guarda en el
  computador del usuario, que sobrevive aunque cierres la pestaña o
  recargues la página (a diferencia de una variable normal, que se borra al
  recargar). Ahí guardamos el carrito, la sesión, y los productos/usuarios
  que el admin modifica. Solo puede guardar texto, por eso todo se convierte
  con `JSON.stringify()` al guardar y `JSON.parse()` al leer.
- **Arreglos y sus métodos:** `.map()` (transforma cada elemento en otra
  cosa, lo usamos para convertir cada producto en su tarjeta HTML),
  `.filter()` (deja solo los que cumplen una condición, ej. filtrar por
  categoría), `.find()` (busca un elemento específico, ej. buscar un
  producto por código).
- **Expresiones regulares (regex):** un patrón para validar formato de
  texto. Por ejemplo, para el correo: solo aceptamos `@duoc.cl`,
  `@profesor.duoc.cl` o `@gmail.com`.

---

# PARTE 2 — RECORRIDO DEL PROYECTO, ARCHIVO POR ARCHIVO

## 2.1 Las 11 páginas de la tienda (HTML)

`index.html`, `login.html`, `registro.html`, `nosotros.html`, `blogs.html`,
`blog-detalle-1.html`, `blog-detalle-2.html`, `productos.html`,
`detalle-producto.html`, `carrito.html`, `contacto.html`.

Todas comparten la misma estructura: `<header>` con el nav, `<main>` con el
contenido propio de cada página, `<footer>` igual en todas. Varias tienen
**contenedores vacíos** en el HTML (como `<div id="grilla-productos"></div>`)
que JavaScript llena al cargar la página — eso es clave entenderlo: el HTML
es solo el molde, JS pone el contenido real.

## 2.2 Las 7 páginas del panel de administrador

`admin/index.html` (dashboard), `admin/productos.html` (listado),
`admin/producto-nuevo.html`, `admin/producto-editar.html`,
`admin/usuarios.html` (listado), `admin/usuario-nuevo.html`,
`admin/usuario-editar.html`.

Todas están **protegidas**: al cargar, llaman a `exigirSesion(...)`, que
revisa si hay una sesión guardada en `localStorage` con el rol correcto. Si
no, te manda de vuelta al login. Por eso no basta con "no mostrar el link"
al panel — si alguien escribe la URL directo, igual lo bloquea.

## 2.3 `assets/css/estilos.css`

Un solo archivo con todas las reglas de estilo: el navbar, los botones
(`.btn-ed`, `.btn-ed-outline`), las tarjetas de producto y de blog, los
formularios, el panel admin (`.barra-lateral`, `.tarjeta-kpi`), y los
`@media` para responsivo.

## 2.4 `assets/js/datos.js`

No tiene funciones, es **puro dato**: tres arreglos —

- `CATEGORIAS`: las 4 categorías (Servicios de envío, Materiales de
  embalaje, Seguros y coberturas, Planes para empresas).
- `PRODUCTOS`: los 12 servicios, cada uno con código, nombre, descripción,
  precio, stock, stock crítico, categoría e imagen.
- `REGIONES`: las regiones y comunas de Chile, usadas en el selector del
  formulario de registro.

Es el "reemplazo" de una base de datos real para esta entrega — como pide
el enunciado, esta evaluación es solo frontend.

## 2.5 `assets/js/almacenamiento.js`

Es la capa que conecta nuestros datos con `localStorage`. Funciones clave:

- `leerDeStorage(clave, valorPorDefecto)` / `escribirEnStorage(clave, valor)`:
  las dos funciones base — todas las demás las usan por debajo. Convierten
  a JSON y de vuelta automáticamente.
- `obtenerProductos()` / `obtenerUsuarios()`: la primera vez traen los datos
  de `datos.js`; después de eso, leen la versión que quedó guardada en
  `localStorage` (que puede tener los cambios que hizo el admin).
- `guardarProducto()`, `eliminarProducto()`, `guardarUsuario()`,
  `eliminarUsuario()`: el CRUD real del admin — agregan, editan o borran del
  arreglo guardado en `localStorage`.
- `iniciarSesion()`, `obtenerSesion()`, `cerrarSesion()`: manejan quién está
  logeado, guardando sus datos (nombre, tipo de usuario) en `localStorage`.
- `exigirSesion(rolesPermitidos, rutaLogin)`: la función de seguridad del
  admin. Si no hay sesión, o el rol no está en la lista permitida, muestra
  una alerta y redirige al login.

## 2.6 `assets/js/tienda.js`

Todo lo relacionado a **mostrar** productos en la parte pública:

- `plantillaTarjeta(producto)`: arma el HTML de una tarjeta de producto
  (imagen, categoría, nombre, precio, stock, botón). La reutilizan tanto el
  listado como los "productos relacionados" del detalle.
- `dibujarProductos(idContenedor, limite, filtroCategoria)`: busca el
  contenedor en el HTML, filtra los productos si corresponde, y les aplica
  `plantillaTarjeta` a cada uno, uniendo todo con `.map().join("")`.
- `iniciarFiltroCategorias()`: arma los botones de categoría (Todas,
  Servicios de envío, etc.) y les agrega el evento de click para refiltrar.
- `dibujarDetalleProducto()`: lee el código del producto desde la URL
  (`?codigo=SE001`) con `URLSearchParams`, busca ese producto, y arma toda
  la vista de detalle.
- `dibujarEstadoSesion()`: pinta arriba a la derecha "Hola, [nombre]" si hay
  sesión, o los links de Login/Registro si no la hay.

## 2.7 `assets/js/carrito.js`

- `obtenerCarrito()` / `guardarCarrito()` / `vaciarCarrito()`: leen y
  escriben el carrito en `localStorage`.
- `agregarAlCarrito(codigo, cantidad)`: la función más importante acá.
  Busca el producto, revisa que tenga stock suficiente (sumando lo que ya
  hay en el carrito más lo nuevo), y si todo bien, lo agrega o le suma
  cantidad si ya estaba.
- `cambiarCantidad()`, `quitarDelCarrito()`: editar desde la vista del
  carrito.
- `subtotalCarrito()`, `totalCarrito()`, `aplicarCupon()`: los cálculos del
  resumen de compra.
- `formatearPrecio(valor)`: convierte un número (`5000`) al formato chileno
  con separador de miles (`$5.000`).
- `dibujarCarrito()`: arma toda la vista del carrito con las filas de
  productos.
- `mostrarAviso(mensaje, tipo)`: los mensajitos de confirmación/error que
  aparecen (ej. "Producto agregado al carrito").

## 2.8 `assets/js/validaciones.js` (el más largo, ojo acá)

- `marcarError()` / `marcarValido()` / `aplicarResultado()`: le ponen o
  sacan una clase CSS al campo (borde rojo o verde) y muestran el mensaje
  de error debajo.
- `validarEnVivo(campo, funcionValidadora)`: engancha la validación al
  evento del campo, para que se revise mientras el usuario escribe, no solo
  al enviar.
- `validarCorreo()`: obligatorio, máximo 100 caracteres, y **solo acepta**
  `@duoc.cl`, `@profesor.duoc.cl` o `@gmail.com` (regla que puso el
  enunciado, no la inventamos nosotros).
- `validarPassword()`: entre 4 y 10 caracteres.
- `validarRun(valor)`: la más técnica — valida el formato (7 a 9
  caracteres, sin puntos ni guion) y **calcula el dígito verificador real**
  con el algoritmo módulo 11 que usa el SII en Chile. Si alguien pregunta
  "¿por qué no validan el RUN con una librería?", la respuesta es que lo
  programamos nosotros mismos para practicar la lógica.
- `validarTexto()`, `validarSoloLetras()`, `validarPrecio()`,
  `validarEntero()`, `validarSeleccion()`: validaciones genéricas
  reutilizables (largo mínimo/máximo, solo letras, solo números, etc.).
- `validarFechaNacimiento()`: revisa que sea una fecha real y coherente
  (por ejemplo, que no sea futura).
- `validarConfirmacion()`: para el campo "confirmar contraseña", que
  coincida con el original.
- `cargarRegiones()`: cuando cambias la región en el selector, recarga las
  comunas correspondientes desde `REGIONES` en `datos.js`.
- `iniciarValidacionLogin()`, `iniciarValidacionContacto()`,
  `iniciarValidacionUsuario()`, `iniciarValidacionProducto()`: enganchan
  todas las validaciones de cada formulario específico y manejan el envío
  final (evitando que se mande si algo está mal).

## 2.9 `assets/js/admin.js`

Todo lo específico del panel de administrador:

- `prepararPanel(rolesPermitidos)`: se llama al cargar cualquier página del
  admin — llama a `exigirSesion()` y pinta el nombre del usuario logeado en
  la barra lateral.
- `dibujarTablero()`: los indicadores (KPIs) del dashboard — cuántos
  productos, cuántos con stock crítico, cuántos usuarios, etc.
- `dibujarTablaProductos()` / `dibujarTablaUsuarios()`: arman las tablas de
  listado con botones de editar/eliminar por fila.
- `confirmarBorrarProducto()` / `confirmarBorrarUsuario()`: piden
  confirmación antes de eliminar (para que no sea un clic accidental).
- `cargarProductoEnFormulario()` / `cargarUsuarioEnFormulario()`: cuando
  entras a "editar", rellenan el formulario con los datos actuales de ese
  producto/usuario (en vez de partir en blanco).
- `cargarTiposUsuario()`: llena el selector de tipo de usuario
  (Administrador, Cliente, Vendedor).

---

# PARTE 3 — EL FLUJO COMPLETO (cómo se conecta todo)

Vale la pena poder trazar estos dos recorridos de memoria:

**Flujo 1 — un cliente compra:**
1. Entra a `index.html` → `tienda.js` dibuja los productos destacados
   leyendo de `datos.js` (vía `almacenamiento.js`).
2. Va a `productos.html`, filtra por categoría → `iniciarFiltroCategorias()`
   vuelve a llamar `dibujarProductos()` con el filtro.
3. Hace clic en un producto → `detalle-producto.html?codigo=SE001` →
   `dibujarDetalleProducto()` lee el código de la URL.
4. Aprieta "Añadir al carrito" → `agregarAlCarrito()` revisa stock y guarda
   en `localStorage`.
5. Va a `carrito.html` → `dibujarCarrito()` pinta lo guardado.
6. Si no tiene sesión, tiene que pasar por `registro.html` o `login.html`
   antes → `validaciones.js` valida el formulario, `almacenamiento.js`
   guarda la sesión.

**Flujo 2 — el administrador gestiona:**
1. Entra a `login.html`, inicia sesión como Administrador.
2. Va a `admin/index.html` → `prepararPanel()` verifica el rol,
   `dibujarTablero()` pinta los KPIs.
3. Va a `admin/productos.html` → `dibujarTablaProductos()` lista todo.
4. Aprieta "Editar" en uno → `admin/producto-editar.html` →
   `cargarProductoEnFormulario()` rellena el form → al guardar,
   `validaciones.js` valida y `guardarProducto()` en `almacenamiento.js`
   actualiza `localStorage`.
5. Ese cambio se refleja al tiro en la tienda pública, porque
   `obtenerProductos()` siempre lee la versión más reciente de
   `localStorage`.

---

# PARTE 4 — PREGUNTAS TÍPICAS Y RESPUESTA CORTA

- **¿Por qué separaron el CSS en un archivo aparte?** Mantenimiento — un
  cambio se hace una vez y aplica a las 18 páginas, y separa contenido de
  presentación.
- **¿Dónde está la base de datos?** No hay en esta entrega — los datos
  viven en arreglos de JavaScript (`datos.js`) porque el alcance de esta
  evaluación es solo frontend.
- **¿Qué pasa si recargo la página, se pierde el carrito?** No, porque está
  en `localStorage`, no en una variable normal que se borra al recargar.
- **¿Cómo protegen el panel de administrador?** `exigirSesion()` revisa que
  haya una sesión guardada con el rol correcto antes de mostrar cualquier
  contenido de esa página.
- **¿Por qué el correo solo acepta esos tres dominios?** Es una regla de
  negocio que puso el profesor en el Anexo 1, no la inventamos nosotros.
- **¿Cómo valida el RUN?** Con el algoritmo real del dígito verificador
  (módulo 11), no solo revisando el formato.
- **¿Qué pasa si dos personas usan el sitio al mismo tiempo?** Cada
  `localStorage` es del navegador de esa persona — no se comparte entre
  computadores, por eso no hay conflicto, pero tampoco hay datos
  compartidos de verdad (otra razón por la que se necesitaría un backend
  real más adelante).
- **¿Por qué usaron etiquetas semánticas y no todo `<div>`?**
  Accesibilidad (lectores de pantalla) y que el código se entienda mejor
  con solo mirarlo.
- **¿Por qué el listado de productos no está escrito directo en el HTML?**
  Porque el enunciado pide explícitamente "listar productos mediante
  JavaScript, crear un arreglo de productos, mostrar los productos del
  arreglo" — es un requisito, no una preferencia nuestra.

---

# PARTE 5 — DIÁLOGO / SIMULACRO DE INTERROGACIÓN

Practícalo en voz alta, idealmente con alguien más haciendo de profesor y
tú respondiendo sin mirar el guion.

**P: Explíquenme en general de qué trata el proyecto.**
R: Es un sistema para ExpressDelivery, una empresa de despachos que hoy
maneja todo con Excel y llamadas telefónicas. Construimos una tienda web
donde el cliente pide servicios de envío y ve su estado, y un panel de
administración donde la empresa gestiona esos servicios, la flota y los
usuarios.

**P: ¿Por qué el HTML no tiene el contenido de los productos escrito
directamente?**
R: Porque el enunciado pide que el catálogo se genere con JavaScript desde
un arreglo, no que esté escrito a mano. El HTML solo tiene un contenedor
vacío, y `tienda.js` lo llena al cargar la página leyendo desde `datos.js`.

**P: ¿Me explica cómo funciona el carrito de compras?**
R: Cuando aprietas "Añadir al carrito", se llama a `agregarAlCarrito()` en
`carrito.js`. Esa función busca el producto, revisa que haya stock
suficiente, y si todo bien, lo guarda en `localStorage` — que es una
especie de memoria del navegador que no se borra aunque recargues la
página. Cada vez que entras a `carrito.html`, se lee ese `localStorage` y
se dibuja la vista con lo que hay guardado.

**P: ¿Cómo protegen que un cliente normal no entre al panel de
administrador?**
R: Con la función `exigirSesion()`. Se ejecuta apenas carga cualquier
página del admin, revisa si hay una sesión guardada y si el tipo de
usuario tiene permiso para esa vista — si no, muestra una alerta y te
redirige al login. Funciona aunque escribas la URL directo, no depende de
que el link esté oculto.

**P: ¿Por qué usan un archivo `.css` externo y no estilos dentro del
HTML?**
R: Porque así el mismo archivo aplica a las 18 páginas del sitio — si
cambiamos un color, se actualiza en todos lados con una sola edición. El
enunciado también lo pide explícito.

**P: Explíqueme la validación del RUN.**
R: Primero revisamos el formato: que no tenga puntos ni guion, y que tenga
entre 7 y 9 caracteres. Después calculamos el dígito verificador real con
el algoritmo módulo 11 (el mismo que usa el SII), y lo comparamos con el
último caracter que escribió el usuario. Si no coincide, es un RUN
inválido aunque el formato esté bien.

**P: ¿Qué pasa si el administrador edita un producto, se refleja en la
tienda pública?**
R: Sí, al tiro — porque tanto el admin como la tienda pública llaman a la
misma función, `obtenerProductos()`, que siempre lee la versión más
reciente guardada en `localStorage`, no una copia vieja.

**P: ¿Por qué no hay base de datos?**
R: Porque el alcance de esta evaluación es solo frontend — HTML, CSS y
JavaScript. Los datos están simulados en arreglos de JavaScript
(`datos.js`) para que el sitio funcione igual de cara al usuario; el
backend con base de datos real sería una entrega posterior.

**P: ¿Cómo se comunican los distintos archivos JavaScript entre sí?**
R: Todos se cargan en la misma página con etiquetas `<script>` separadas,
en un orden específico — primero `datos.js` (los datos), después
`almacenamiento.js` (que sabe leer/guardar esos datos), y recién después
`tienda.js`, `carrito.js` y `validaciones.js`, que usan las funciones de
los dos primeros. Como todos corren en el mismo navegador y no son
módulos separados, las funciones de un archivo quedan disponibles para los
demás automáticamente.

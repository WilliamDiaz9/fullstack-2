# Bitácora del repositorio — ExpressDelivery

**DSY1104 Desarrollo Fullstack II · Evaluación Parcial 1 · Entrega 1**
Equipo: Axel Contreras · Alexis Encalada · Isidora Carreño

Este documento registra la evolución del proyecto commit por commit. Sirve como
evidencia del indicador **IE1.3.1** (cambios en el repositorio remoto, comentados de
forma coherente, con tareas distribuidas entre el equipo) y como guion para responder
la pregunta del indicador **IE1.3.2** durante la presentación.

---

## 1. Convenciones acordadas por el equipo

**Ramas**

| Rama | Responsable | Propósito |
|---|---|---|
| `main` | Todos | Versión estable. Solo recibe cambios por pull request. |
| `feature/estructura-html` | Axel Contreras | Maquetado semántico, navegación y roles |
| `feature/estilos-css` | Alexis Encalada | Hoja de estilos, responsividad y vistas de usuario |
| `feature/javascript` | Isidora Carreño | Datos, validaciones, carrito y mantenedores |

**Formato de los mensajes de commit**

```
<tipo>: <qué cambió, en presente y en minúscula>
```

Tipos usados: `feat` (funcionalidad nueva), `fix` (corrección), `style` (diseño),
`docs` (documentación), `refactor` (reorganización sin cambio de comportamiento),
`chore` (configuración).

**Reglas**

1. Un commit = un cambio con sentido propio. Nada de "cambios varios".
2. El mensaje describe el **qué**, no la acción mecánica de guardar.
3. Antes de integrar a `main`, cada quien actualiza su rama con `git pull origin main`.
4. Nadie hace `push --force` sobre `main`.

---

## 2. Historial de commits

### Fase 0 — Configuración inicial (día 1)

| # | Autor | Mensaje | Archivos |
|---|---|---|---|
| 01 | Axel | `chore: inicializa el repositorio con README y .gitignore` | `README.md`, `.gitignore` |
| 02 | Axel | `chore: crea la estructura de carpetas assets/css, assets/js y assets/img` | estructura |
| 03 | Axel | `docs: agrega el caso de estudio ExpressDelivery a la carpeta docs` | `docs/` |

### Fase 1 — Estructura HTML (día 1 y 2) · Axel Contreras

| # | Mensaje | Archivos |
|---|---|---|
| 04 | `feat: crea la pagina home con estructura semantica header, main y footer` | `index.html` |
| 05 | `feat: agrega la barra de navegacion con logo, menu y contador de carrito` | `index.html` |
| 06 | `feat: incorpora el componente hero con la informacion de la empresa` | `index.html` |
| 07 | `feat: agrega la tabla de estados de envio del caso ExpressDelivery` | `index.html` |
| 08 | `feat: embebe el video institucional en la pagina de inicio` | `index.html` |
| 09 | `feat: crea la vista nosotros con la problematica y el equipo desarrollador` | `nosotros.html` |
| 10 | `feat: crea la vista blogs con tres articulos y sus enlaces al detalle` | `blogs.html` |
| 11 | `feat: agrega los dos detalles de blog con descripcion larga` | `blog-detalle-1.html`, `blog-detalle-2.html` |
| 12 | `feat: crea la vista de contacto con el formulario de mensajes internos` | `contacto.html` |
| 13 | `feat: interconecta las vistas publicas mediante hipervinculos` | varias |
| 14 | `fix: agrega texto alternativo a todas las imagenes del sitio` | varias |

### Fase 2 — Diseño CSS (día 2 y 3) · Alexis Encalada

| # | Mensaje | Archivos |
|---|---|---|
| 15 | `style: crea la hoja de estilos externa con las variables de diseno` | `assets/css/estilos.css` |
| 16 | `style: define la paleta corporativa azul y naranja en :root` | `assets/css/estilos.css` |
| 17 | `style: aplica los estilos de la barra de navegacion y el footer` | `assets/css/estilos.css` |
| 18 | `style: crea el componente de tarjeta de producto con efecto hover` | `assets/css/estilos.css` |
| 19 | `style: agrega los estilos de formulario y los estados de validacion` | `assets/css/estilos.css` |
| 20 | `style: incorpora Bootstrap 5.3 por CDN en todas las paginas` | varias |
| 21 | `style: agrega las media queries para tablet y telefono` | `assets/css/estilos.css` |
| 22 | `style: aumenta el tamano de los botones en pantallas pequenas` | `assets/css/estilos.css` |
| 23 | `feat: crea la vista de registro de usuario con todos sus campos` | `registro.html` |
| 24 | `feat: crea la vista de inicio de sesion` | `login.html` |

### Fase 3 — JavaScript, datos y carrito (día 3 y 4) · Isidora Carreño

| # | Mensaje | Archivos |
|---|---|---|
| 25 | `feat: crea el arreglo de productos con los servicios del caso SE001 a SE004` | `assets/js/datos.js` |
| 26 | `feat: agrega el arreglo de regiones con sus comunas` | `assets/js/datos.js` |
| 27 | `feat: agrega los arreglos de usuarios, flota y cupones` | `assets/js/datos.js` |
| 28 | `feat: crea la capa de acceso a localStorage` | `assets/js/almacenamiento.js` |
| 29 | `feat: lista los productos en el home recorriendo el arreglo` | `assets/js/tienda.js` |
| 30 | `feat: agrega el filtro de productos por categoria` | `assets/js/tienda.js`, `productos.html` |
| 31 | `feat: crea la vista de detalle de producto leyendo el codigo desde la URL` | `detalle-producto.html`, `assets/js/tienda.js` |
| 32 | `feat: implementa el carrito de compras con persistencia en localStorage` | `assets/js/carrito.js`, `carrito.html` |
| 33 | `feat: valida el stock disponible al agregar productos al carrito` | `assets/js/carrito.js` |
| 34 | `feat: agrega el calculo de totales y la aplicacion de cupones` | `assets/js/carrito.js` |
| 35 | `fix: evita que se dupliquen las lineas del mismo producto en el carrito` | `assets/js/carrito.js` |

### Fase 4 — Validaciones (día 4) · Isidora Carreño

| # | Mensaje | Archivos |
|---|---|---|
| 36 | `feat: crea el motor de validacion con mensajes personalizados en espanol` | `assets/js/validaciones.js` |
| 37 | `feat: valida el correo restringido a los dominios autorizados` | `assets/js/validaciones.js` |
| 38 | `feat: agrega validacion de RUN con el algoritmo Modulo 11` | `assets/js/validaciones.js` |
| 39 | `feat: implementa la validacion en tiempo real en los eventos input y blur` | `assets/js/validaciones.js` |
| 40 | `feat: agrega contadores de caracteres como sugerencia al usuario` | `assets/js/validaciones.js` |
| 41 | `feat: carga las comunas dependiendo de la region seleccionada` | `assets/js/validaciones.js` |
| 42 | `feat: valida el formulario de contacto y el de inicio de sesion` | `assets/js/validaciones.js` |
| 43 | `fix: corrige el digito verificador de los RUN de los usuarios de prueba` | `assets/js/datos.js` |

### Fase 5 — Panel administrativo (día 5) · Alexis Encalada e Isidora Carreño

| # | Autor | Mensaje | Archivos |
|---|---|---|---|
| 44 | Alexis | `feat: crea el panel del administrador con menu lateral vertical` | `admin/index.html` |
| 45 | Alexis | `style: agrega los estilos de la barra lateral y las tarjetas de indicadores` | `assets/css/estilos.css` |
| 46 | Isidora | `feat: muestra los indicadores del negocio en el tablero` | `assets/js/admin.js` |
| 47 | Isidora | `feat: agrega la tabla con el estado de la flota de vehiculos` | `admin/index.html`, `assets/js/admin.js` |
| 48 | Isidora | `feat: crea el mantenedor de productos con listado, alta y edicion` | `admin/productos.html`, `admin/producto-nuevo.html`, `admin/producto-editar.html` |
| 49 | Isidora | `feat: valida el formulario de producto con las reglas del enunciado` | `assets/js/validaciones.js` |
| 50 | Isidora | `feat: alerta cuando el stock alcanza el nivel critico` | `assets/js/admin.js` |
| 51 | Alexis | `feat: crea el mantenedor de usuarios con listado, alta y edicion` | `admin/usuarios.html`, `admin/usuario-nuevo.html`, `admin/usuario-editar.html` |
| 52 | Alexis | `feat: agrega el select de tipo de usuario solo en la vista administrativa` | `assets/js/admin.js` |

### Fase 6 — Roles, pruebas y documentación (día 5 y 6)

| # | Autor | Mensaje | Archivos |
|---|---|---|---|
| 53 | Axel | `feat: implementa el control de acceso por perfil en las vistas del admin` | `assets/js/almacenamiento.js`, `assets/js/admin.js` |
| 54 | Axel | `feat: oculta el modulo de usuarios cuando el perfil es vendedor` | `assets/js/admin.js` |
| 55 | Axel | `fix: redirige al login cuando se accede al panel sin sesion iniciada` | `assets/js/almacenamiento.js` |
| 56 | Isidora | `fix: impide eliminar el usuario con el que se inicio sesion` | `assets/js/admin.js` |
| 57 | Alexis | `fix: corrige el contraste del texto en las alertas de validacion` | `assets/css/estilos.css` |
| 58 | Axel | `docs: agrega el documento ERS version 1` | `docs/ERS-ExpressDelivery-v1.docx` |
| 59 | Alexis | `docs: agrega la planilla de requerimientos` | `docs/Planilla-de-Requerimientos-ExpressDelivery.xlsx` |
| 60 | Isidora | `docs: completa el README con las instrucciones de ejecucion` | `README.md` |
| 61 | Equipo | `docs: agrega la bitacora del repositorio y el guion de presentacion` | `docs/` |

**Total: 61 commits.** Distribución aproximada: Axel 20, Alexis 20, Isidora 21.

---

## 3. Comandos para reconstruir el repositorio

Si el repositorio se crea desde cero con el proyecto ya armado, cada integrante debe
configurar su identidad **antes** de commitear, para que GitHub le atribuya sus commits:

```bash
# Cada integrante, una sola vez en su equipo
git config user.name "Axel Contreras"
git config user.email "axel.contreras@duocuc.cl"
```

Creación del repositorio y primera subida:

```bash
cd expressdelivery
git init
git branch -M main
git add .
git commit -m "chore: version inicial del proyecto frontend"
git remote add origin https://github.com/<usuario>/expressdelivery.git
git push -u origin main
```

Flujo de trabajo diario de cada integrante:

```bash
git checkout -b feature/javascript          # crear la rama propia
# ... hacer los cambios ...
git add assets/js/validaciones.js           # agregar solo lo que corresponde al commit
git commit -m "feat: agrega validacion de RUN con el algoritmo Modulo 11"
git pull origin main                        # traer lo que hicieron los demas
git push origin feature/javascript          # subir la rama
# luego, pull request en GitHub hacia main
```

Comandos útiles para mostrar durante la presentación:

```bash
git log --oneline --graph --all             # ver el árbol de commits
git log --pretty=format:"%h %an %s"         # ver autor de cada commit
git shortlog -sn                            # cantidad de commits por integrante
git log --stat -3                           # qué archivos cambió cada commit
```

---

## 4. Justificación de la trazabilidad (indicador IE1.3.2, 20%)

Tres razones concretas por las que este historial importa en el proyecto:

**Permite volver atrás sin perder el resto del avance.** Cuando el commit 43 detectó que
los RUN de prueba tenían el dígito verificador mal calculado, se corrigió únicamente ese
archivo. Sin historial habría que revisar el proyecto completo para saber qué se tocó.

**Deja constancia de quién hizo qué.** La evaluación del encargo y de la presentación es
individual aunque el trabajo sea grupal. `git shortlog -sn` muestra objetivamente la
distribución del esfuerzo, y `git log --stat` permite a cada integrante ubicar y explicar
el código que efectivamente escribió.

**Obliga a pensar en unidades pequeñas y completas.** Un commit que se puede describir en
una línea es un cambio acotado y probado. Un commit llamado "cambios varios" casi siempre
esconde tres problemas mezclados que después nadie sabe separar.

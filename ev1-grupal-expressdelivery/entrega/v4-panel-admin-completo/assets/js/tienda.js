function plantillaTarjeta(producto) {
  const categoria = CATEGORIAS.find(function(c) {
    return c.codigo === producto.categoria;
  });
  const nombreCategoria = categoria ? categoria.nombre : producto.categoria;
  let avisoStock = '<span class="small text-muted">Stock disponible: ' + producto.stock + "</span>";
  if (producto.stock === 0) {
    avisoStock = '<span class="stock-agotado">Sin stock</span>';
  } else if (producto.stockCritico > 0 && producto.stock <= producto.stockCritico) {
    avisoStock = '<span class="stock-critico">Ultimas ' + producto.stock + " unidades</span>";
  }
  const botonAgregar = producto.stock === 0 ? '<button class="btn btn-ed w-100" disabled>Sin stock</button>' : '<button class="btn btn-ed w-100" onclick="agregarAlCarrito(\'' + producto.codigo + "', 1)\">Anadir al carrito</button>";
  return "" + '<article class="card-producto">' + '<a href="detalle-producto.html?codigo=' + producto.codigo + '">' + '<img src="' + producto.imagen + '" alt="Imagen del servicio ' + producto.nombre + '" onerror="this.onerror=null;this.src=\'assets/img/generico.png\';">' + "</a>" + '<div class="p-3 d-flex flex-column" style="height: calc(100% - 180px)">' + '<span class="categoria">' + nombreCategoria + "</span>" + '<h3 class="h6 mt-1 mb-2">' + '<a href="detalle-producto.html?codigo=' + producto.codigo + '" class="text-decoration-none text-dark">' + producto.nombre + "</a>" + "</h3>" + '<p class="small text-muted flex-grow-1">' + producto.descripcion.substring(0, 70) + "...</p>" + '<p class="precio mb-1">' + formatearPrecio(producto.precio) + "</p>" + '<p class="mb-2">' + avisoStock + "</p>" + botonAgregar + "</div>" + "</article>";
}

function dibujarProductos(idContenedor, limite, filtroCategoria) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;
  let productos = obtenerProductos();
  if (filtroCategoria && filtroCategoria !== "TODAS") {
    productos = productos.filter(function(p) {
      return p.categoria === filtroCategoria;
    });
  }
  if (limite) {
    productos = productos.slice(0, limite);
  }
  if (productos.length === 0) {
    contenedor.innerHTML = '<p class="text-center py-4">No hay productos en esta categoria.</p>';
    return;
  }
  contenedor.innerHTML = productos.map(function(producto) {
    return '<div class="col-12 col-sm-6 col-lg-3 mb-4">' + plantillaTarjeta(producto) + "</div>";
  }).join("");
}

function iniciarFiltroCategorias() {
  const barra = document.getElementById("filtros-categoria");
  if (!barra) return;
  let html = '<button class="btn btn-ed-outline btn-sm me-2 mb-2 activo" data-categoria="TODAS">Todas</button>';
  CATEGORIAS.forEach(function(cat) {
    html += '<button class="btn btn-ed-outline btn-sm me-2 mb-2" data-categoria="' + cat.codigo + '">' + cat.nombre + "</button>";
  });
  barra.innerHTML = html;
  barra.querySelectorAll("button").forEach(function(boton) {
    boton.addEventListener("click", function() {
      dibujarProductos("grilla-productos", null, boton.dataset.categoria);
    });
  });
}

function dibujarDetalleProducto() {
  const contenedor = document.getElementById("detalle-producto");
  if (!contenedor) return;
  const parametros = new URLSearchParams(window.location.search);
  const codigo = parametros.get("codigo");
  const producto = buscarProducto(codigo);
  if (!producto) {
    contenedor.innerHTML = '<div class="alert alert-warning">No encontramos ese producto. ' + '<a href="productos.html">Volver al listado</a>.</div>';
    return;
  }
  document.title = producto.nombre + " - ExpressDelivery";
  const categoria = CATEGORIAS.find(function(c) {
    return c.codigo === producto.categoria;
  });
  const nombreCategoria = categoria ? categoria.nombre : producto.categoria;
  let avisoStock = '<p class="small text-muted">Stock disponible: ' + producto.stock + " unidades</p>";
  if (producto.stock === 0) {
    avisoStock = '<p class="stock-agotado">Producto sin stock por el momento.</p>';
  } else if (producto.stockCritico > 0 && producto.stock <= producto.stockCritico) {
    avisoStock = '<p class="stock-critico">Quedan solo ' + producto.stock + " unidades.</p>";
  }
  const bloqueCompra = producto.stock === 0 ? '<a href="contacto.html" class="btn btn-ed-outline w-100">Consultar disponibilidad</a>' : '<div class="row g-2 align-items-end">' + '<div class="col-4">' + '<label class="form-label" for="cantidad">Cantidad</label>' + '<input type="number" class="form-control" id="cantidad" value="1" min="1" max="' + producto.stock + '">' + "</div>" + '<div class="col-8">' + '<button class="btn btn-ed w-100" id="btn-anadir">Anadir al carrito</button>' + "</div>" + "</div>";
  contenedor.innerHTML = '<nav aria-label="Ruta de navegacion" class="mb-3">' + '<ol class="breadcrumb small">' + '<li class="breadcrumb-item"><a href="index.html">Home</a></li>' + '<li class="breadcrumb-item"><a href="productos.html">Productos</a></li>' + '<li class="breadcrumb-item active" aria-current="page">' + producto.nombre + "</li>" + "</ol>" + "</nav>" + '<div class="row g-4">' + '<div class="col-lg-7">' + '<img src="' + producto.imagen + '" alt="Imagen de ' + producto.nombre + '" ' + 'class="img-fluid rounded border bg-white p-3" onerror="this.onerror=null;this.src=\'assets/img/generico.png\';">' + "</div>" + '<div class="col-lg-5">' + '<span class="categoria">' + nombreCategoria + "</span>" + '<h1 class="h3 mt-1">' + producto.nombre + "</h1>" + '<p class="precio h4 text-dark">' + formatearPrecio(producto.precio) + "</p>" + '<p class="small text-muted">Codigo: ' + producto.codigo + "</p>" + "<hr>" + "<p>" + producto.descripcion + "</p>" + avisoStock + bloqueCompra + "</div>" + "</div>";
  const btnAnadir = document.getElementById("btn-anadir");
  if (btnAnadir) {
    btnAnadir.addEventListener("click", function() {
      agregarAlCarrito(producto.codigo, document.getElementById("cantidad").value);
    });
  }
  const relacionados = obtenerProductos().filter(function(p) {
    return p.categoria === producto.categoria && p.codigo !== producto.codigo;
  }).slice(0, 4);
  const zonaRelacionados = document.getElementById("productos-relacionados");
  if (zonaRelacionados && relacionados.length > 0) {
    zonaRelacionados.innerHTML = relacionados.map(function(p) {
      return '<div class="col-6 col-lg-3 mb-4">' + plantillaTarjeta(p) + "</div>";
    }).join("");
  }
}

function dibujarEstadoSesion() {
  const zona = document.getElementById("zona-sesion");
  if (!zona) return;
  const sesion = obtenerSesion();
  if (!sesion) {
    zona.innerHTML = '<a href="login.html" class="me-3">Iniciar sesion</a>' + '<a href="registro.html">Registrar usuario</a>';
    return;
  }
  const enlacePanel = sesion.tipoUsuario === "Cliente" ? "" : '<a href="admin/index.html" class="me-3">Panel de administracion</a>';
  zona.innerHTML = '<span class="me-3">Hola, <strong>' + sesion.nombre + "</strong> (" + sesion.tipoUsuario + ")</span>" + enlacePanel + '<a href="#" id="btn-salir">Cerrar sesion</a>';
  document.getElementById("btn-salir").addEventListener("click", function(evento) {
    evento.preventDefault();
    cerrarSesion();
    window.location.reload();
  });
}

document.addEventListener("DOMContentLoaded", function() {
  dibujarEstadoSesion();
  dibujarProductos("productos-destacados", 8, null);
  dibujarProductos("grilla-productos", null, "TODAS");
  iniciarFiltroCategorias();
  dibujarDetalleProducto();
});
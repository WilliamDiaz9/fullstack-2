function prepararPanel(rolesPermitidos) {
  const sesion = exigirSesion(rolesPermitidos, "../login.html");
  if (!sesion) return null;
  const saludo = document.getElementById("saludo-admin");
  if (saludo) {
    saludo.textContent = "Hola " + sesion.nombre + " " + sesion.apellidos;
  }
  const perfil = document.getElementById("perfil-admin");
  if (perfil) {
    perfil.textContent = sesion.tipoUsuario;
  }
  if (sesion.tipoUsuario === "Vendedor") {
    document.querySelectorAll(".solo-administrador").forEach(function(elemento) {
      elemento.remove();
    });
  }
  const btnSalir = document.getElementById("btn-salir-admin");
  if (btnSalir) {
    btnSalir.addEventListener("click", function(evento) {
      evento.preventDefault();
      cerrarSesion();
      window.location.href = "../index.html";
    });
  }
  return sesion;
}

function dibujarTablero() {
  const zona = document.getElementById("tarjetas-kpi");
  if (!zona) return;
  const productos = obtenerProductos();
  const usuarios = obtenerUsuarios();
  const enCritico = productos.filter(function(p) {
    return p.stockCritico > 0 && p.stock <= p.stockCritico;
  });
  const vehiculosDisponibles = FLOTA.filter(function(v) {
    return v.estado === "Disponible";
  });
  const kpis = [ {
    valor: productos.length,
    etiqueta: "Productos publicados"
  }, {
    valor: usuarios.length,
    etiqueta: "Usuarios registrados"
  }, {
    valor: enCritico.length,
    etiqueta: "Productos en stock critico"
  }, {
    valor: vehiculosDisponibles.length + " / " + FLOTA.length,
    etiqueta: "Vehiculos disponibles"
  } ];
  zona.innerHTML = kpis.map(function(kpi) {
    return '<div class="col-6 col-lg-3 mb-3">' + '<div class="tarjeta-kpi">' + '<div class="valor">' + kpi.valor + "</div>" + '<div class="etiqueta">' + kpi.etiqueta + "</div>" + "</div>" + "</div>";
  }).join("");
  const alerta = document.getElementById("alerta-stock");
  if (alerta && enCritico.length > 0) {
    alerta.className = "alert alert-warning";
    alerta.innerHTML = "<strong>Atencion:</strong> " + enCritico.length + " producto(s) alcanzaron el nivel de stock critico: " + enCritico.map(function(p) {
      return p.nombre;
    }).join(", ") + ".";
  }
  const tablaFlota = document.getElementById("cuerpo-flota");
  if (tablaFlota) {
    tablaFlota.innerHTML = FLOTA.map(function(v) {
      const clase = v.estado === "Disponible" ? "entregado" : "retrasado";
      return "<tr>" + "<td>" + v.patente + "</td>" + "<td>" + v.tipo + "</td>" + "<td>" + v.marca + "</td>" + "<td>" + v.capacidad + " kg</td>" + '<td><span class="badge-estado ' + clase + '">' + v.estado + "</span></td>" + "</tr>";
    }).join("");
  }
}

function dibujarTablaProductos(sesion) {
  const cuerpo = document.getElementById("cuerpo-productos");
  if (!cuerpo) return;
  const esAdmin = sesion.tipoUsuario === "Administrador";
  const productos = obtenerProductos();
  cuerpo.innerHTML = productos.map(function(p) {
    const categoria = CATEGORIAS.find(function(c) {
      return c.codigo === p.categoria;
    });
    let estadoStock = '<span class="badge-estado entregado">Normal</span>';
    if (p.stock === 0) {
      estadoStock = '<span class="badge-estado cancelado">Agotado</span>';
    } else if (p.stockCritico > 0 && p.stock <= p.stockCritico) {
      estadoStock = '<span class="badge-estado retrasado">Critico</span>';
    }
    const acciones = esAdmin ? '<a href="producto-editar.html?codigo=' + p.codigo + '" class="btn btn-sm btn-ed-outline me-1">Editar</a>' + '<button class="btn btn-sm btn-outline-danger" onclick="confirmarBorrarProducto(\'' + p.codigo + "')\">Eliminar</button>" : '<a href="producto-editar.html?codigo=' + p.codigo + '" class="btn btn-sm btn-ed-outline">Ver detalle</a>';
    return "<tr>" + "<td><strong>" + p.codigo + "</strong></td>" + "<td>" + p.nombre + "</td>" + "<td>" + (categoria ? categoria.nombre : p.categoria) + "</td>" + "<td>" + formatearPrecio(p.precio) + "</td>" + "<td>" + p.stock + "</td>" + "<td>" + estadoStock + "</td>" + '<td class="text-end">' + acciones + "</td>" + "</tr>";
  }).join("");
  const total = document.getElementById("total-productos");
  if (total) {
    total.textContent = productos.length + " productos";
  }
}

function confirmarBorrarProducto(codigo) {
  const producto = buscarProducto(codigo);
  if (!producto) return;
  if (confirm("Eliminar el producto " + producto.nombre + "? Esta accion no se puede deshacer.")) {
    eliminarProducto(codigo);
    window.location.reload();
  }
}

function cargarProductoEnFormulario(sesion) {
  const form = document.getElementById("form-producto");
  if (!form) return;
  const parametros = new URLSearchParams(window.location.search);
  const codigo = parametros.get("codigo");
  if (!codigo) return;
  const producto = buscarProducto(codigo);
  if (!producto) {
    mostrarAdvertencia("resultado-form", "No encontramos el producto solicitado.");
    return;
  }
  form.dataset.modo = "editar";
  form.dataset.codigo = producto.codigo;
  document.getElementById("codigo").value = producto.codigo;
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("descripcion").value = producto.descripcion;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("stock").value = producto.stock;
  document.getElementById("stockCritico").value = producto.stockCritico;
  document.getElementById("categoria").value = producto.categoria;
  const titulo = document.getElementById("titulo-form");
  if (titulo) {
    titulo.textContent = "Editar producto " + producto.codigo;
  }
  if (sesion.tipoUsuario === "Vendedor") {
    form.querySelectorAll("input, textarea, select, button").forEach(function(campo) {
      campo.disabled = true;
    });
    mostrarAdvertencia("resultado-form", "Tu perfil de Vendedor permite ver el detalle, pero no modificar el producto.");
  }
}

function dibujarTablaUsuarios() {
  const cuerpo = document.getElementById("cuerpo-usuarios");
  if (!cuerpo) return;
  const usuarios = obtenerUsuarios();
  cuerpo.innerHTML = usuarios.map(function(u) {
    return "<tr>" + "<td><strong>" + u.run + "</strong></td>" + "<td>" + u.nombre + " " + u.apellidos + "</td>" + "<td>" + u.correo + "</td>" + "<td>" + u.tipoUsuario + "</td>" + "<td>" + u.comuna + "</td>" + '<td class="text-end">' + '<a href="usuario-editar.html?run=' + u.run + '" class="btn btn-sm btn-ed-outline me-1">Editar</a>' + '<button class="btn btn-sm btn-outline-danger" onclick="confirmarBorrarUsuario(\'' + u.run + "')\">Eliminar</button>" + "</td>" + "</tr>";
  }).join("");
  const total = document.getElementById("total-usuarios");
  if (total) {
    total.textContent = usuarios.length + " usuarios";
  }
}

function confirmarBorrarUsuario(run) {
  const usuario = buscarUsuario(run);
  if (!usuario) return;
  const sesion = obtenerSesion();
  if (sesion && sesion.run === run) {
    alert("No puedes eliminar el usuario con el que iniciaste sesion.");
    return;
  }
  if (confirm("Eliminar al usuario " + usuario.nombre + " " + usuario.apellidos + "?")) {
    eliminarUsuario(run);
    window.location.reload();
  }
}

function cargarUsuarioEnFormulario() {
  const form = document.getElementById("form-usuario");
  if (!form) return;
  const parametros = new URLSearchParams(window.location.search);
  const run = parametros.get("run");
  if (!run) return;
  const usuario = buscarUsuario(run);
  if (!usuario) {
    mostrarAdvertencia("resultado-form", "No encontramos el usuario solicitado.");
    return;
  }
  form.dataset.modo = "editar";
  form.dataset.run = usuario.run;
  document.getElementById("run").value = usuario.run;
  document.getElementById("nombre").value = usuario.nombre;
  document.getElementById("apellidos").value = usuario.apellidos;
  document.getElementById("correo").value = usuario.correo;
  document.getElementById("fechaNacimiento").value = usuario.fechaNacimiento;
  document.getElementById("direccion").value = usuario.direccion;
  const tipo = document.getElementById("tipoUsuario");
  if (tipo) {
    tipo.value = usuario.tipoUsuario;
  }
  const region = document.getElementById("region");
  const comuna = document.getElementById("comuna");
  if (region && comuna) {
    region.value = usuario.region;
    region.dispatchEvent(new Event("change"));
    comuna.value = usuario.comuna;
  }
  const titulo = document.getElementById("titulo-form");
  if (titulo) {
    titulo.textContent = "Editar usuario " + usuario.run;
  }
}

function cargarTiposUsuario() {
  const select = document.getElementById("tipoUsuario");
  if (!select) return;
  TIPOS_USUARIO.forEach(function(tipo) {
    const opcion = document.createElement("option");
    opcion.value = tipo;
    opcion.textContent = tipo;
    select.appendChild(opcion);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const cuerpo = document.body;
  if (!cuerpo.classList.contains("admin")) return;
  const roles = (cuerpo.dataset.roles || "Administrador").split(",");
  const sesion = prepararPanel(roles);
  if (!sesion) return;
  dibujarTablero();
  dibujarTablaProductos(sesion);
  dibujarTablaUsuarios();
  cargarTiposUsuario();
  cargarProductoEnFormulario(sesion);
  cargarUsuarioEnFormulario();
});
function obtenerCarrito() {
  return leerDeStorage(CLAVE_CARRITO, []);
}

function guardarCarrito(carrito) {
  escribirEnStorage(CLAVE_CARRITO, carrito);
  actualizarContadorCarrito();
}

function vaciarCarrito() {
  escribirEnStorage(CLAVE_CARRITO, []);
  actualizarContadorCarrito();
}

function agregarAlCarrito(codigo, cantidad) {
  cantidad = Number(cantidad) || 1;
  const producto = buscarProducto(codigo);
  if (!producto) {
    mostrarAviso("No encontramos el producto solicitado.", "danger");
    return false;
  }
  if (producto.stock === 0) {
    mostrarAviso("El producto " + producto.nombre + " esta sin stock. Puedes escribirnos por el formulario de contacto para cotizarlo.", "warning");
    return false;
  }
  const carrito = obtenerCarrito();
  const linea = carrito.find(function(item) {
    return item.codigo === codigo;
  });
  const cantidadActual = linea ? linea.cantidad : 0;
  const cantidadFinal = cantidadActual + cantidad;
  if (cantidadFinal > producto.stock) {
    mostrarAviso("Solo quedan " + producto.stock + " unidades de " + producto.nombre + ". Ya tienes " + cantidadActual + " en el carrito.", "warning");
    return false;
  }
  if (linea) {
    linea.cantidad = cantidadFinal;
  } else {
    carrito.push({
      codigo: codigo,
      cantidad: cantidad
    });
  }
  guardarCarrito(carrito);
  mostrarAviso(producto.nombre + " se agrego al carrito.", "success");
  return true;
}

function cambiarCantidad(codigo, nuevaCantidad) {
  nuevaCantidad = Number(nuevaCantidad);
  const carrito = obtenerCarrito();
  const linea = carrito.find(function(item) {
    return item.codigo === codigo;
  });
  if (!linea) return;
  if (nuevaCantidad < 1) {
    quitarDelCarrito(codigo);
    return;
  }
  const producto = buscarProducto(codigo);
  if (producto && nuevaCantidad > producto.stock) {
    mostrarAviso("Stock maximo disponible: " + producto.stock + " unidades.", "warning");
    linea.cantidad = producto.stock;
  } else {
    linea.cantidad = nuevaCantidad;
  }
  guardarCarrito(carrito);
  dibujarCarrito();
}

function quitarDelCarrito(codigo) {
  const carrito = obtenerCarrito().filter(function(item) {
    return item.codigo !== codigo;
  });
  guardarCarrito(carrito);
  dibujarCarrito();
}

function detalleCarrito() {
  return obtenerCarrito().map(function(item) {
    const producto = buscarProducto(item.codigo);
    if (!producto) return null;
    return {
      codigo: producto.codigo,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
      stock: producto.stock,
      cantidad: item.cantidad,
      subtotal: producto.precio * item.cantidad
    };
  }).filter(function(item) {
    return item !== null;
  });
}

function totalUnidades() {
  return obtenerCarrito().reduce(function(suma, item) {
    return suma + item.cantidad;
  }, 0);
}

function subtotalCarrito() {
  return detalleCarrito().reduce(function(suma, item) {
    return suma + item.subtotal;
  }, 0);
}

let cuponAplicado = null;

function aplicarCupon(codigoCupon) {
  const cupon = CUPONES.find(function(c) {
    return c.codigo === codigoCupon.trim().toUpperCase();
  });
  if (!cupon) {
    mostrarAviso("El cupon ingresado no es valido.", "danger");
    return false;
  }
  if (subtotalCarrito() === 0) {
    mostrarAviso("Agrega productos antes de aplicar un cupon.", "warning");
    return false;
  }
  cuponAplicado = cupon;
  mostrarAviso("Cupon aplicado: " + cupon.descripcion, "success");
  dibujarCarrito();
  return true;
}

function totalCarrito() {
  const subtotal = subtotalCarrito();
  const descuento = cuponAplicado ? subtotal * cuponAplicado.descuento : 0;
  return subtotal - descuento;
}

function formatearPrecio(valor) {
  if (valor === 0) {
    return "GRATIS";
  }
  return "$" + valor.toLocaleString("es-CL");
}

function actualizarContadorCarrito() {
  const contadores = document.querySelectorAll(".contador-carrito");
  const unidades = totalUnidades();
  contadores.forEach(function(elemento) {
    elemento.textContent = unidades;
  });
}

function dibujarCarrito() {
  const contenedor = document.getElementById("lista-carrito");
  if (!contenedor) return;
  const items = detalleCarrito();
  contenedor.innerHTML = "";
  if (items.length === 0) {
    contenedor.innerHTML = '<div class="text-center py-5">' + '<p class="mb-3">Tu carrito esta vacio.</p>' + '<a href="productos.html" class="btn btn-ed">Ver productos</a>' + "</div>";
  } else {
    items.forEach(function(item) {
      const fila = document.createElement("article");
      fila.className = "fila-carrito";
      fila.innerHTML = '<img src="' + item.imagen + '" alt="' + item.nombre + '" onerror="this.onerror=null;this.src=\'assets/img/generico.png\';">' + '<div class="flex-grow-1">' + '<h3 class="h6 mb-1">' + item.nombre + "</h3>" + '<p class="small text-muted mb-1">' + item.descripcion.substring(0, 80) + "...</p>" + '<span class="small">Precio unitario: ' + formatearPrecio(item.precio) + "</span>" + "</div>" + '<div class="control-cantidad">' + '<button type="button" aria-label="Restar una unidad" onclick="cambiarCantidad(\'' + item.codigo + "', " + (item.cantidad - 1) + ')">-</button>' + '<input type="number" min="1" max="' + item.stock + '" value="' + item.cantidad + '" ' + 'aria-label="Cantidad" onchange="cambiarCantidad(\'' + item.codigo + "', this.value)\">" + '<button type="button" aria-label="Sumar una unidad" onclick="cambiarCantidad(\'' + item.codigo + "', " + (item.cantidad + 1) + ')">+</button>' + "</div>" + '<div class="text-end" style="min-width:110px">' + "<strong>" + formatearPrecio(item.subtotal) + "</strong><br>" + '<button type="button" class="btn btn-sm btn-link text-danger p-0" onclick="quitarDelCarrito(\'' + item.codigo + "')\">Quitar</button>" + "</div>";
      contenedor.appendChild(fila);
    });
  }
  const elSubtotal = document.getElementById("resumen-subtotal");
  const elDescuento = document.getElementById("resumen-descuento");
  const elTotal = document.getElementById("resumen-total");
  const filaDescuento = document.getElementById("fila-descuento");
  if (elSubtotal) elSubtotal.textContent = formatearPrecio(subtotalCarrito());
  if (elTotal) elTotal.textContent = formatearPrecio(totalCarrito());
  if (filaDescuento) {
    if (cuponAplicado) {
      filaDescuento.classList.remove("d-none");
      elDescuento.textContent = "-" + formatearPrecio(subtotalCarrito() * cuponAplicado.descuento);
    } else {
      filaDescuento.classList.add("d-none");
    }
  }
  const botonPagar = document.getElementById("btn-pagar");
  if (botonPagar) {
    botonPagar.disabled = items.length === 0;
  }
  actualizarContadorCarrito();
}

function mostrarAviso(mensaje, tipo) {
  let zona = document.getElementById("zona-avisos");
  if (!zona) {
    zona = document.createElement("div");
    zona.id = "zona-avisos";
    zona.style.position = "fixed";
    zona.style.top = "84px";
    zona.style.right = "16px";
    zona.style.zIndex = "1080";
    zona.style.maxWidth = "330px";
    document.body.appendChild(zona);
  }
  const aviso = document.createElement("div");
  aviso.className = "alert alert-" + tipo + " shadow-sm";
  aviso.setAttribute("role", "alert");
  aviso.textContent = mensaje;
  zona.appendChild(aviso);
  setTimeout(function() {
    aviso.remove();
  }, 4e3);
}

document.addEventListener("DOMContentLoaded", function() {
  actualizarContadorCarrito();
  dibujarCarrito();
  const btnCupon = document.getElementById("btn-cupon");
  if (btnCupon) {
    btnCupon.addEventListener("click", function() {
      aplicarCupon(document.getElementById("cupon").value);
    });
  }
  const btnPagar = document.getElementById("btn-pagar");
  if (btnPagar) {
    btnPagar.addEventListener("click", function() {
      const numeroEnvio = "ED-" + Date.now().toString().slice(-6);
      alert("Compra confirmada.\nNumero de seguimiento: " + numeroEnvio + "\nEstado inicial: Solicitado.\nTotal pagado: " + formatearPrecio(totalCarrito()));
      vaciarCarrito();
      cuponAplicado = null;
      dibujarCarrito();
    });
  }
  const btnVaciar = document.getElementById("btn-vaciar");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", function() {
      if (confirm("Seguro que quieres vaciar el carrito?")) {
        vaciarCarrito();
        cuponAplicado = null;
        dibujarCarrito();
      }
    });
  }
});
function marcarError(campo, mensaje) {
  campo.classList.add("campo-invalido");
  campo.classList.remove("campo-valido");
  const contenedor = document.getElementById("error-" + campo.id);
  if (contenedor) {
    contenedor.textContent = mensaje;
  }
}

function marcarValido(campo) {
  campo.classList.remove("campo-invalido");
  campo.classList.add("campo-valido");
  const contenedor = document.getElementById("error-" + campo.id);
  if (contenedor) {
    contenedor.textContent = "";
  }
}

function aplicarResultado(campo, mensaje) {
  if (mensaje === "") {
    marcarValido(campo);
    return true;
  }
  marcarError(campo, mensaje);
  return false;
}

function validarEnVivo(campo, funcionValidadora) {
  if (!campo) return;
  campo.addEventListener("input", function() {
    aplicarResultado(campo, funcionValidadora(campo.value));
  });
  campo.addEventListener("blur", function() {
    aplicarResultado(campo, funcionValidadora(campo.value));
  });
}

function activarContador(campo, maximo) {
  if (!campo) return;
  const contador = document.getElementById("contador-" + campo.id);
  if (!contador) return;
  function actualizar() {
    const usados = campo.value.length;
    contador.textContent = usados + " / " + maximo + " caracteres";
    contador.style.color = usados > maximo ? "#dc2626" : "";
  }
  campo.addEventListener("input", actualizar);
  actualizar();
}

const DOMINIOS_PERMITIDOS = [ "@duoc.cl", "@profesor.duoc.cl", "@gmail.com" ];

function validarCorreo(valor, obligatorio) {
  const correo = valor.trim().toLowerCase();
  if (correo === "") {
    return obligatorio ? "El correo es obligatorio." : "";
  }
  if (correo.length > 100) {
    return "El correo no puede superar los 100 caracteres.";
  }
  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formato.test(correo)) {
    return "Escribe un correo valido, por ejemplo nombre@duoc.cl";
  }
  const dominioOk = DOMINIOS_PERMITIDOS.some(function(dominio) {
    return correo.endsWith(dominio);
  });
  if (!dominioOk) {
    return "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
  }
  return "";
}

function validarPassword(valor) {
  if (valor === "") {
    return "La contrasena es obligatoria.";
  }
  if (valor.length < 4 || valor.length > 10) {
    return "La contrasena debe tener entre 4 y 10 caracteres.";
  }
  return "";
}

function validarRun(valor) {
  const run = valor.trim().toUpperCase();
  if (run === "") {
    return "El RUN es obligatorio.";
  }
  if (run.includes(".") || run.includes("-")) {
    return "Escribe el RUN sin puntos ni guion. Ejemplo: 19011022K";
  }
  if (run.length < 7 || run.length > 9) {
    return "El RUN debe tener entre 7 y 9 caracteres.";
  }
  if (!/^\d{6,8}[0-9K]$/.test(run)) {
    return "El RUN solo puede contener numeros y la letra K al final.";
  }
  const cuerpo = run.slice(0, -1);
  const digitoIngresado = run.slice(-1);
  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - suma % 11;
  let digitoCalculado;
  if (resto === 11) {
    digitoCalculado = "0";
  } else if (resto === 10) {
    digitoCalculado = "K";
  } else {
    digitoCalculado = String(resto);
  }
  if (digitoCalculado !== digitoIngresado) {
    return "El RUN ingresado no es valido (digito verificador incorrecto).";
  }
  return "";
}

function validarTexto(valor, etiqueta, obligatorio, minimo, maximo) {
  const texto = valor.trim();
  if (texto === "") {
    return obligatorio ? "El campo " + etiqueta + " es obligatorio." : "";
  }
  if (minimo && texto.length < minimo) {
    return etiqueta + " debe tener al menos " + minimo + " caracteres.";
  }
  if (maximo && texto.length > maximo) {
    return etiqueta + " no puede superar los " + maximo + " caracteres.";
  }
  return "";
}

function validarSoloLetras(valor, etiqueta, obligatorio, maximo) {
  const texto = valor.trim();
  if (texto === "") {
    return obligatorio ? "El campo " + etiqueta + " es obligatorio." : "";
  }
  if (texto.length > maximo) {
    return etiqueta + " no puede superar los " + maximo + " caracteres.";
  }
  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(texto)) {
    return etiqueta + " solo puede contener letras y espacios.";
  }
  return "";
}

function validarPrecio(valor) {
  if (valor.trim() === "") {
    return "El precio es obligatorio.";
  }
  const numero = Number(valor);
  if (isNaN(numero)) {
    return "El precio debe ser un numero.";
  }
  if (numero < 0) {
    return "El precio no puede ser negativo. Usa 0 para un producto gratis.";
  }
  return "";
}

function validarEntero(valor, etiqueta, obligatorio) {
  if (valor.trim() === "") {
    return obligatorio ? "El campo " + etiqueta + " es obligatorio." : "";
  }
  const numero = Number(valor);
  if (isNaN(numero)) {
    return etiqueta + " debe ser un numero.";
  }
  if (!Number.isInteger(numero)) {
    return etiqueta + " debe ser un numero entero, sin decimales.";
  }
  if (numero < 0) {
    return etiqueta + " no puede ser negativo.";
  }
  return "";
}

function validarSeleccion(valor, etiqueta) {
  if (valor === "" || valor === "0") {
    return "Debes seleccionar " + etiqueta + ".";
  }
  return "";
}

function validarFechaNacimiento(valor) {
  if (valor === "") {
    return "";
  }
  const fecha = new Date(valor);
  const hoy = new Date;
  if (fecha > hoy) {
    return "La fecha de nacimiento no puede ser futura.";
  }
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const mes = hoy.getMonth() - fecha.getMonth();
  if (mes < 0 || mes === 0 && hoy.getDate() < fecha.getDate()) {
    edad--;
  }
  if (edad < 13) {
    return "El usuario debe tener al menos 13 anos.";
  }
  if (edad > 110) {
    return "Revisa la fecha, la edad calculada no es realista.";
  }
  return "";
}

function validarConfirmacion(valor, valorOriginal) {
  if (valor === "") {
    return "Debes repetir la contrasena.";
  }
  if (valor !== valorOriginal) {
    return "Las contrasenas no coinciden.";
  }
  return "";
}

function cargarRegiones(selectRegion, selectComuna) {
  if (!selectRegion || !selectComuna) return;
  REGIONES.forEach(function(region) {
    const opcion = document.createElement("option");
    opcion.value = region.nombre;
    opcion.textContent = region.nombre;
    selectRegion.appendChild(opcion);
  });
  selectRegion.addEventListener("change", function() {
    selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
    const regionElegida = REGIONES.find(function(region) {
      return region.nombre === selectRegion.value;
    });
    if (regionElegida) {
      regionElegida.comunas.forEach(function(comuna) {
        const opcion = document.createElement("option");
        opcion.value = comuna;
        opcion.textContent = comuna;
        selectComuna.appendChild(opcion);
      });
      selectComuna.disabled = false;
    } else {
      selectComuna.disabled = true;
    }
    aplicarResultado(selectRegion, validarSeleccion(selectRegion.value, "una region"));
  });
}

function mostrarExito(idContenedor, mensaje) {
  const caja = document.getElementById(idContenedor);
  if (!caja) return;
  caja.className = "alert alert-success mt-3";
  caja.innerHTML = "<strong>Listo.</strong> " + mensaje;
  caja.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function mostrarAdvertencia(idContenedor, mensaje) {
  const caja = document.getElementById(idContenedor);
  if (!caja) return;
  caja.className = "alert alert-danger mt-3";
  caja.innerHTML = "<strong>Revisa el formulario.</strong> " + mensaje;
}

function iniciarValidacionLogin() {
  const form = document.getElementById("form-login");
  if (!form) return;
  const correo = document.getElementById("correo");
  const password = document.getElementById("password");
  validarEnVivo(correo, function(v) {
    return validarCorreo(v, true);
  });
  validarEnVivo(password, validarPassword);
  activarContador(correo, 100);
  form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const okCorreo = aplicarResultado(correo, validarCorreo(correo.value, true));
    const okPassword = aplicarResultado(password, validarPassword(password.value));
    if (!okCorreo || !okPassword) {
      mostrarAdvertencia("resultado-form", "Corrige los campos marcados en rojo.");
      return;
    }
    const usuario = obtenerUsuarios().find(function(u) {
      return u.correo.toLowerCase() === correo.value.trim().toLowerCase() && u.password === password.value;
    });
    if (!usuario) {
      mostrarAdvertencia("resultado-form", "El correo o la contrasena no son correctos.");
      return;
    }
    iniciarSesion(usuario);
    mostrarExito("resultado-form", "Bienvenido/a " + usuario.nombre + ". Tu perfil es " + usuario.tipoUsuario + ". Redirigiendo...");
    setTimeout(function() {
      if (usuario.tipoUsuario === "Cliente") {
        window.location.href = "index.html";
      } else {
        window.location.href = "admin/index.html";
      }
    }, 1500);
  });
}

function iniciarValidacionContacto() {
  const form = document.getElementById("form-contacto");
  if (!form) return;
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const comentario = document.getElementById("comentario");
  validarEnVivo(nombre, function(v) {
    return validarTexto(v, "nombre", true, 0, 100);
  });
  validarEnVivo(correo, function(v) {
    return validarCorreo(v, false);
  });
  validarEnVivo(comentario, function(v) {
    return validarTexto(v, "comentario", true, 0, 500);
  });
  activarContador(nombre, 100);
  activarContador(correo, 100);
  activarContador(comentario, 500);
  form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const okNombre = aplicarResultado(nombre, validarTexto(nombre.value, "nombre", true, 0, 100));
    const okCorreo = aplicarResultado(correo, validarCorreo(correo.value, false));
    const okComentario = aplicarResultado(comentario, validarTexto(comentario.value, "comentario", true, 0, 500));
    if (okNombre && okCorreo && okComentario) {
      mostrarExito("resultado-form", "Tu mensaje fue enviado. Un ejecutivo de ExpressDelivery te respondera dentro de 24 horas habiles.");
      form.reset();
      [ nombre, correo, comentario ].forEach(function(campo) {
        campo.classList.remove("campo-valido");
      });
    } else {
      mostrarAdvertencia("resultado-form", "Faltan datos o hay errores en el formulario.");
    }
  });
}

function iniciarValidacionUsuario() {
  const form = document.getElementById("form-usuario");
  if (!form) return;
  const run = document.getElementById("run");
  const nombre = document.getElementById("nombre");
  const apellidos = document.getElementById("apellidos");
  const correo = document.getElementById("correo");
  const fecha = document.getElementById("fechaNacimiento");
  const tipoUsuario = document.getElementById("tipoUsuario");
  const region = document.getElementById("region");
  const comuna = document.getElementById("comuna");
  const direccion = document.getElementById("direccion");
  const password = document.getElementById("password");
  const confirmar = document.getElementById("confirmarPassword");
  cargarRegiones(region, comuna);
  validarEnVivo(run, validarRun);
  validarEnVivo(nombre, function(v) {
    return validarSoloLetras(v, "nombre", true, 50);
  });
  validarEnVivo(apellidos, function(v) {
    return validarSoloLetras(v, "apellidos", true, 100);
  });
  validarEnVivo(correo, function(v) {
    return validarCorreo(v, true);
  });
  validarEnVivo(fecha, validarFechaNacimiento);
  validarEnVivo(direccion, function(v) {
    return validarTexto(v, "direccion", true, 0, 300);
  });
  if (password) {
    validarEnVivo(password, validarPassword);
  }
  if (confirmar) {
    validarEnVivo(confirmar, function(v) {
      return validarConfirmacion(v, password.value);
    });
  }
  if (comuna) {
    comuna.addEventListener("change", function() {
      aplicarResultado(comuna, validarSeleccion(comuna.value, "una comuna"));
    });
  }
  if (tipoUsuario) {
    tipoUsuario.addEventListener("change", function() {
      aplicarResultado(tipoUsuario, validarSeleccion(tipoUsuario.value, "un tipo de usuario"));
    });
  }
  activarContador(nombre, 50);
  activarContador(apellidos, 100);
  activarContador(correo, 100);
  activarContador(direccion, 300);
  run.addEventListener("input", function() {
    run.value = run.value.toUpperCase().replace(/[.\-]/g, "");
  });
  form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const resultados = [ aplicarResultado(run, validarRun(run.value)), aplicarResultado(nombre, validarSoloLetras(nombre.value, "nombre", true, 50)), aplicarResultado(apellidos, validarSoloLetras(apellidos.value, "apellidos", true, 100)), aplicarResultado(correo, validarCorreo(correo.value, true)), aplicarResultado(fecha, validarFechaNacimiento(fecha.value)), aplicarResultado(region, validarSeleccion(region.value, "una region")), aplicarResultado(comuna, validarSeleccion(comuna.value, "una comuna")), aplicarResultado(direccion, validarTexto(direccion.value, "direccion", true, 0, 300)) ];
    if (tipoUsuario) {
      resultados.push(aplicarResultado(tipoUsuario, validarSeleccion(tipoUsuario.value, "un tipo de usuario")));
    }
    if (password) {
      resultados.push(aplicarResultado(password, validarPassword(password.value)));
    }
    if (confirmar) {
      resultados.push(aplicarResultado(confirmar, validarConfirmacion(confirmar.value, password.value)));
    }
    const listaUsuarios = obtenerUsuarios();
    const modoEdicion = form.dataset.modo === "editar";
    const runOriginal = form.dataset.run || "";
    const runRepetido = listaUsuarios.some(function(u) {
      return u.run === run.value && u.run !== runOriginal;
    });
    if (runRepetido) {
      marcarError(run, "Ya existe un usuario registrado con este RUN.");
      resultados.push(false);
    }
    const correoRepetido = listaUsuarios.some(function(u) {
      return u.correo.toLowerCase() === correo.value.trim().toLowerCase() && u.run !== runOriginal;
    });
    if (correoRepetido) {
      marcarError(correo, "Ya existe un usuario registrado con este correo.");
      resultados.push(false);
    }
    if (resultados.includes(false)) {
      mostrarAdvertencia("resultado-form", "Revisa los campos marcados en rojo antes de continuar.");
      return;
    }
    const usuario = {
      run: run.value,
      nombre: nombre.value.trim(),
      apellidos: apellidos.value.trim(),
      correo: correo.value.trim().toLowerCase(),
      fechaNacimiento: fecha.value,
      tipoUsuario: tipoUsuario ? tipoUsuario.value : "Cliente",
      region: region.value,
      comuna: comuna.value,
      direccion: direccion.value.trim(),
      password: password ? password.value : "clave1"
    };
    guardarUsuario(usuario, modoEdicion, runOriginal);
    mostrarExito("resultado-form", "El usuario " + usuario.nombre + " " + usuario.apellidos + " fue guardado correctamente.");
    if (!modoEdicion) {
      form.reset();
      if (comuna) {
        comuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
        comuna.disabled = true;
      }
      form.querySelectorAll(".campo-valido").forEach(function(campo) {
        campo.classList.remove("campo-valido");
      });
    }
  });
}

function iniciarValidacionProducto() {
  const form = document.getElementById("form-producto");
  if (!form) return;
  const codigo = document.getElementById("codigo");
  const nombre = document.getElementById("nombre");
  const descripcion = document.getElementById("descripcion");
  const precio = document.getElementById("precio");
  const stock = document.getElementById("stock");
  const stockCritico = document.getElementById("stockCritico");
  const categoria = document.getElementById("categoria");
  CATEGORIAS.forEach(function(cat) {
    const opcion = document.createElement("option");
    opcion.value = cat.codigo;
    opcion.textContent = cat.nombre;
    categoria.appendChild(opcion);
  });
  validarEnVivo(codigo, function(v) {
    return validarTexto(v, "codigo", true, 3, 0);
  });
  validarEnVivo(nombre, function(v) {
    return validarTexto(v, "nombre", true, 0, 100);
  });
  validarEnVivo(descripcion, function(v) {
    return validarTexto(v, "descripcion", false, 0, 500);
  });
  validarEnVivo(precio, validarPrecio);
  validarEnVivo(stock, function(v) {
    return validarEntero(v, "stock", true);
  });
  validarEnVivo(stockCritico, function(v) {
    return validarEntero(v, "stock critico", false);
  });
  categoria.addEventListener("change", function() {
    aplicarResultado(categoria, validarSeleccion(categoria.value, "una categoria"));
  });
  activarContador(nombre, 100);
  activarContador(descripcion, 500);
  precio.addEventListener("input", function() {
    const ayuda = document.getElementById("ayuda-precio");
    if (!ayuda) return;
    if (precio.value.trim() === "0") {
      ayuda.textContent = "Precio 0: este producto se publicara como GRATIS.";
    } else {
      ayuda.textContent = "Puede tener decimales. Usa 0 para un producto gratis.";
    }
  });
  form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const resultados = [ aplicarResultado(codigo, validarTexto(codigo.value, "codigo", true, 3, 0)), aplicarResultado(nombre, validarTexto(nombre.value, "nombre", true, 0, 100)), aplicarResultado(descripcion, validarTexto(descripcion.value, "descripcion", false, 0, 500)), aplicarResultado(precio, validarPrecio(precio.value)), aplicarResultado(stock, validarEntero(stock.value, "stock", true)), aplicarResultado(stockCritico, validarEntero(stockCritico.value, "stock critico", false)), aplicarResultado(categoria, validarSeleccion(categoria.value, "una categoria")) ];
    if (stockCritico.value.trim() !== "" && stock.value.trim() !== "") {
      if (Number(stockCritico.value) > Number(stock.value)) {
        marcarError(stockCritico, "El stock critico no puede ser mayor que el stock actual.");
        resultados.push(false);
      }
    }
    const modoEdicion = form.dataset.modo === "editar";
    const codigoOriginal = form.dataset.codigo || "";
    const repetido = obtenerProductos().some(function(p) {
      return p.codigo.toUpperCase() === codigo.value.trim().toUpperCase() && p.codigo !== codigoOriginal;
    });
    if (repetido) {
      marcarError(codigo, "Ya existe un producto con este codigo.");
      resultados.push(false);
    }
    if (resultados.includes(false)) {
      mostrarAdvertencia("resultado-form", "Revisa los campos marcados en rojo antes de guardar.");
      return;
    }
    const producto = {
      codigo: codigo.value.trim().toUpperCase(),
      nombre: nombre.value.trim(),
      descripcion: descripcion.value.trim(),
      precio: Number(precio.value),
      stock: Number(stock.value),
      stockCritico: stockCritico.value.trim() === "" ? 0 : Number(stockCritico.value),
      categoria: categoria.value,
      imagen: "assets/img/generico.svg"
    };
    guardarProducto(producto, modoEdicion, codigoOriginal);
    let aviso = "El producto " + producto.nombre + " fue guardado correctamente.";
    if (producto.stockCritico > 0 && producto.stock <= producto.stockCritico) {
      aviso += " ATENCION: el stock (" + producto.stock + ") esta en o bajo el nivel critico (" + producto.stockCritico + ").";
    }
    mostrarExito("resultado-form", aviso);
    if (!modoEdicion) {
      form.reset();
      form.querySelectorAll(".campo-valido").forEach(function(campo) {
        campo.classList.remove("campo-valido");
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  iniciarValidacionLogin();
  iniciarValidacionContacto();
  iniciarValidacionUsuario();
  iniciarValidacionProducto();
});
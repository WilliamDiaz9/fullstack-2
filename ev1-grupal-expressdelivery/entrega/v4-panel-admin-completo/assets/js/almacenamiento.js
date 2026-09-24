const CLAVE_PRODUCTOS = "ed_productos";

const CLAVE_USUARIOS = "ed_usuarios";

const CLAVE_CARRITO = "ed_carrito";

const CLAVE_SESION = "ed_sesion";

function leerDeStorage(clave, valorPorDefecto) {
  try {
    const texto = localStorage.getItem(clave);
    if (texto === null) {
      return valorPorDefecto;
    }
    return JSON.parse(texto);
  } catch (error) {
    console.error("No se pudo leer la clave " + clave, error);
    return valorPorDefecto;
  }
}

function escribirEnStorage(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.error("No se pudo guardar la clave " + clave, error);
    return false;
  }
}

function obtenerProductos() {
  const guardados = leerDeStorage(CLAVE_PRODUCTOS, null);
  if (guardados === null) {
    escribirEnStorage(CLAVE_PRODUCTOS, PRODUCTOS);
    return PRODUCTOS.slice();
  }
  return guardados;
}

function buscarProducto(codigo) {
  return obtenerProductos().find(function(p) {
    return p.codigo === codigo;
  });
}

function guardarProducto(producto, esEdicion, codigoOriginal) {
  const lista = obtenerProductos();
  if (esEdicion) {
    const indice = lista.findIndex(function(p) {
      return p.codigo === codigoOriginal;
    });
    if (indice !== -1) {
      lista[indice] = producto;
    }
  } else {
    lista.push(producto);
  }
  escribirEnStorage(CLAVE_PRODUCTOS, lista);
}

function eliminarProducto(codigo) {
  const lista = obtenerProductos().filter(function(p) {
    return p.codigo !== codigo;
  });
  escribirEnStorage(CLAVE_PRODUCTOS, lista);
}

function restablecerProductos() {
  escribirEnStorage(CLAVE_PRODUCTOS, PRODUCTOS);
}

function obtenerUsuarios() {
  const guardados = leerDeStorage(CLAVE_USUARIOS, null);
  if (guardados === null) {
    escribirEnStorage(CLAVE_USUARIOS, USUARIOS);
    return USUARIOS.slice();
  }
  return guardados;
}

function buscarUsuario(run) {
  return obtenerUsuarios().find(function(u) {
    return u.run === run;
  });
}

function guardarUsuario(usuario, esEdicion, runOriginal) {
  const lista = obtenerUsuarios();
  if (esEdicion) {
    const indice = lista.findIndex(function(u) {
      return u.run === runOriginal;
    });
    if (indice !== -1) {
      lista[indice] = usuario;
    }
  } else {
    lista.push(usuario);
  }
  escribirEnStorage(CLAVE_USUARIOS, lista);
}

function eliminarUsuario(run) {
  const lista = obtenerUsuarios().filter(function(u) {
    return u.run !== run;
  });
  escribirEnStorage(CLAVE_USUARIOS, lista);
}

function restablecerUsuarios() {
  escribirEnStorage(CLAVE_USUARIOS, USUARIOS);
}

function iniciarSesion(usuario) {
  escribirEnStorage(CLAVE_SESION, {
    run: usuario.run,
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    correo: usuario.correo,
    tipoUsuario: usuario.tipoUsuario
  });
}

function obtenerSesion() {
  return leerDeStorage(CLAVE_SESION, null);
}

function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

function exigirSesion(rolesPermitidos, rutaLogin) {
  const sesion = obtenerSesion();
  if (!sesion) {
    alert("Debes iniciar sesion para acceder al panel de administracion.");
    window.location.href = rutaLogin;
    return null;
  }
  if (!rolesPermitidos.includes(sesion.tipoUsuario)) {
    alert("Tu perfil (" + sesion.tipoUsuario + ") no tiene permisos para esta vista.");
    window.location.href = rutaLogin;
    return null;
  }
  return sesion;
}
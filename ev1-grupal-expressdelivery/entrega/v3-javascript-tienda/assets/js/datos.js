const CATEGORIAS = [ {
  codigo: "SERVICIO",
  nombre: "Servicios de envio"
}, {
  codigo: "EMBALAJE",
  nombre: "Materiales de embalaje"
}, {
  codigo: "SEGURO",
  nombre: "Seguros y coberturas"
}, {
  codigo: "PLAN",
  nombre: "Planes para empresas"
} ];

const PRODUCTOS = [ {
  codigo: "SE001",
  nombre: "Envio estandar",
  descripcion: "Entrega en 24 horas habiles dentro de la Region Metropolitana. Incluye seguimiento en linea del estado del envio y comprobante digital de entrega firmado por el destinatario.",
  precio: 5e3,
  stock: 120,
  stockCritico: 20,
  categoria: "SERVICIO",
  imagen: "assets/img/envio-estandar.png"
}, {
  codigo: "SE002",
  nombre: "Envio expres",
  descripcion: "Entrega garantizada en 4 horas. Ideal para farmacias y retail que necesitan reponer stock el mismo dia. Asignacion prioritaria de repartidor y vehiculo.",
  precio: 1e4,
  stock: 60,
  stockCritico: 15,
  categoria: "SERVICIO",
  imagen: "assets/img/envio-expres.png"
}, {
  codigo: "SE003",
  nombre: "Envio urgente",
  descripcion: "Entrega en 1 hora con moto dedicada. El repartidor sale de inmediato hacia el punto de retiro y no realiza otras entregas en el trayecto.",
  precio: 15e3,
  stock: 25,
  stockCritico: 10,
  categoria: "SERVICIO",
  imagen: "assets/img/envio-urgente.png"
}, {
  codigo: "SE004",
  nombre: "Envio de gran volumen",
  descripcion: "Para paquetes de gran tamano o pallets. Se asigna furgoneta o camioneta segun la capacidad en kilos declarada por el cliente.",
  precio: 12e3,
  stock: 18,
  stockCritico: 5,
  categoria: "SERVICIO",
  imagen: "assets/img/envio-volumen.png"
}, {
  codigo: "EMB010",
  nombre: "Caja de carton reforzada 40x30x30",
  descripcion: "Caja de doble corrugado resistente hasta 20 kg. Recomendada para envios fragiles.",
  precio: 1990,
  stock: 340,
  stockCritico: 50,
  categoria: "EMBALAJE",
  imagen: "assets/img/caja-carton.png"
}, {
  codigo: "EMB011",
  nombre: "Rollo film burbuja 10 metros",
  descripcion: "Proteccion adicional para productos fragiles como vidrio, electronica o medicamentos.",
  precio: 3490,
  stock: 12,
  stockCritico: 15,
  categoria: "EMBALAJE",
  imagen: "assets/img/film-burbuja.png"
}, {
  codigo: "SEG020",
  nombre: "Seguro de carga hasta 500.000",
  descripcion: "Cobertura por perdida o dano del contenido del paquete hasta 500.000 pesos.",
  precio: 4500,
  stock: 200,
  stockCritico: 30,
  categoria: "SEGURO",
  imagen: "assets/img/seguro.png"
}, {
  codigo: "PLN030",
  nombre: "Cotizacion plan empresas",
  descripcion: "Evaluacion sin costo de un plan mensual a medida para empresas con mas de 50 envios al mes. Un ejecutivo se contacta en 24 horas.",
  precio: 0,
  stock: 999,
  stockCritico: 0,
  categoria: "PLAN",
  imagen: "assets/img/plan-empresas.png"
}, {
  codigo: "EMB012",
  nombre: "Sobre porta documentos A4",
  descripcion: "Sobre plastico resistente al agua para el envio de documentos, contratos y recetas.",
  precio: 890,
  stock: 0,
  stockCritico: 25,
  categoria: "EMBALAJE",
  imagen: "assets/img/sobre.png"
}, {
  codigo: "SE005",
  nombre: "Retiro programado en domicilio",
  descripcion: "El repartidor pasa a retirar el paquete en la direccion y horario que el cliente indique, sin costo adicional de traslado.",
  precio: 2500,
  stock: 80,
  stockCritico: 20,
  categoria: "SERVICIO",
  imagen: "assets/img/retiro.png"
}, {
  codigo: "SEG021",
  nombre: "Seguro premium hasta 2.000.000",
  descripcion: "Cobertura ampliada para mercaderia de alto valor. Requiere declaracion previa del contenido.",
  precio: 12900,
  stock: 45,
  stockCritico: 10,
  categoria: "SEGURO",
  imagen: "assets/img/seguro-premium.png"
}, {
  codigo: "PLN031",
  nombre: "Plan farmacias 100 envios",
  descripcion: "Bolsa de 100 envios expres mensuales con tarifa preferente para cadenas de farmacias.",
  precio: 78e4,
  stock: 10,
  stockCritico: 3,
  categoria: "PLAN",
  imagen: "assets/img/plan-farmacias.png"
} ];

const REGIONES = [ {
  nombre: "Region Metropolitana de Santiago",
  comunas: [ "Santiago", "Providencia", "Las Condes", "Maipu", "Puente Alto", "La Florida", "Nunoa", "Quilicura", "Renca", "San Bernardo", "Penalolen", "Estacion Central" ]
}, {
  nombre: "Region de Valparaiso",
  comunas: [ "Valparaiso", "Vina del Mar", "Quilpue", "Villa Alemana", "San Antonio", "Quillota", "Los Andes" ]
}, {
  nombre: "Region del Biobio",
  comunas: [ "Concepcion", "Talcahuano", "Chiguayante", "San Pedro de la Paz", "Coronel", "Los Angeles" ]
}, {
  nombre: "Region de La Araucania",
  comunas: [ "Temuco", "Padre Las Casas", "Villarrica", "Pucon", "Angol" ]
}, {
  nombre: "Region de Nuble",
  comunas: [ "Chillan", "Chillan Viejo", "San Carlos", "Bulnes", "Quirihue" ]
}, {
  nombre: "Region del Maule",
  comunas: [ "Talca", "Curico", "Linares", "Longavi", "Cauquenes" ]
}, {
  nombre: "Region de Coquimbo",
  comunas: [ "La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuna" ]
}, {
  nombre: "Region de Antofagasta",
  comunas: [ "Antofagasta", "Calama", "Tocopilla", "Mejillones" ]
}, {
  nombre: "Region de Los Lagos",
  comunas: [ "Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas" ]
} ];

const TIPOS_USUARIO = [ "Administrador", "Vendedor", "Cliente" ];

const USUARIOS = [ {
  run: "190110222",
  nombre: "Axel",
  apellidos: "Contreras Rojas",
  correo: "axel.contreras@duoc.cl",
  fechaNacimiento: "2001-03-14",
  tipoUsuario: "Administrador",
  region: "Region Metropolitana de Santiago",
  comuna: "Santiago",
  direccion: "Av. Libertador Bernardo O'Higgins 1234, oficina 501",
  password: "admin1"
}, {
  run: "175558888",
  nombre: "Alexis",
  apellidos: "Encalada Munoz",
  correo: "alexis.encalada@duoc.cl",
  fechaNacimiento: "1999-08-02",
  tipoUsuario: "Vendedor",
  region: "Region Metropolitana de Santiago",
  comuna: "Maipu",
  direccion: "Calle Pajaritos 456",
  password: "vende1"
}, {
  run: "201234565",
  nombre: "Isidora",
  apellidos: "Carreno Silva",
  correo: "isidora.carreno@duoc.cl",
  fechaNacimiento: "2002-11-27",
  tipoUsuario: "Cliente",
  region: "Region de Valparaiso",
  comuna: "Vina del Mar",
  direccion: "Av. San Martin 890, depto 21",
  password: "clien1"
}, {
  run: "162345672",
  nombre: "Marcela",
  apellidos: "Fuentes Vera",
  correo: "marcela.fuentes@gmail.com",
  fechaNacimiento: "1996-05-19",
  tipoUsuario: "Cliente",
  region: "Region del Biobio",
  comuna: "Concepcion",
  direccion: "Barros Arana 220",
  password: "farma1"
}, {
  run: "134567899",
  nombre: "Rodrigo",
  apellidos: "Pizarro Leon",
  correo: "rodrigo.pizarro@profesor.duoc.cl",
  fechaNacimiento: "1988-01-09",
  tipoUsuario: "Vendedor",
  region: "Region Metropolitana de Santiago",
  comuna: "Providencia",
  direccion: "Av. Providencia 2020, piso 3",
  password: "vende2"
} ];

const FLOTA = [ {
  patente: "AB1234",
  tipo: "Furgoneta",
  marca: "Ford Transit",
  capacidad: 800,
  estado: "Disponible"
}, {
  patente: "CD5678",
  tipo: "Moto",
  marca: "Yamaha",
  capacidad: 50,
  estado: "Disponible"
}, {
  patente: "EF9012",
  tipo: "Camioneta",
  marca: "Toyota",
  capacidad: 500,
  estado: "En taller"
}, {
  patente: "GH3456",
  tipo: "Furgoneta",
  marca: "Mercedes",
  capacidad: 1e3,
  estado: "Disponible"
}, {
  patente: "IJ7890",
  tipo: "Moto",
  marca: "Honda",
  capacidad: 40,
  estado: "Disponible"
} ];

const ESTADOS_ENVIO = [ {
  estado: "Solicitado",
  clase: "solicitado",
  descripcion: "Hemos recibido tu solicitud de envio."
}, {
  estado: "En ruta",
  clase: "ruta",
  descripcion: "Tu envio esta en proceso de entrega."
}, {
  estado: "Entregado",
  clase: "entregado",
  descripcion: "Tu envio ha sido entregado exitosamente."
}, {
  estado: "Retrasado",
  clase: "retrasado",
  descripcion: "Tu envio presenta un retraso."
}, {
  estado: "Cancelado",
  clase: "cancelado",
  descripcion: "El envio fue cancelado."
} ];

const CUPONES = [ {
  codigo: "EXPRESS10",
  descuento: .1,
  descripcion: "10% de descuento"
}, {
  codigo: "FLOTA20",
  descuento: .2,
  descripcion: "20% de descuento clientes empresa"
}, {
  codigo: "DUOC15",
  descuento: .15,
  descripcion: "15% comunidad Duoc UC"
} ];
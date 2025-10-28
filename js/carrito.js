// ============================
// Simulador de Carrito - Pastelería
// Entregable 1 — CoderHouse (Funciones, parámetros, arrays, objetos, condicionales, bucles, consola y diálogos)
// ============================

// ----- Datos base (const, arrays de objetos) -----
const IVA = 0.21;
const CUPON_VALIDO = "PROMO10";  // 10% off

// Catálogo de productos (array de objetos)
const productos = [
  { id: 1, nombre: "Selva Negra", precio: 30000 },
  { id: 2, nombre: "Chajá", precio: 30000 },
  { id: 3, nombre: "Lemon Pie", precio: 12000 },
  { id: 4, nombre: "Tarta Frutales ", precio: 32000 },
  { id: 5, nombre: "Brownie", precio: 18000 }
];

// Carrito (array de objetos con cantidad)
let carrito = [];

// ----- Utilidades (funciones puras) -----
/**
 * Busca un producto por ID en el catálogo.
 * @param {number} id
 * @returns {object|undefined}
 */
function buscarProductoPorId(id) {
  return productos.find(p => p.id === id);
}

/**
 * Calcula el subtotal del carrito (sin IVA).
 * @returns {number}
 */
function calcularSubtotal() {
  return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

/**
 * Aplica cupón si corresponde y devuelve el total con descuento.
 * @param {number} monto
 * @param {string} cupon
 * @returns {number}
 */
function aplicarCupon(monto, cupon) {
  if (typeof cupon === "string" && cupon.toUpperCase().trim() === CUPON_VALIDO) {
    return monto * 0.90; // 10% dto
  }
  return monto;
}

// ----- Funciones principales (interacción) -----
/**
 * Muestra los productos disponibles en consola.
 */
function listarProductos() {
  console.clear();
  console.log("=== Catálogo de Pastelería ===");
  for (const p of productos) {
    console.log(`#${p.id} - ${p.nombre} — $${p.precio}`);
  }
  console.log("\nUsá la opción 'Agregar' en el menú para sumarlos al carrito.");
}

/**
 * Agrega un producto al carrito por ID y cantidad (valida entradas).
 * @param {number} id
 * @param {number} cantidad
 */
function agregarAlCarrito(id, cantidad) {
  const producto = buscarProductoPorId(id);
  if (!producto) {
    alert("❌ Producto inexistente. Probá con un ID del 1 al " + productos.length + ".");
    return;
  }
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("⚠️ Cantidad inválida.");
    return;
  }
  // Si ya existe en el carrito, acumular cantidad
  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad });
  }
  alert(`✅ Agregaste ${cantidad} × ${producto.nombre} al carrito.`);
  mostrarCarrito();
}

/**
 * Quita un producto del carrito por ID.
 * @param {number} id
 */
function quitarDelCarrito(id) {
  const index = carrito.findIndex(item => item.id === id);
  if (index === -1) {
    alert("⚠️ Ese producto no está en tu carrito.");
    return;
  }
  const quitado = carrito.splice(index, 1)[0];
  alert(`🗑️ Quitaste ${quitado.nombre} del carrito.`);
  mostrarCarrito();
}

/**
 * Imprime el contenido del carrito en consola.
 */
function mostrarCarrito() {
  console.clear();
  console.log("=== Tu Carrito ===");
  if (carrito.length === 0) {
    console.log("Vacío por ahora. Agregá algo rico 😋");
    return;
  }
  for (const item of carrito) {
    console.log(`${item.cantidad} × ${item.nombre} — $${item.precio} c/u`);
  }
  console.log("------------------------");
  console.log("Subtotal: $", calcularSubtotal());
}

/**
 * Finaliza la compra: aplica IVA y cupón opcional. Muestra resumen con alert.
 */
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("🛒 Tu carrito está vacío.");
    return;
  }
  const subtotal = calcularSubtotal();
  const subtotalConIva = subtotal * (1 + IVA);

  const quiereCupon = confirm("¿Tenés un cupón de descuento?");
  let cuponIngresado = "";
  if (quiereCupon) {
    cuponIngresado = prompt("Ingresá tu cupón (ej: PROMO10):") || "";
  }
  const totalConDescuento = aplicarCupon(subtotalConIva, cuponIngresado);

  // Armar mensaje final con saltos de línea
  const mensaje = [
    "🧾 Resumen de compra",
    "------------------------",
    `Items: ${carrito.map(i => `${i.cantidad}× ${i.nombre}`).join(", ")}`,
    `Subtotal: $${subtotal}`,
    `IVA (21%): $${(subtotal*IVA).toFixed(2)}`,
    cuponIngresado.trim() ? `Cupón aplicado (${cuponIngresado.toUpperCase().trim()}): ✅` : "Cupón aplicado: ❌",
    `TOTAL: $${totalConDescuento.toFixed(2)}`
  ].join("\n");

  alert(mensaje);

  const confirmar = confirm("¿Confirmás la compra?");
  if (confirmar) {
    alert("🎉 ¡Gracias por tu compra! Tu pedido está en camino.");
    carrito = []; // vaciar
    console.clear();
    console.log("Carrito vacío. ¡Volvé pronto!");
  } else {
    alert("⏳ Compra cancelada. Podés seguir editando el carrito.");
  }
}

/**
 * Menú principal (bucle + condicionales). Controla el flujo del simulador.
 */
function iniciarSimulador() {
  alert("Bienvenid@ a la Pastelería. Vamos a usar diálogos y la consola. ¡Abrí la consola!");
  listarProductos();

  let seguir = true;
  while (seguir) {
    const opcion = prompt(
      "Elegí una opción:\n" +
      "1) Listar productos\n" +
      "2) Agregar al carrito\n" +
      "3) Quitar del carrito\n" +
      "4) Ver carrito\n" +
      "5) Finalizar compra\n" +
      "0) Salir"
    );

    if (opcion === null) {
      // Usuario cerró el prompt => salir
      if (confirm("¿Seguro que querés salir del simulador?")) {
        seguir = false;
      }
      continue;
    }

    switch (opcion.trim()) {
      case "1":
        listarProductos();
        break;
      case "2": {
        const id = Number(prompt("Ingresá el ID del producto:"));
        const cantidad = Number(prompt("¿Cuántas unidades?"));
        agregarAlCarrito(id, cantidad);
        break;
      }
      case "3": {
        const id = Number(prompt("ID del producto a quitar:"));
        quitarDelCarrito(id);
        break;
      }
      case "4":
        mostrarCarrito();
        break;
      case "5":
        finalizarCompra();
        break;
      case "0":
        if (confirm("¿Seguro que querés salir?")) {
          seguir = false;
        }
        break;
      default:
        alert("Opción inválida. Probá de nuevo.");
    }
  }

  alert("¡Gracias por usar el simulador! Recargá la página para reiniciar.");
}

// Ejecutar al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
  console.log("Simulador listo. Abrí la consola para ver el catálogo y mensajes.");
  iniciarSimulador();
});

// ----- Exportar funciones al global para prueba manual (opcional) -----
window.listarProductos = listarProductos;
window.agregarAlCarrito = agregarAlCarrito;
window.quitarDelCarrito = quitarDelCarrito;
window.finalizarCompra = finalizarCompra;
window.iniciarSimulador = iniciarSimulador;
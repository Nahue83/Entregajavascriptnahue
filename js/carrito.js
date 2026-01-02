// -----------------------------
//   CARRITO - VERSIÓN FINAL
// -----------------------------

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar en storage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

// Agregar producto
function agregarAlCarrito(producto) {
    let item = carrito.find(p => p.id === producto.id);

    if (item) {
        item.cant++;
    } else {
        carrito.push({ ...producto, cant: 1 });
    }

    guardarCarrito();
}

// Sumar cantidad
function sumar(id) {
    let item = carrito.find(p => p.id === id);
    if (item) item.cant++;
    guardarCarrito();
}

// Restar cantidad
function restar(id) {
    let item = carrito.find(p => p.id === id);
    if (!item) return;

    if (item.cant > 1) {
        item.cant--;
    } else {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
}

// Eliminar producto entero
function eliminar(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
}

// Vaciar carrito completo
function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let total = carrito.reduce((acc, p) => acc + p.precio * p.cant, 0);

    alert(`¡Gracias por tu compra! Total: $${total}`);

    carrito = [];
    guardarCarrito();
}

// -----------------------------
//    RENDER DEL CARRITO
// -----------------------------
function renderCarrito() {
    const panel = document.getElementById("panelCarrito");
    if (!panel) return;

    panel.innerHTML = "";
    let total = 0;

    carrito.forEach(p => {
        total += p.precio * p.cant;

        const item = document.createElement("div");
        item.className = "carrito-item";

        item.innerHTML = `
            <span>${p.nombre} x${p.cant}</span>
            <span>$${p.precio * p.cant}</span>

            <div class="carrito-controles">
                <button onclick="sumar(${p.id})">+</button>
                <button onclick="restar(${p.id})">-</button>
                <button onclick="eliminar(${p.id})">🗑</button>
            </div>
        `;

        panel.appendChild(item);
    });

    // Mostrar total
    const totalHTML = document.createElement("p");
    totalHTML.className = "total-carrito";
    totalHTML.textContent = `Total: $${total}`;
    panel.appendChild(totalHTML);

    // Botón FINALIZAR COMPRA
    const btnFinalizar = document.createElement("button");
    btnFinalizar.className = "btn-finalizar";
    btnFinalizar.textContent = "Finalizar compra";
    btnFinalizar.onclick = finalizarCompra;
    panel.appendChild(btnFinalizar);

    // Botón VACIAR CARRITO
    const btnVaciar = document.createElement("button");
    btnVaciar.className = "btn-vaciar";
    btnVaciar.textContent = "Vaciar carrito";
    btnVaciar.onclick = vaciarCarrito;
    panel.appendChild(btnVaciar);
}

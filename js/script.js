function render(lista) {
    const cont = document.querySelector(".cards");
    cont.innerHTML = "";

    lista.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button class="btn-agregar">Agregar</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            agregarAlCarrito(p);
        });

        cont.appendChild(card);
    });
}

if (location.pathname.includes("dulce.html")) render(productos.dulce);
if (location.pathname.includes("salado.html")) render(productos.salado);
if (location.pathname.includes("materas.html")) render(productos.materas);

document.getElementById("carritoFlotante").addEventListener("click", () => {
    const panel = document.getElementById("panelCarrito");
    panel.style.display = (panel.style.display === "block") ? "none" : "block";
});

// Botones globales
document.getElementById("btnFinalizar").addEventListener("click", finalizarCompra);
document.getElementById("btnVaciar").addEventListener("click", vaciarCarrito);

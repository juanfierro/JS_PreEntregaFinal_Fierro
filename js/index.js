let productos = [
    { id: 1, nombre: 'Flor de solapa', precio: 10 , imagen: '../assets/img/flor_de_solapa.jpg', descripcion:'Ramillete para el novio, hace juego con el ramo de la novia.'},
    { id: 2, nombre: 'Centros de Mesa', precio: 50 , imagen: '../assets/img/centros_de_mesa.jpg'},
    { id: 3, nombre: 'Coronas', precio: 100 , imagen: '../assets/img/coronas.jpg'},
    { id: 4, nombre: 'Pulseras', precio: 20 , imagen: '../assets/img/pulseras.jpg'},
    { id: 5, nombre: 'Ramos', precio: 60 , imagen: '../assets/img/ramos.jpg'},
    { id: 6, nombre: 'Estructuras', precio: 200 , imagen: '../assets/img/estructuras.jpg'},
];


function mostrarProductos(filtro = '') {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';


    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(filtro.toLowerCase())
    );


    productosFiltrados.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card">
                <div class="card-img">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="img">
                </div>
                <div class="card-title">${producto.nombre}</div>
                <div class="card-subtitle">${producto.descripcion}</div>
                <hr class="card-divider">
                <div class="card-footer">
                    <div class="card-price">
                        <p>$ ${producto.precio}</p>
                    </div>
                    <div class="card-quantity">
                        <input type="number" class="quantity-input" id="cantidad-${producto.id}" min="1" value="1" style="width: 50px;"> 
                        <button onclick="agregarAlCarrito(${producto.id})" class="card-btn"><i class="fas fa-cart-plus"></i> </button>
                    </div>
                </div>
                    </div>
        `;
        productosDiv.appendChild(div);
    });
}


function agregarAlCarrito(id) {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productos.find(prod => prod.id === id);
    const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value) || 1;

    const productoEnCarrito = carritoActual.find(prod => prod.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
    } else {
        carritoActual.push({ ...producto, cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carritoActual));
    mostrarCarrito();
}


function mostrarCarrito() {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoList = document.getElementById('carrito');
    carritoList.innerHTML = '';
    let total = 0;

    carritoActual.forEach((producto) => {
        let li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
        li.innerHTML += `<button onclick="eliminarDelCarrito(${producto.id})">Eliminar producto</button>`;
        carritoList.appendChild(li);
        total += producto.precio * producto.cantidad;
    });

    document.getElementById('total').textContent = `Total: $${total}`;
}



document.getElementById('eliminarProductos').addEventListener('click', () => {
    localStorage.removeItem('carrito');
    mostrarCarrito();
});


function eliminarDelCarrito(id) {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoCarrito = carritoActual.filter(producto => producto.id !== id);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    mostrarCarrito();
}



document.getElementById('busqueda').addEventListener('input', (e) => {
    mostrarProductos(e.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    mostrarCarrito();
});

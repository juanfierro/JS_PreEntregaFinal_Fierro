let productos = [
    { id: 1, nombre: 'Flor de solapa', precio: 10 },
    { id: 2, nombre: 'Centros de Mesa', precio: 50 },
    { id: 3, nombre: 'Coronas', precio: 100 },
    { id: 4, nombre: 'Pulseras', precio: 20 },
    { id: 5, nombre: 'Ramos', precio: 60 },
    { id: 6, nombre: 'Estructuras', precio: 200 },
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
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <input type="number" id="cantidad-${producto.id}" min="1" value="1" style="width: 50px;"> 
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
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

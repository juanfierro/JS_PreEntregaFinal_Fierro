let productos = [
    { id: 1, nombre: 'Flor de solapa', precio: 10 , imagen: '../assets/img/flor_de_solapa.jpg', descripcion:'Ramillete para el novio, hace juego con el ramo de la novia.'},
    { id: 2, nombre: 'Centros de Mesa', precio: 50 , imagen: '../assets/img/centros_de_mesa.jpg', descripcion:'Ideal para darle vida a la mesa de invitados.'},
    { id: 3, nombre: 'Coronas', precio: 100 , imagen: '../assets/img/coronas.jpg', descripcion: 'Corona de flores preservadas para cortejo, livianas y hechas a medida.'},
    { id: 4, nombre: 'Pulseras', precio: 20 , imagen: '../assets/img/pulseras.jpg', descripcion: 'Tenemos muchos modelos para bodas y comuniones, elegí la que mas te guste!'},
    { id: 5, nombre: 'Ramos', precio: 60 , imagen: '../assets/img/ramos.jpg', descripcion: 'Mira este ramo de blancos frescos, eucalipto y avenas que combinan perfectamente.'},
    { id: 6, nombre: 'Estructuras', precio: 200 , imagen: '../assets/img/estructuras.jpg', descripcion: 'Bellisima ambientacion hecha de una combinacion de hierro, satin blanco, follaje y pmpagrass.'},
];


const carrito = [];
const carritoSeccion = document.getElementById('carrito-seccion');
const finalizarCompraBtn = document.getElementById('finalizar-compra');
const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarProductos(filtro = '') {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    // Mensaje vacío si no hay productos filtrados
    if (productosFiltrados.length === 0) {
        productosDiv.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    productosFiltrados.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card">
                <div class="card-img">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="img">
                </div>
                <div class="card-title">${producto.nombre}</div>
                <div class="card-subtitle">${producto.descripcion || ''}</div>
                <hr class="card-divider">
                <div class="card-footer">
                    <div class="card-price">
                        <p>$ ${producto.precio}</p>
                    </div>
                    <div class="card-quantity">
                        <input type="number" class="quantity-input" id="cantidad-${producto.id}" min="1" value="1" style="width: 50px;"> 
                        <button onclick="agregarAlCarrito(${producto.id})" class="card-btn"><i class="fas fa-cart-plus"></i></button>
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
    actualizarContadorCarrito();


    //Toast al agregar producto
    Toastify({
        text: `${producto.nombre} añadido al carrito`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true,
    }).showToast();
}


function mostrarCarrito() {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoList = document.getElementById('carrito');
    carritoList.innerHTML = '';
    let total = 0;

    if (carritoActual.length === 0) {
        carritoList.innerHTML = '<li>El carrito está vacío.</li>';
        document.getElementById('total').textContent = 'Total: $0';
        return;
    }

    carritoActual.forEach((producto) => {
        let li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
        li.innerHTML += `
            <button class="eliminar-btn" onclick="eliminarDelCarrito(${producto.id})">
                <i class="fas fa-trash"></i> X
            </button>
        `;

        carritoList.appendChild(li);
        total += producto.precio * producto.cantidad;
    });

    document.getElementById('total').textContent = `Total: $${total}`;
}



document.getElementById('eliminarProductos').addEventListener('click', () => {
    localStorage.removeItem('carrito');
    mostrarCarrito();
    actualizarContadorCarrito();
});


function eliminarDelCarrito(id) {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoCarrito = carritoActual.filter(producto => producto.id !== id);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    mostrarCarrito();
    actualizarContadorCarrito();
}


function actualizarContadorCarrito() {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalProductos = carritoActual.reduce((acc, prod) => acc + prod.cantidad, 0);
    document.getElementById('contador-carrito').textContent = totalProductos;
}


// Función para alternar el carrito
function alternarCarrito() {
    carritoSeccion.style.display = carritoSeccion.style.display === 'none' || carritoSeccion.style.display === '' ? 'block' : 'none';
}


function finalizarCompra() {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carritoActual.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Carrito vacío',
            text: 'No hay productos en el carrito para finalizar la compra.',
        });
        return;
    }
    Swal.fire({
        icon: 'success',
        title: 'Compra finalizada',
        text: '¡Gracias por tu compra! Tu pedido está en proceso.',
    });

    localStorage.removeItem('carrito');
    mostrarCarrito();
    actualizarContadorCarrito();
    alternarCarrito();
}

document.getElementById('busqueda').addEventListener('input', (e) => {
    mostrarProductos(e.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    mostrarCarrito();
    actualizarContadorCarrito();

    
});
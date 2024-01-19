// Lista de productos
const productos = [
    { nombre: "figura de accion", precio: 12000 },
    { nombre: "taza", precio: 4000 },
    { nombre: "manga", precio: 6000 },
    { nombre: "remera", precio: 2000 },
    { nombre: "agenda", precio: 4000 },
];

// Clase Carrito
function Carrito() {
    // Obtenemos la información del carrito desde localStorage al inicializar
    this.productos = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar un producto al carrito
    this.agregarProducto = function (producto) {
        this.productos.push(producto);
        this.guardarCarrito();
    };

    // Eliminar un producto del carrito
    this.eliminarProducto = function (nombre) {
        this.productos = this.productos.filter(producto => producto.nombre !== nombre);
        this.guardarCarrito();
    };

    // Actualizar la cantidad de un producto en el carrito
    this.actualizarCantidad = function (nombre, nuevaCantidad) {
        this.productos.forEach(producto => {
            if (producto.nombre === nombre) {
                producto.cantidad = nuevaCantidad;
            }
        });
        this.guardarCarrito();
    };

    // Obtener el total del carrito
    this.calcularTotal = function () {
        return this.productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    };

    // Guardar el carrito en localStorage
    this.guardarCarrito = function () {
        localStorage.setItem('carrito', JSON.stringify(this.productos));
    };
}

// Instancia de la clase Carrito
const carrito = new Carrito();

// Llama al botón enviar
const btnEnviar = document.getElementById('btnEnviar');

// Asigna el evento click y llama a la función iniciarCompra
btnEnviar.addEventListener('click', iniciarCompra);

function iniciarCompra() {
    const opcion = document.getElementById('opcion').value;
    const resultadoDiv = document.getElementById('resultado');

    // Limpiar el contenido actual del div
    resultadoDiv.innerHTML = "";

    if (opcion === 'si') {
        mostrarProductos();
    } else if (opcion === 'no') {
        resultadoDiv.innerHTML = "<p>Gracias por su visita. ¡Hasta luego!</p>";
    }
}

function mostrarProductos() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = "<p>A continuación la lista de productos:</p>";

    productos.forEach((producto) => {
        resultadoDiv.innerHTML += `<p>${producto.nombre} $${producto.precio}</p>`;
        const elegirProducto = document.getElementById('listaDeProductos');
        elegirProducto.innerHTML = "<p>Escoja los productos requeridos</p>";

    });

}


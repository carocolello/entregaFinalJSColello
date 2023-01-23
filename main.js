
/////// Tienda Online ///////


// Loging usuario 
// (usuario: coder - password: 1234)

const botonLogIn = document.getElementById("botonLogIn");

const usuarioCoder = "coder";
const passwordCoder = 1234;

botonLogIn?.addEventListener("click", () => {
    Swal.fire({
        title: `Ingrese sus datos: (coder, 1234)`,
        html: 
        `<input type="text" id="usuarioIngresado" class="swal2-input" placeholder="Nombre de usuario">
        <input type="password" id="passwordIngresado" class="swal2-input" placeholder="Password">`, 
        confirmButtonText: `Enviar`,
        showCancelButton: true,
        cancelButton: `Cancelar`,
        focusConfirm: false,
    }).then ((result) => {
        if(result.isConfirmed) {
            const usuarioIngresado = document.getElementById("usuarioIngresado").value;
            const passwordIngresado = document.getElementById("passwordIngresado").value;
            Swal.fire({
                title: `Usuario confirmado`,
                icon: `success`,
                confirmButtonText: `Aceptar`,
            })
            if(usuarioIngresado == usuarioCoder && passwordIngresado == passwordCoder){
                window.location.href = 'index.html';
            }
        }
    })
})


// Cupón descuento con setTimeout 

setTimeout(() => {
    Swal.fire('Bienvenido! Usá el código: TIENDA20 para obtener un 20% de descuento en tu próxima compra.');
}, 8000);


// Productos dietética

class Producto {
    constructor (id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 1;
    }
}

const jugo = new Producto(1, "Jugo de Naranja", 560, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQePIhgqFIcP69TGgEKnL8CUNTM4wY4TJeOC0RK5O0bsYHo8Ar0v0Rdk7JyTTx68xmXLbpLOKY&usqp=CAE");

const almendras = new Producto(2, "Pasta de Almendras", 2900, "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRIDHx871RQJa3xwYlyCpOrYtjMOsEeReJ47CJkcUP88H4q-sLE5r9lJOoEMawBI-BHGJ6AlBg1&usqp=CAE");

const panqueques = new Producto(3, "Pancakes de Avena", 1400, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQQjEkjmqCraPn9aa8wrmZSRX2xi564l_hQXv6TveEqnA6XsK2Yl6XFFLnCBfJ4fSho93bmYh1M&usqp=CAE");

const yerba = new Producto(4, "Yerba Orgánica", 1200, "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQiO_rnQJIrCJ6fdr0421GBNTZecFhCddZkheVdqf_fKbuPIjaP-BJpz2jvH3tMOLlTVGeDGqE9OPU&usqp=CAE");

const coco = new Producto(5, "Aceite de Coco", 890, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRf2toMZTB1gAQ0iTsFPbm4gckoRXT_BfVX66ylsn45TNkNJ8-eaoeBjNR_kUy456tXfvmP68U&usqp=CAE");

const fideos = new Producto(6, "Fideos Integrales", 700, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRFVlvEGTXegEaJPiuIvJlYbC4s4xPMmC5XVdtJm7ueCDOkmd6XlTgCNVs-msyMMhEtlF17pAS7&usqp=CAE");

const bebida = new Producto(7, "Bebida de Coco", 450, "https://thefoodmarketar.vtexassets.com/arquivos/ids/155953-1200-auto?v=637825347398200000&width=1200&height=auto&aspect=true");

const vinagre = new Producto(8, "Vinagre de Manzana", 900, "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSAV0_q8pJ_hXqpgGPmxrLc5sR5TzOVEVnykzHbouWSugv0SAXWLe3XD23lg8ZSiC-KAXy1dsVr&usqp=CAE");


// Array del stock de productos

const productosDietetica = [jugo, almendras, panqueques, yerba, coco, fideos, bebida, vinagre];


// Array del carrito

let carritoCompras = [];


// Agregar localStorage de productos disponibles

const productosPrincipales = localStorage.setItem("productosDietetica", JSON.stringify(productosDietetica));


// Agregar carrito al localStorage

if(localStorage.getItem("carritoCompras")) {
    carritoCompras = JSON.parse(localStorage.getItem("carritoCompras"));
    console.log(carritoCompras);
}


// Almacenar carrito en el sessionStorage

sessionStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));


// DOM mostrar productos

const divProductos = document.getElementById("divProductos");


// Función para mostrar productos

const mostrarProductos = () => {
    productosDietetica.forEach( producto => {
        const cardProducto = document.createElement("div");
        cardProducto.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        cardProducto.innerHTML = 
                `
                <div class="card">
                    <img class="card-img-top imagenProductos" src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="card-body">
                        <h2>${producto.nombre}</h2>
                        <p>$ ${producto.precio}</p>
                        <button class="btn botonCarrito" id="boton${producto.id}">Agregar al carrito</button>
                    </div>
                </div>
                `
        divProductos.appendChild(cardProducto);

        // Agregar productos al carrito:

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarProductosCarrito(producto.id);
        })
    })
}
mostrarProductos();


// Crear funcion para agregar productos al carrito

const agregarProductosCarrito = (id) => {
    const productoEnCarrito = carritoCompras.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productosDietetica.find(producto => producto.id === id);
        carritoCompras.push(producto);
    }

    // localStorage
    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
    calcularTotal();
}


// Mostrar el carrito de compras

const contenedorCarritoCompras = document.getElementById("contenedorCarritoCompras");

const verCarritoCompras = document.getElementById("verCarritoCompras");

verCarritoCompras.addEventListener("click", () => {
    mostrarCarritoCompras();
})


// Función para mostrar el carrito

const mostrarCarritoCompras = () => {
    contenedorCarritoCompras.innerHTML = "";

    carritoCompras.forEach( producto => {
        const cardProducto = document.createElement("div");
        cardProducto.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        cardProducto.innerHTML = 
                `
                <div class="card">
                    <div class="card-body">
                        <h2>${producto.nombre}</h2>
                        <p>$ ${producto.precio}</p>
                        <p>Cantidad: ${producto.cantidad}</p>
                        <button class="btn botonCarrito" id="eliminar${producto.id}">Eliminar producto</button>
                    </div>
                </div>
                `
        contenedorCarritoCompras.appendChild(cardProducto);

        // Eliminar productos del carrito de compras
        
        const boton = document.getElementById(`eliminar${producto.id}`);
        
        boton.addEventListener("click", () => {
            eliminarProductoCarrito(producto.id);
            Swal.fire({
                title: `Estas seguro de eliminar el producto?`,
                icon: `warning`,
                confirmButtonText: `Aceptar`, 
                closeOnEsc: false,
            })
        })
    })
    calcularTotal();
}


// Funcion para eliminar productos del carrito de compras

const eliminarProductoCarrito = (id) => {
    const producto = carritoCompras.find(producto => producto.id === id);
    const indice = carritoCompras.indexOf(producto);
    carritoCompras.splice(indice, 1);
    mostrarCarritoCompras();

    // localStorage
    localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
}


// Vaciar el carrito de compras

const vaciarCarritoCompras = document.getElementById("vaciarCarritoCompras");

vaciarCarritoCompras.addEventListener("click", () => {
    eliminarCarritoCompleto();
})


// Función para eliminar el carrito de compras completo

const eliminarCarritoCompleto = () => {
    carritoCompras = [];
    mostrarCarritoCompras();

    // localStorage
    localStorage.clear();
}


// Mostrar el valor total de la compra

const valorTotalCompra = document.getElementById("valorTotalCompra");

const calcularTotal = () => {
    let totalCompra = 0;
    carritoCompras.forEach(producto => {
        totalCompra = totalCompra + producto.precio * producto.cantidad;
    })
    valorTotalCompra.innerHTML = `$ ${totalCompra}`;
}


// Sweet Alert: Finalizar compra

const botonCompra = document.getElementById("botonCompra");

botonCompra.addEventListener("click", () => {
    Swal.fire({
        title: 'Confirmar compra',
        showDenyButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Cancelar`,
        backdrop: `rgba(108, 14, 140, 0.313)`,
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Felicitaciones! Tu compra fue realizada con éxito!', '', 'success',)
        } else if (result.isDenied) {
            Swal.fire('Tu compra no fue realizada.', '', 'error')
        }
        })
})


// API otros usuarios registrados en la tienda online

const apiUsuario = 'https://fakestoreapi.com/users';

fetch(apiUsuario)
    .then(respuesta => respuesta.json())
    .then((datos) => {
        console.log(datos);
    })
    .catch(error => console.log(error))

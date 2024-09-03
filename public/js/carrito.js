const perfil = document.querySelector("#perfil")
const user = JSON.parse(localStorage.getItem('login_success')) || false
const carritoContainer = document.querySelector('#carrito')
let cantidadArticulosEnCarrito = parseInt(localStorage.getItem('cantidadArticulosEnCarrito')) || 0;
const productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || []

if(user){
    login.classList.add('disable')
    perfil.classList.remove('disable')
    carritoContainer.classList.remove('disable')
    document.querySelector('#carrito-numero').textContent = cantidadArticulosEnCarrito
}

function estadoDelCarrito(){
    let carrito = document.querySelector(".pago-container")
    let container = document.querySelector(".productos-section")
    if(productosCarrito.length == 0){
        carrito.classList.add('hiddenCarrito')
        container.classList.add('sinProductos')
    }
}

//Menu del perfil
function toggleMenu() {
    var menu = document.getElementById('opcionesMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

//Menu hamburguesa
function toggleMenuHamburguesa() {
    const navContainer = document.querySelector('.nav-container');
    navContainer.classList.toggle('open');
    const menuItems = document.querySelectorAll('.nav-container .ul li a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            navContainer.classList.remove('open');
        });
    });
}



function cardsProductos(){
    estadoDelCarrito()
    let cardsProductos = document.querySelector('#productosContainer')
    
    productosCarrito.forEach(product => {
        let card = document.createElement('article');
        card.classList.add('product-card')
        let cardInfo = agregarInfo(product)
        card.innerHTML = cardInfo
        cardsProductos.appendChild(card)
    });
}

cardsProductos()

function agregarInfo(product){
    let precio = Math.round(product.productoPrecio * 100)/100;
    return `
        <div class="product-image-container">
            <img src="img/productos/${product.id}.png" alt="">
        </div>
        <div class="product-details">
            <h3>${product.productoNombre}</h3>
            <p class="product-description">${product.productoDescripcion}</p>
            <p class="product-price">${'$ '+precio.toLocaleString("es") + ",00"}</p>
            <div class="product-btn">
                <span id="product-id" class="disable">${product.id}</span>
                <button id="boton" type="button">Eliminar del Carrito</button>
            </div>
        </div>`
}

let botones = document.querySelectorAll('#boton')

botones.forEach(boton => {
    boton.addEventListener('click', quitarDelCarrito);
});

function quitarDelCarrito(event){
    if(cantidadArticulosEnCarrito > 0){
        let card = event.target.parentNode.parentNode.parentNode
        let product = event.target.parentNode
        let productId = parseInt(product.querySelector('span').textContent) 

        let cardPago = document.querySelector(`#id-${productId}`).parentNode

        cantidadArticulosEnCarrito--
        document.querySelector('#carrito-numero').textContent = cantidadArticulosEnCarrito;
        localStorage.setItem('cantidadArticulosEnCarrito', cantidadArticulosEnCarrito);


        const productIndex = productosCarrito.findIndex(product => product.id === productId);
        
        productosCarrito.splice(productIndex, 1);
        localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito))
        card.remove()
        cardPago.remove()
    }
    estadoDelCarrito()
    actualizarTotalCarrito()
}

function agregarItemsAPago() {
    let pagoContenedor = document.querySelector('.pago-items-container')
    productosCarrito.forEach(product => {
        let cardPago = document.createElement('div');
        let precio = Math.round(product.productoPrecio * 100)/100;
        let cardInfo = `
            <span id="id-${product.id}" class="disable">${product.id}</span>
            <div class="carrito-item-detalles">
                <div class="carrito-info">
                    <span class="carrito-item-titulo">${product.productoNombre}</span>
                    <span class="carrito-item-precio">${'$'+precio.toLocaleString("es") + ",00"}</span>
                </div>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="${product.cantidad}" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
            </div>
        `
        cardPago.innerHTML = cardInfo
        pagoContenedor.appendChild(cardPago)

        //Agregmos al funcionalidad restar cantidad del nuevo item
        let botonRestarCantidad = cardPago.getElementsByClassName('restar-cantidad')[0];
        botonRestarCantidad.addEventListener('click',restarCantidad);

        //Agregamos la funcionalidad sumar cantidad del nuevo item
        let botonSumarCantidad = cardPago.getElementsByClassName('sumar-cantidad')[0];
        botonSumarCantidad.addEventListener('click',sumarCantidad);
    });
    actualizarTotalCarrito()
}

//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    let card = event.target.parentNode.parentNode.parentNode
    let productId = parseInt(card.querySelector('span').textContent) 
    let indexProducto = productosCarrito.findIndex(producto => producto.id === productId);
    productosCarrito[indexProducto].cantidad += 1;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        let card = event.target.parentNode.parentNode.parentNode
        let productId = parseInt(card.querySelector('span').textContent) 
        let indexProducto = productosCarrito.findIndex(producto => producto.id === productId);
        productosCarrito[indexProducto].cantidad -= 1;
        actualizarTotalCarrito();
    }
}

//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    let total = 0;
    productosCarrito.forEach(product => {
        // let cardPago = document.querySelector(`#id-${product.id}`).parentNode
        // let cantidad = cardPago.getElementsByClassName('carrito-item-cantidad')[0].value;
        total += (product.productoPrecio * product.cantidad)
    })
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";
}

agregarItemsAPago()

// Mensaje de compra realizada
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-pagar');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            Swal.fire({
                title: "Finalizando tu compra!",
                html: "Por favor espera...",
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                const Toast = Swal.mixin({
                    toast: false,
                    position: "center",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                Toast.fire({
                    icon: "success",
                    title: '¡Compra Realizada Exitosamente!',
                });
            });
        });
    });
});

// sweet alert para eliminar producto al carrito
document.addEventListener('DOMContentLoaded', () => { 

    const buttons = document.querySelectorAll('.productos-container');

    // Itera sobre cada botón y agrega un evento de clic
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });
            Toast.fire({
                icon: "error",
                title: 'Producto eliminado del carrito',
            });
        });
    });
});
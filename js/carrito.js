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
console.log(user);
console.log(productosCarrito);




function cardsProductos(){
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
    return `
        <img src="img/tarjeta1.jpeg" alt="">
        <div class="product-details">
            <h3>${product.productoNombre}</h3>
            <p>${product.productoDescripcion}</p>
            <p class="product-price">${product.productoPrecio}</p>
            <div class="product-btn">
                <span class="disable">${product.id}</span>
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
        console.log(card);
        cantidadArticulosEnCarrito--
        document.querySelector('#carrito-numero').textContent = cantidadArticulosEnCarrito;
        localStorage.setItem('cantidadArticulosEnCarrito', cantidadArticulosEnCarrito);


        const productIndex = productosCarrito.findIndex(product => product.id === productId);
        console.log(productIndex);
        productosCarrito.splice(productIndex, 1);
        localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito))
        card.classList.add('hidden')
    }

    //agregar lo de los precios
}
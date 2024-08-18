//Obtenemos el boton de login
const login = document.querySelector("#login")

//Redirigimos a la pagina de login
login.addEventListener('click', () => {
    window.location.href = 'login.html'
})

const perfil = document.querySelector("#perfil") // Boton de Perfil
const user = JSON.parse(localStorage.getItem('login_success')) || false //Usuarios dentro del localStorage

const carritoContainer = document.querySelector('#carrito') //Boton del carrito

let cantidadArticulosEnCarrito = parseInt(localStorage.getItem('cantidadArticulosEnCarrito')) || 0; // Cantidad de productos
const productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [] //Inforamcion de los productos dentro del localStorage

//Validacion del login
if(user){
    login.classList.add('disable')
    perfil.classList.remove('disable')
    carritoContainer.classList.remove('disable')
    document.querySelector('#carrito-numero').textContent = cantidadArticulosEnCarrito
}

//boton del logout
const logout = document.querySelector('#logout')

//validaciones del logout
logout.addEventListener('click', () => {
    Swal.fire({
        icon: 'info',
        title: 'Cerrar Sesion',
        text: 'Estas seguro de que quieres cerra sesion?',
        showCancelButton: true,
        confirmButtomText: 'Si, cerrar sesion',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false
    }).then((result) => {
        if(result.isConfirmed){
            localStorage.removeItem('login_success')

            Swal.fire({
                icon: 'success',
                title: 'Sesion Cerrada',
                text: 'Tu sesion ha sido cerrada correctamente',
                confirmButtomText: 'OK',
                allowOutsideClick: false
            }).then(() => {
                login.classList.remove('disable')
                perfil.classList.add('disable')
                carritoContainer.classList.add('disable')
            })
        }
    })
})

//Menu del perfil
function toggleMenu() {
    var menu = document.getElementById('opcionesMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/productosDestacados')
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error en la solicitud: ${response.status}`);
                
            }
            return response.json();
        })
        .then(data => {
            console.log('Productos destacados:', data.productos);
            const productosDiv = document.querySelector('.product-container');
            if (data.productos.length > 0) {
                data.productos.forEach(producto => {
                    const productoElement = document.createElement('article');
                    productoElement.classList.add('product-card');
                    let cardInfo = agregarCardDestacados(producto)
                    productoElement.innerHTML = cardInfo
                    productosDiv.appendChild(productoElement)
                });
            } else {
                productosDiv.innerHTML = '<p>No se encontraron productos en esta categoría.</p>';
            }
        })
        .catch(error => {
            console.error('Error al obtener los productos destacados:', error);
        });
});

function agregarCardDestacados(product){
    let precio = Math.round(product.precio * 100)/100;
    
    return `
        <div class="product-image-container">
            <img src="img/productos/${product.id_producto}.png" alt="">
        </div>
        <div class="product-details">
            <h3>${product.nombre}</h3>
            <p class="product-description">${product.descripcion}</p>
            <p class="product-price">${'$ '+precio.toLocaleString("es") + ",00"}</p>
            <div class="product-btn">
                <span id="product-id" class="disable">${product.id_producto}</span>
                <button id="boton" type="button">Añadir al Carrito</button>
            </div>
        </div>`
}


const categoriaButtons = document.querySelectorAll('.categoria-btn');

categoriaButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Evita la acción predeterminada del enlace

        const categoria = button.getAttribute('data-categoria');
        console.log(`Categoría seleccionada: ${categoria}`);

        // Cambia la URL y redirige a productos.html con el parámetro de categoría
        window.location.href = `/productos?categoria=${categoria}`;
    });
});


//Botones de las cards de productos

let contenedor = document.querySelector('.product-container');

contenedor.addEventListener('click', function(event) {
    // Verifica si el elemento clickeado es un botón
    if (event.target && event.target.id === 'boton') {
        agregarACarrito(event);
    }
});

// let contenedorCategoria = document.querySelector('#productosCategoria');

// contenedorCategoria.addEventListener('click', function(event) {
//     // Verifica si el elemento clickeado es un botón
//     if (event.target && event.target.id === 'boton') {
//         console.log("aqui click en index");
        
//         agregarACarrito(event);
//     }
// });

// Funcion para agregar al carrito
function agregarACarrito(event) {

    let boton = event.target
    let productoInfo = boton.closest('.product-details')
    let id = parseInt(productoInfo.querySelector('#product-id').textContent)
    // let productoExistente = productosCarrito.find(producto => producto.id === id);

    // if (productoExistente) {
    //     console.log("Producto ya agregado al carrito");
        
    // }

    let indexProductoExistente = productosCarrito.findIndex(producto => producto.id === id);

    if (indexProductoExistente !== -1) {
        productosCarrito[indexProductoExistente].cantidad += 1;
        
    } else {
        
        //Seleccion de la informacion de la card
        let productoNombre = productoInfo.querySelector('h3').textContent
        let productoDescripcion = productoInfo.querySelector('p').textContent
        let productoPrecio = productoInfo.querySelector('.product-price').textContent

        //Quitar formato al precio
        let precioSinSimbolo = productoPrecio.replace('$', '').trim();
        let precioSinPuntos = precioSinSimbolo.replace(/\./g, '');
        let precioSinDecimales = precioSinPuntos.replace(',00', '');
        productoPrecio = parseInt(precioSinDecimales, 10);
        
        cantidadArticulosEnCarrito++
        let cantidad = 1;
        productosCarrito.push({id,cantidad,productoNombre,productoDescripcion,productoPrecio})
    }
    //Envio de inforamcion al localStorage
    localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
    document.querySelector('#carrito-numero').textContent = cantidadArticulosEnCarrito
    localStorage.setItem('cantidadArticulosEnCarrito', cantidadArticulosEnCarrito);
}

let sliderInner = document.querySelector(".slider-inner");
let images = document.querySelectorAll(".slider-image");
let index = 1;
setInterval(function(){
    let percentage = index * -100;
    sliderInner.style.transform = `translateX(${percentage}%`
        index++
    if(index > (images.length-1)){
        index = 0;
    }
},5000)
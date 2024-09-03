//Obtenemos el boton de login
const login = document.querySelector("#login")

//Redirigimos a la pagina de login
login.addEventListener('click', () => {
    window.location.href = 'login.html'
})

const perfil = document.querySelector("#perfil") // Boton de Perfil
const user = JSON.parse(localStorage.getItem('login_success')) || false //Usuarios dentro del localStorage

const carritoContainer = document.querySelector('#carrito') //Boton del carrito

let cantidadArticulosEnCarritoCategoria = parseInt(localStorage.getItem('cantidadArticulosEnCarrito')) || 0; // Cantidad de productos
const productosCarritoCategoria = JSON.parse(localStorage.getItem('productosCarrito')) || [] //Inforamcion de los productos dentro del localStorage

//Validacion del login
if(user){
    login.classList.add('disable')
    perfil.classList.remove('disable')
    carritoContainer.classList.remove('disable')
    document.querySelector('#carrito-numero').textContent = cantidadArticulosEnCarritoCategoria
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






// Este bloque se ejecuta cuando la página productos.html se carga
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');

    if (categoria) {
        console.log("Consultando productos para la categoría:", categoria);

        fetch(`/productos/data?categoria=${categoria}`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos:", data);
            const productosDiv = document.getElementById('productosCategoria');
            
            if (data.productos.length > 0) {
                data.productos.forEach(producto => {
                    const productoElement = document.createElement('article');
                    productoElement.classList.add('product-card');
                    let cardInfo = agregarInfo(producto)
                    productoElement.innerHTML = cardInfo
                    productosDiv.appendChild(productoElement)
                });
            } else {
                productosDiv.innerHTML = '<p>No se encontraron productos en esta categoría.</p>';
            }
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
    } else {
        console.error('No se ha proporcionado categoría en la URL');
    }
});

function agregarInfo(product){
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

let contenedorCategoria = document.querySelector('#productosCategoria');

contenedorCategoria.addEventListener('click', function(event) {
    // Verifica si el elemento clickeado es un botón
    if (event.target && event.target.id === 'boton') {
        console.log("aqui click en index");
        
        agregarACarritoCategoria(event);
    }
});

function agregarACarritoCategoria(event) {

    let boton = event.target
    let productoInfo = boton.closest('.product-details')
    let id = parseInt(productoInfo.querySelector('#product-id').textContent) 


    let indexProductoExistente = productosCarritoCategoria.findIndex(producto => producto.id === id);

    if (indexProductoExistente !== -1) {
        productosCarritoCategoria[indexProductoExistente].cantidad += 1;
        
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
        
        cantidadArticulosEnCarritoCategoria++
        let cantidad = 1;
        productosCarritoCategoria.push({id,cantidad,productoNombre,productoDescripcion,productoPrecio})
    }
    //Envio de inforamcion al localStorage
    localStorage.setItem('productosCarrito', JSON.stringify(productosCarritoCategoria));
    document.querySelector('#carrito-numero').textContent = cantidadArticulosEnCarritoCategoria
    localStorage.setItem('cantidadArticulosEnCarrito', cantidadArticulosEnCarritoCategoria);
}

//Cuadro de mensaje del producto agragado
document.addEventListener('DOMContentLoaded', () => { 

    const buttons = document.querySelectorAll('#productosCategoria');

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
                icon: "success",
                title: 'Producto agregado al carrito',
            });
        });
    });
});
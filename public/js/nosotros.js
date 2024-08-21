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

// Informacion de nosotros

document.addEventListener('DOMContentLoaded', () => {
    fetch('/nosotrosData', {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response =>{
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Datos recibidos:", data);
        const integrantesDiv = document.querySelector('.integrantes-container');
        
        if (data.integrantes.length > 0) {
            let temp = data.integrantes[0];
            data.integrantes[0] = data.integrantes[1];
            data.integrantes[1] = temp;
            data.integrantes.forEach(integrante => {
                const integranteElement = document.createElement('article');
                integranteElement.classList.add('card-container');
                let cardInfo = agregarDatosIntegrante(integrante)
                integranteElement.innerHTML = cardInfo
                integrantesDiv.appendChild(integranteElement)
            });
        } else {
            integrantesDiv.innerHTML = '<p>No se encontraron productos en esta categoría.</p>';
        }
    })
    .catch(error => {
        console.error('Error al obtener los productos:', error);
    });
});

function agregarDatosIntegrante(integrante){
    return `
            <div class="card-img-container">
                <div class="card-img">
                    <img src="/img/I${integrante.id_administrador}.png" alt="">
                </div>
                <div class="circulo1"></div>
                <div class="circulo2"></div>
            </div>
            <div class="card-info-container">
                <h3>${integrante.nombre} ${integrante.apellido}</h3>
                <p>${integrante.cargo}</p>
                <div class="card-redes-container">
                    <a href="#github">
                        <svg width="25" height="25" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z"></path>
                        </svg>
                    </a>
                    <a href="#linkedin">
                        <svg width="25" height="25" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715h-.001ZM7.003 8.575a1.546 1.546 0 0 1-1.287-2.409 1.548 1.548 0 1 1 1.286 2.409h.001Zm1.336 9.764H5.666V9.75H8.34v8.589h-.001ZM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.004Z"></path>
                        </svg>
                    </a>
                    <a href="#Whatsapp">
                        <svg width="25" height="25" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m7.253 18.494.724.423A7.953 7.953 0 0 0 12 20a8 8 0 1 0-6.916-3.976l.422.724-.653 2.401 2.4-.655ZM2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.953 9.953 0 0 1-5.03-1.355L2.004 22ZM8.391 7.308c.134-.01.269-.01.403-.004.054.004.108.01.162.016.159.018.334.115.393.249.298.676.588 1.357.868 2.04.062.152.025.347-.093.537a4.372 4.372 0 0 1-.263.372c-.113.145-.356.411-.356.411s-.099.118-.061.265c.014.056.06.137.102.205l.059.095c.256.427.6.86 1.02 1.268.12.116.237.235.363.346.468.413.998.75 1.57 1l.005.002c.085.037.128.057.252.11.062.026.126.049.191.066a.35.35 0 0 0 .367-.13c.724-.877.79-.934.796-.934v.002a.482.482 0 0 1 .378-.127c.06.004.121.015.177.04.531.243 1.4.622 1.4.622l.582.261c.098.047.187.158.19.265.004.067.01.175-.013.373-.032.259-.11.57-.188.733a1.155 1.155 0 0 1-.21.302 2.38 2.38 0 0 1-.33.288l-.125.09a5.044 5.044 0 0 1-.383.22 1.989 1.989 0 0 1-.833.23c-.185.01-.37.024-.556.014-.008 0-.568-.087-.568-.087a9.448 9.448 0 0 1-3.84-2.046c-.226-.199-.435-.413-.649-.626-.89-.885-1.562-1.84-1.97-2.742A3.47 3.47 0 0 1 6.9 9.62a2.729 2.729 0 0 1 .564-1.68c.073-.094.142-.192.261-.305.127-.12.207-.184.294-.228a.961.961 0 0 1 .371-.1l.001.001Z"></path>
                        </svg>
                    </a>
                </div>
            </div>`
}
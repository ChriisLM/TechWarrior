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
            const productosDiv = document.getElementById('productos');
            
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
                <span class="disable">${product.id_producto}</span>
                <button id="boton" type="button">Añadir al Carrito</button>
            </div>
        </div>`
}
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
                    const productoElement = document.createElement('div');
                    productoElement.className = 'producto';
                    productoElement.innerHTML = `
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <p>Precio: $${producto.precio}</p>
                    `;
                    productosDiv.appendChild(productoElement);
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



// const categoriaButtons = document.querySelectorAll('.categoria-btn');


// categoriaButtons.forEach(button => {
//     button.addEventListener('click', (event) => {

//         const categoria = button.getAttribute('data-categoria');
//         console.log(categoria);
//         console.log(`/productos?categoria=${categoria}`);

//         // Cambia la URL y redirige a productos.html con el parámetro de categoría
//         window.location.href = `/productos?categoria=${categoria}`;
//         if (categoria) {
//             console.log("AQUI SI SE EJECUTO");
            
//             fetch(`/productos/data?categoria=${categoria}`, {
//                 headers: {
//                     'X-Requested-With': 'XMLHttpRequest' // Marca esta solicitud como AJAX
//                 }
//             })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error(`Error en la solicitud: ${response.status}`);
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     console.log("Datos recibidos:", data);
//                     // Aquí puedes manejar la data para mostrar los productos en la página
            
//                 })
//                 .catch(error => {
//                     console.error('Error en el fetch:', error);
//                 });
//         } else {
//             console.error('No se ha proporcionado categoría en la URL');
//         }
//     });
// });

// Asegúrate de que haya un valor de categoría
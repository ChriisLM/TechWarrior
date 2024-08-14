const categoriaButtons = document.querySelectorAll('.categoria-btn');


categoriaButtons.forEach(button => {
    button.addEventListener('click', (event) => {

        const categoria = button.getAttribute('data-categoria');
        console.log(categoria);
        console.log(`/productos?categoria=${categoria}`);

        // Cambia la URL y redirige a productos.html con el parámetro de categoría
        window.location.href = `/productos?categoria=${categoria}`;
        if (categoria) {
            console.log("AQUI SI SE EJECUTO");
            
            fetch(`/productos/?categoria=${categoria}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest' // Marca esta solicitud como AJAX
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
                    // Aquí puedes manejar la data para mostrar los productos en la página
            
                })
                .catch(error => {
                    console.error('Error en el fetch:', error);
                });
        } else {
            console.error('No se ha proporcionado categoría en la URL');
        }
    });
});

// Asegúrate de que haya un valor de categoría
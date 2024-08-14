const express = require('express');
const router = express.Router();

// const categoriaglobal = 0

// const categoriaButtons = document.querySelectorAll('.categoria-btn');

// categoriaButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         categoriaglobal = button.getAttribute('data-categoria');
//         parseInt(categoriaglobal)
//         console.log(`/productos/${categoria}`);
        
//         fetch(`/productos/${categoria}`)
//             .then(response => response.text()) 
//             .then(data => {
//                 console.log(data);
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     });
// });


router.get('/', (req, res) => {
    const categoria = 1
    const query = 'SELECT * FROM producto WHERE id_categoria = ?';

    req.db.query(query, [categoria], (err, results) => {
        if (err) {
            console.error('Error en la consulta de productos:', err);
            return res.status(500).send('Error en la consulta de productos');
        }

        // Mostrar los resultados en la consola
        console.log('Productos en la categoría:', categoria);
        console.log(results);

        // Enviar una respuesta simple al cliente
        res.send('Consulta completada. Revisa la consola para ver los resultados.');
    });
});

module.exports = router;
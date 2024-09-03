const express = require('express')
const path = require('path');
const router = express.Router();


// Ruta para manejar la consulta de productos con la categoría
router.get('/data', (req, res) => {
    const categoriaId = parseInt(req.query.categoria) || 1; // Valor por defecto 1
    
    // Primero, obtenemos el nombre de la categoría usando el ID
    const categoriaQuery = 'SELECT nombre FROM categoria WHERE id_categoria = ?';
    req.db.query(categoriaQuery, [categoriaId], (err, categoriaResult) => {
        if (err) {
            console.error('Error en la consulta de la categoría:', err);
            return res.status(500).send('Error en la consulta de la categoría');
        }

        if (categoriaResult.length === 0) {
            return res.status(404).send('Categoría no encontrada');
        }

        const categoriaNombre = categoriaResult[0].nombre;

        // Luego, obtenemos los productos que pertenecen a esa categoría
        const productosQuery = 'SELECT * FROM producto WHERE id_categoria = ?';
        req.db.query(productosQuery, [categoriaId], (err, productosResult) => {
            if (err) {
                console.error('Error en la consulta de productos:', err);
                return res.status(500).send('Error en la consulta de productos');
            }

            // Ahora que tenemos tanto los productos como el nombre de la categoría,
            // enviamos la respuesta al cliente.
            const response = { productos: productosResult, categoriaNombre: categoriaNombre };
            res.json(response);
        });
    });
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../productos.html'));  // Ajusta la ruta según tu estructura
});

module.exports = router;
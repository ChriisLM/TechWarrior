const express = require('express')
const path = require('path');
const router = express.Router();

router.get('/productosDestacados', (req, res) => {
    const ids = [6, 21, 20, 23]; // Los cuatro IDs de los productos destacados
    let productosDestacados = [];

    const query = 'SELECT * FROM producto WHERE id_producto = ?';
    
    // Consulta para cada ID
    for (let i = 0; i < ids.length; i++) {
        req.db.query(query, [ids[i]], (err, result) => {
            
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).send('Error en la consulta de productos destacados');
            }

            if (result.length > 0) {
                productosDestacados.push(result[0]);
            }

            // Cuando se complete la última consulta, se envían los resultados
            if (i === ids.length - 1) {
                const response = { productos: productosDestacados}
                res.json(response);
            }
        });
    }
    
});

module.exports = router;
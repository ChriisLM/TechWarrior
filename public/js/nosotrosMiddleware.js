const express = require('express')
const path = require('path');
const router = express.Router();


// Ruta para manejar la consulta de productos con la categoría
router.get('/nosotrosData', (req, res) => {
    
    // Primero, obtenemos el nombre de la categoría usando el ID
    const categoriaQuery = 'SELECT * FROM administradores';
    req.db.query(categoriaQuery, (err, integrantesResult) => {
        if (err) {
            console.error('Error en la consulta de la categoría:', err);
            return res.status(500).send('Error en la consulta de la categoría');
        }

        const response = { integrantes: integrantesResult };
        res.json(response);
    });
});

module.exports = router;
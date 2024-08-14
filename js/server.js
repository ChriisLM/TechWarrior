const express = require('express');
const path = require('path');
const productosRouter = require('../js/productos');
const app = express();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//Conectccion a ala base de datos
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'techwarrior'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa.');
});


app.use(express.static('public'));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.use('/productos', productosRouter);

app.get('/productos', (req, res) => {
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


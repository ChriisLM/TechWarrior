const express = require('express');
const path = require('path');
const productosRouter = require('./productosmiddleware');
const productosDestacadosRouter = require('./indexMiddleware');
const nosotrosRouter = require('./nosotrosMiddleware');
const app = express();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//Coneccion a la base de datos
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

app.use((req, res, next) => {
    req.db = connection;
    next();
});


app.use(express.static('public'));

//Enrutamiento

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname, "../login.html"));
});
app.get("/carrito", (req,res) => {
    res.sendFile(path.join(__dirname, "../carrito.html"));
});
app.get("/nosotros", (req,res) => {
    res.sendFile(path.join(__dirname, "../nosotros.html"));
});
app.get("/register", (req,res) => {
    res.sendFile(path.join(__dirname, "../signup.html"));
});
app.get("/contacto", (req,res) => {
    res.sendFile(path.join(__dirname, "../contacto.html"));
});


app.use('/productos', productosRouter);
app.use(productosDestacadosRouter);
app.use(nosotrosRouter);
// app.use('/productosDestacados', productosDestacadosRouter);

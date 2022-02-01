# ProyMongo
Creamos la carpeta config y dentro el archivo keys.js con el user y password que he creado en mongo:
Conexión a la BD, creamos un archivo index.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { MONGO_URI } = require("./config/keys");
const PORT = 3000;

app.use(express.json());

mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("conectado a mongoDB con éxito"))
  .catch((err) => console.error(err));

app.listen(PORT, console.log(`Server started on port ${PORT}`));

Creamos una carpeta models para nuestros modulos: con el archivo Product.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

Controlador Product con su carpeta y archivo:

const Product = require("../models/Product");

const ProductController ={
    async create(req,res){
        try {
            const product = await Product.create({...req.body })
            res.status(201).send(product)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el producto' })
        }
    },
}
module.exports = ProductController;

Ruta Productos con su carpeta y archivo.

const express = require('express');
const router = express.Router()
const ProductController = require('../controllers/ProductController');

router.post('/',ProductController.create)

module.exports = router;

Importamos la ruta al index

const express = require('express');
const app = express();
const PORT = 3000

app.use(express.json())

app.use('/products', require('./routes/products'));

app.listen(PORT, () => console.log('servidor levantado en el puerto' + PORT))
Controlador Product Ahora crearemos un nuevo método que nos traerá todos los productos:
const Product = require("../models/Product");
Ruta Products
router.get('/', ProductController.getAll)

Controlador Product por id, creamos un método que nos trae el producto por su id
Rutas Products
router.get('/id/:_id',ProductController.getById)
Delete findByIdAndDelete()
router.delete('/:_id',ProductController.delete)
Update
Rutas Products
router.put('/:_id', ProductController.update)

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { MONGO_URI } = require("./config/keys");
const PORT = 3000;

app.use(express.json());
app.use('/products',require('./routes/products'));

mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("conectado a mongoDB con éxito"))
  .catch((err) => console.error(err));

app.listen(PORT, console.log(`Server started on port ${PORT}`));
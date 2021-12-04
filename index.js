require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.Router());
const port = 7227;

const productRoutes = require("./routes/Product");
app.use('/product', productRoutes)

const companyRoutes = require("./routes/Company");
app.use('/company', companyRoutes)

const sallerRoutes = require("./routes/Saller");
app.use('/saller', sallerRoutes)
mongoose
    .connect(process.env.MONGOURL)
    .then(() => console.log("MongoDB connected successfully"))

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
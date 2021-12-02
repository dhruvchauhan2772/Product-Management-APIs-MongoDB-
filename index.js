/** Create nodemon for connected server continue mode using "npm -i nodemon" and after that type nodemon index.js */

/** Include .env [Enviornment File]. It will create using "npm -i dotwnv" */
require("dotenv").config();

/** Include express js */
const express = require('express');

/** Include mongoose. For using MongoDB. It will create using "npm -i mongoose*/
const mongoose = require('mongoose');

/** Create app as express variable */
const app = express();

/** Use json file using "app" constant */
app.use(express.json());
app.use(express.Router());

/** Store Port for server on constant */
const port = 3000;



/** Use Product route */
const productRoutes = require("./routes/Product");
app.use('/product', productRoutes)

/** Use Company route */
const companyRoutes = require("./routes/Company");
app.use('/company', companyRoutes)

/** Use Saller route */
const sallerRoutes = require("./routes/Saller");
app.use('/saller', sallerRoutes)




/** MongoDB Connection */
mongoose
    .connect(process.env.MONGOURL)
    .then(() => console.log("MongoDB connected successfully"))

app.get('/', (req, res) => res.send('Hello World!'))

/** Allocate port for server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
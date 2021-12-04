const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    productid: String,
    title: String,
    price: String,
    category: Array,
    companyid: String,
    sellerid: Array
});
const productModel = mongoose.model("product", productSchema, "product");
module.exports = productModel;
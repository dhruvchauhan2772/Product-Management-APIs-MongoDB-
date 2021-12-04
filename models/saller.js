const mongoose = require('mongoose');
const sallerSchema = mongoose.Schema({
    sallerid: String,
    name: String,
    productid: Array
});
const sallerModel = mongoose.model("saller", sallerSchema, "saller");
module.exports = sallerModel;
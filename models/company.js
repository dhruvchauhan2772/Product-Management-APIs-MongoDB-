const mongoose = require('mongoose');
const companySchema = mongoose.Schema({
    companyid: String,
    name: String,
    productid: Array
});
const companyModel = mongoose.model("company", companySchema, "company");
module.exports = companyModel;
const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router()
router.use(express.json());
const sallerModel = require("../models/saller");
const productModel = require("../models/product");
router.get("/", async(req, res) => {
    const sallerList = await sallerModel.find();
    if (sallerList.length === 0) {
        return res.json({ message: "No data found on Saller" })
    }
    return res.json({ data: sallerList });
});
router.post("/", (req, res) => {
    const newsaller = req.body;
    sallerModel.create(newsaller);
    return res.json({ message: "Saller add successfully" });
});
router.get("/:name", async(req, res) => {
    const name = req.params.name
    const productModel = require("../models/product");
    const index = await productModel.find({ title: name });
    if (index.length < 1) {
        return res.json({ message: "Sorry No data found by name of ${name}" })
    }
    const a = []
    var id = index[0].sellerid
    for (var i = 0; i < id.length; i++) {
        const sallerIndex = await sallerModel.find({ sallerid: id[i] })
        a.push(sallerIndex)
    }
    res.json({ a })
});
router.get("/product/all", async(req, res) => {
    const sallerList = await sallerModel.find();
    if (sallerList.length === 0) {
        return res.json({ message: "No data found on Saller" })
    }
    const jsonOutput = []
    for (var i = 0; i < sallerList.length; i++) {
        productName = []
        var countProduct = sallerList[i].productid;
        for (var j = 0; j < countProduct.length; j++) {
            const productList = await productModel.find({ "productid": countProduct[j] })
            productName[j] = productList[0].title;
        }
        jsonOutput.push({
            "Saller Name": sallerList[i].name,
            "Product Name": productName
        })
    }
    return res.json({ jsonOutput });
});
router.put("/:name", async(req, res) => {
    const name = req.params.name;
    const ids = req.body.productid;
    const sallerList = await sallerModel.find({ "name": name })

    if (sallerList.length < 1) {
        return res.json({ "Message": "Sorry no data found of company name " + name })
    }
    sallerModel.findByIdAndUpdate(sallerList[0]._id, { productid: ids }, function(err, docs) {
        if (err) {
            log(err);
        } else {
            res.json({ "Updated Data : ": docs });
        }
    });
})
router.delete("/:name", async(req, res) => {
    const name = req.params.name;
    sallerModel.deleteMany({ "name": name }).then(function() {
        console.log("Data deleted");
        return res.send("Data deleted");
    }).catch(function(error) {
        console.log(error);
        return res.send(error);
    });
});
module.exports = router
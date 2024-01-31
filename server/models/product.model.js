const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productPicture: String, 
    productName: String,
    productDescription: String,
    productPrice: Number,
    productQuantity: Number,
    categoryName: String,
    subcategoryName: String
})

const productModel = new mongoose.model("product", productSchema)
module.exports = productModel;
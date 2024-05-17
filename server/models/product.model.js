const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productStripeProductId: String,
    productStripePriceId: String,
    productPicture: String, 
    productName: String,
    productDescription: String,
    productPrice: Number,
    productQuantity: Number,
    categoryName: String,
    subcategoryName: String
}, { timestamps: true })

const productModel = new mongoose.model("product", productSchema)
module.exports = productModel;
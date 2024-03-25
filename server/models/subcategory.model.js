const mongoose = require("mongoose")

const subcategorySchema = new mongoose.Schema({
    subcategoryName: String,
    categoryName: String
}, { timestamps: true })

const subcategoryModel = new mongoose.model("subcategorie", subcategorySchema)
module.exports = subcategoryModel
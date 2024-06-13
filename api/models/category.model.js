const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryName: String,
    categoryDescription: String
}, { timestamps: true })

const categoryModel = mongoose.model("Category", categorySchema)
module.exports = categoryModel
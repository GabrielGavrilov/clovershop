const Category = require("../models/category.model")
const Subcategory = require("../models/subcategory.model")
const Product = require("../models/product.model")

async function listAllCategories(req, res) {
    const categories = await Category.find({})
    return res.json(categories)
}

async function listCategoryInformation(req, res) {
    const { categoryName } = req.body
    const category = await Category.findOne({categoryName: categoryName})
    return res.json(category)
}

async function listAllSubcategoriesInCategory(req, res) {
    const { categoryName } = req.body
    const subcategories = await Subcategory.find({categoryName: categoryName})
    return res.json(subcategories)
}

async function listAllProductsInCategory(req, res) {
    const { categoryName } = req.body
    const products = await Product.find({categoryName: categoryName})
    return res.json(products)
}

async function listAllProductsInSubcategory(req, res) {
    const { categoryName, subcategoryName } = req.body
    const products = await Product.find({categoryName: categoryName, subcategoryName: subcategoryName})
    return res.json(products)
}

async function listProductInformation(req, res) {
    const { categoryName, productId } = req.body
    const product = await Product.findOne({categoryName: categoryName, _id: productId})
    console.log(product)
}

module.exports = {
    listAllCategories,
    listCategoryInformation,
    listAllSubcategoriesInCategory,
    listAllProductsInCategory,
    listAllProductsInSubcategory,
    listProductInformation
}
const Category = require("../models/category.model")
const Subcategory = require("../models/subcategory.model")
const Product = require("../models/product.model")

/**
 * Category Controllers
 */
async function listAllCategories(req, res) {
    const categories = await Category.find({})
    return res.json(categories)
}

async function listCategoryInformation(req, res) {
    const { categoryName } = req.body
    const category = await Category.findOne({categoryName: categoryName})
    
    if(category)
        return res.json(category)
    else 
        return res.json({status: 404})
}

async function listCategoryInformationById(req, res) {
    const categoryId = req.params.categoryId
    const category = await Category.findOne({_id: categoryId})

    if(category)
        return res.json(category)
    else
        return res.json({status: 404})
}

async function listAllSubcategoriesInCategory(req, res) {
    const { categoryName } = req.body
    const subcategories = await Subcategory.find({categoryName: categoryName}).sort({date: -1})
    
    return res.json(subcategories)
}

async function listAllProductsInCategory(req, res) {
    const { categoryName } = req.body
    const products = await Product.find({categoryName: categoryName}).sort({date: -1})
    
    return res.json(products)
}

/**
 * Subcategory Controllers
 */

async function listAllSubcategories(req, res) {
    const subcategories = await Subcategory.find({}).sort({date: -1})

    return res.json(subcategories)
}

async function listSubcategoryInformationById(req, res) {
    const subcategoryId = req.params.subcategoryId
    const subcategory = await Subcategory.findOne({_id: subcategoryId})

    return res.json(subcategory);
}

async function listAllProductsInSubcategory(req, res) {
    const { categoryName, subcategoryName } = req.body
    const products = await Product.find({categoryName: categoryName, subcategoryName: subcategoryName}).sort({date: -1})
    
    return res.json(products)
}

/**
 * Product Controllers
 */

async function listAllProducts(req, res) {
    const products = await Product.find({}).sort({date: -1})
    
    return res.json(products)
}

async function listProductInformationByName(req, res) {
    const { categoryName, productName } = req.body
    const product = await Product.findOne({categoryName: categoryName, productName: productName})
    
    if(product)
        return res.json(product)
    else
        return res.json({status: 404})
}

async function listProductInformationById(req, res) {
    const product = await Product.findOne({_id: req.params.productId})

    if(product)
        return res.json(product)
    else 
        return res.json({status: 404})
}

module.exports = {
    listAllCategories,
    listAllProducts,
    listAllSubcategories,
    listCategoryInformation,
    listCategoryInformationById,
    listAllSubcategoriesInCategory,
    listSubcategoryInformationById,
    listAllProductsInCategory,
    listAllProductsInSubcategory,
    listProductInformationById,
    listProductInformationByName
}
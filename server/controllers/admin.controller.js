const jwt = require("jsonwebtoken")
const config = require("../devconfig")
const Category = require("../models/category.model")
const Subcategory = require("../models/subcategory.model")
const Product = require("../models/product.model")

async function createNewCategory(req, res) {
    try {
        const { categoryName, categoryDescription } = req.body
        const cookie = req.cookies["jwt"]
        // console.log(cookie)
        const auth = jwt.verify(cookie, config.SECRET_KEY)
        const categoryExists = await Category.findOne({categoryName: categoryName})

        if(!auth) {
            return res.json({status: "Access denied."})
        }

        if(categoryExists) {
            return res.json({status: `Category with the name ${categoryName} already exists.`})
        }

        const category = new Category({
            categoryName: categoryName,
            categoryDescription: categoryDescription
        })

        await category.save()
        .then(function() {
            console.log(`[CloverShop]: Category ${categoryName} has been created.`)
            return res.json({status: `Category ${categoryName} has been created.`})
        })
        .catch(function(err) {
            return res.json({status: `There has been an issue creating the category.`})
        })

    }
    catch(e) {
        console.log(e)
        return res.json({status: "Access denied."})
    }
}

async function createNewSubcategory(req, res) {
    try {
        const { subcategoryName, categoryName } = req.body
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SECRET_KEY)
        const subcategoryExists = await Subcategory.findOne({subcategoryName: subcategoryName, categoryName: categoryName})

        if(!auth) {
            return res.json({status: "Access denied."})
        }

        if(subcategoryExists) {
            return res.json({status: `Subcategory with the name ${subcategoryName} already exists in ${categoryName}`})
        }

        const subcategory = new Subcategory({
            subcategoryName: subcategoryName,
            categoryName: categoryName
        })

        await subcategory.save()
        .then(function() {
            console.log(`[CloverShop]: Subcategory ${subcategoryName} has been created under ${categoryName}.`)
            return res.json({status: `Subcategory ${subcategoryName} has been created under ${categoryName}.`})
        })
        .catch(function(err) {
            return res.json({status: "There has been an issue creating the subcategory."})
        })
        
    }
    catch(e) {
        return res.json({status: "Access denied."})
    }
}

async function createNewProduct(req, res) {
    try {
        const {
            productPicture,
            productName,
            productDescription,
            productPrice,
            productQuantity,
            categoryName,
            subcategoryName
        } = req.body
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SECRET_KEY)
        const productExists = await Product.findOne({productName: productName, categoryName: Category})

        if(!auth) {
            return res.json({status: "Access denied."})
        }

        if(productExists) {
            return res.json({status: `'${productName}' already exists in ${categoryName}`})
        }

        const product = new Product({
            productPicture: productPicture,
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productQuantity: productQuantity,
            categoryName: categoryName,
            subcategoryName: subcategoryName
        })
        
        await product.save()
        .then(function() {
            console.log(`[CloverShop]: Product '${productName}' has been created.`)
            return res.json({status: `Product '${productName}' has been created.`})
        })
        .catch(function(err) {
            return res.json({status: "There has been an issue creating the product."})
        })
        
    }
    catch(e) {
        return res.json({status: "Access denied."})
    }
}

module.exports = {
    createNewCategory,
    createNewSubcategory,
    createNewProduct
}
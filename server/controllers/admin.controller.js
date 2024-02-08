const jwt = require("jsonwebtoken")
const config = require("../devconfig")
const Category = require("../models/category.model")
const Subcategory = require("../models/subcategory.model")
const Product = require("../models/product.model")

async function createNewCategory(req, res) {
    try {
        const { categoryName, categoryDescription } = req.body
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SECRET_KEY)
        const categoryExists = await Category.findOne({categoryName: categoryName})

        if(!auth) {
            return res.json({status: 401})
        }

        if(categoryExists) {
            return res.json({status: 409})
        }

        const category = new Category({
            categoryName: categoryName,
            categoryDescription: categoryDescription
        })

        await category.save()
        .then(function() {
            console.log(`[CloverShop]: Category ${categoryName} has been created.`)
            return res.json({status: 200})
        })
        .catch(function(err) {
            console.log(err)
            return res.json({status: 400})
        })

    }
    catch(e) {
        console.log(e)
        return res.json({status: 401})
    }
}

async function createNewSubcategory(req, res) {
    try {
        const { subcategoryName, categoryName } = req.body
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SECRET_KEY)
        const subcategoryExists = await Subcategory.findOne({subcategoryName: subcategoryName, categoryName: categoryName})

        if(!auth) {
            return res.json({status: 401})
        }

        if(subcategoryExists) {
            return res.json({status: 409})
        }

        const subcategory = new Subcategory({
            subcategoryName: subcategoryName,
            categoryName: categoryName
        })

        await subcategory.save()
        .then(function() {
            console.log(`[CloverShop]: Subcategory ${subcategoryName} has been created under ${categoryName}.`)
            return res.json({status: 200})
        })
        .catch(function(err) {
            return res.json({status: 400})
        })
        
    }
    catch(e) {
        return res.json({status: 401})
    }
}

async function createNewProduct(req, res) {
    try {
        const {
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
            return res.json({status: 401})
        }

        if(productExists) {
            return res.json({status: 409})
        }

        const product = new Product({
            productPicture: req.file.filename,
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
            return res.json({status: 200})
        })
        .catch(function(err) {
            return res.json({status: 400})
        })
        
    }
    catch(e) {
        return res.json({status: 401})
    }
}

module.exports = {
    createNewCategory,
    createNewSubcategory,
    createNewProduct
}
const jwt = require("jsonwebtoken")
const config = require("../devconfig")
const Category = require("../models/category.model")
const Subcategory = require("../models/subcategory.model")
const Product = require("../models/product.model")
const stripe = require("stripe")(config.STRIPE_SECRET_KEY)

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
            return res.json({
                status: 409,
                message: "A category already exists with the same name"
            })
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

async function updateCategory(req, res) {
    try {
        const { categoryId, categoryName, categoryDescription } = req.body
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SECRET_KEY)
        const findCategory = {_id: categoryId}
        const updateCategory = {categoryName: categoryName, categoryDescription: categoryDescription}
        const updateProductAndSubcategory = {categoryName: categoryName}

        const category = await Category.findOne(findCategory);
        const checkIfNewCategoryExists = await Category.findOne({categoryName: categoryName});
        const subcategories = await Subcategory.find({categoryName: category.categoryName})
        const products = await Product.find({categoryName: category.categoryName})

        if(!auth) {
            return res.json({status: 401})
        }

        if(checkIfNewCategoryExists) {
            return res.json({
                status: 409,
                message: "A category already exists with the same name"
            })
        }

        for(let i = 0; i < subcategories.length; i++) {
            await Subcategory.findOneAndUpdate({_id: subcategories[i]._id}, updateProductAndSubcategory);
        }

        for(let i = 0; i < products.length; i++) {
            await Product.findOneAndUpdate({_id: products[i]._id}, updateProductAndSubcategory)
        }

        await Category.findOneAndUpdate(findCategory, updateCategory)
        .then(function() {
            console.log(`[CloverShop]: Category updated.`)
            return res.json({status: 200})
        })
        .catch(function(err) {
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
            return res.json({
                status: 409,
                message: "A subcategory already exists with the same name"
            })
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

async function updateSubcategory(req, res) {
    try {
        const { subcategoryId, subcategoryName } = req.body
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SECRET_KEY)

        const findSubcategory = {_id: subcategoryId}
        const updateSubcategory = {subcategoryName: subcategoryName}
        const subcategory = await Subcategory.findOne(findSubcategory)
        const checkIfNewSubcategoryExists = await Subcategory.findOne({subcategoryName: subcategoryName, categoryName: subcategory.categoryName})
        const products = await Product.find({subcategoryName: subcategory.subcategoryName})

        if(!auth) {
            return res.json({status: 401})
        }

        if(checkIfNewSubcategoryExists) {
            return res.json({
                status: 409,
                message: "A subcategory already exists with the same name"
            })
        }

        for(let i = 0; i < products.length; i++) {
            await Product.findOneAndUpdate({_id: products[i]._id}, updateSubcategory)
        }

        await Subcategory.findOneAndUpdate(findSubcategory, updateSubcategory)
        .then(function() {
            console.log("[CloverShop]: Subcategory updated.")
            return res.json({status: 200})
        })
        .catch(function(err) {
            console.log(err)
            return res.json({status: 400})
        })
    }
    catch(e) {
        return res.json({status: 401})
    }
}

async function createStripeProductAndGetId(productName, productPrice) {
    const price = await stripe.prices.create({
        currency: 'cad',
        unit_amount: productPrice,
        product_data: {
            name: productName,
        },
    });
    return price
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
        const productExists = await Product.findOne({productName: productName, categoryName: categoryName})

        if(!auth) {
            return res.json({status: 401})
        }

        if(productExists) {
            return res.json({
                status: 409,
                message: "A product already exists with the same name"
            })
        }

        const stripeProduct = await createStripeProductAndGetId(productName, productPrice);

        const product = new Product({
            productStripeProductId: stripeProduct.product,
            productStripePriceId: stripeProduct.id,
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

async function updateProduct(req, res) {
    try {
        const {
            productId,
            productName,
            productDescription,
            productPrice,
            productQuantity
        } = req.body
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SECRET_KEY)
        const product = await Product.findOne({_id: productId})
        const productExists = await Product.findOne({productName: productName, categoryName: product.categoryName})
        const findProduct = {_id: productId}
        const updateProduct = {
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productQuantity: productQuantity
        }

        if(!auth) {
            return res.json({status: 401})
        }

        if(productExists) {
            return res.json({
                status: 409,
                message: "A product already exists with the same name"
            })
        }

        await Product.findOneAndUpdate(findProduct, updateProduct)
        .then(function() {
            console.log("[CloverShop]: Product updated.")
            return res.json({status: 200})
        })
        .catch(function(err) {
            console.log(err)
            return res.json({status: 400})
        })
    }
    catch(e) {
        return res.json({status: 401})
    }
}

module.exports = {
    createNewCategory,
    updateCategory,
    createNewSubcategory,
    updateSubcategory,
    createNewProduct,
    updateProduct
}

const session = require("express-session")
const Product = require("../models/product.model")

async function addProductToCart(req, res) {
    const { productId, quantity } = req.body
    const product = await Product.findOne({"_id": productId})

    if(product) {
        const cartItem = {
            productId: productId,
            quantity: quantity
        }

        if(!req.session.cart) {
            req.session.cart = []
            let updatedCart = []

            updatedCart = req.session.cart
            updatedCart.push(cartItem)
            req.session.cart = updatedCart

            return res.json({"status": "Item added to your cart"})
        }

        else {
            let updatedCart = []

            updatedCart = req.session.cart
            updatedCart.push(cartItem)
            res.session.cart = updatedCart

            return res.json({"status": "Item added to your cart"})
        }
    }

    else {
        return res.json({"status": "Product does not exist."})
    }
}

function resetCart(req, res) {
    req.session.cart = []
    return res.json({"status": "Card has been reset."})
}

module.exports = {
    addProductToCart,
    resetCart
}
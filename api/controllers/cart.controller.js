const session = require("express-session")
const Product = require("../models/product.model")

async function addProductToCart(req, res) {
    const { productId, quantity } = req.body
    const product = await Product.findOne({_id: productId})

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

            return res.status(200).json({msg: "OK"})
        }
        else {
            let updatedCart = []
            updatedCart = req.session.cart
            
            // if product is already in cart, update its quantity. 
            if (updatedCart.find(o => o.productId === productId)) {
                updatedCart.find((o, i) => {
                    if (o.productId === productId) {
                        let count = updatedCart[i].quantity
                        updatedCart[i].quantity = count + 1
                        return res.status(200).json({msg: "OK"})
                    }
                })
            }
            else {
                updatedCart.push(cartItem)
                req.session.cart = updatedCart
                return res.status(200).json({msg: "OK"})
            }
        }
    }

    else {
        return res.json({status: 404}).json({err: "Product not found"})
    }
}

async function displayCart(req, res) {
    if(req.session.cart)
        return res.status(200).json(req.session.cart)
    else
        return res.status(404).json({err: "Cart doesn't exist"})
}

function resetCart(req, res) {
    req.session.cart = []
    return res.status(200).json({msg: "OK"})
}

module.exports = {
    addProductToCart,
    displayCart,
    resetCart
}
const jwt = require("jsonwebtoken");
const config = require("../../config/index")
const stripe = require("stripe")(config.STRIPE_SECRET_KEY)
const Product = require("../models/product.model")
const Order = require("../models/order.model")

async function createOrder(req, res) {
    const { 
        customerEmail,
        customerFirstName,
        customerLastName,
        customerAddress,
        customerCity,
        customerProvince,
        customerPostalCode
    } = req.body
    const cart = req.session.cart
    let cartSubtotal = 0
    const orderCount = await Order.countDocuments({})

    if(cart) {
        for(let i = 0; i < cart.length; i++) {
            const product = await Product.findOne({_id: cart[i].productId})
            const quantity = cart[i].quantity
            cartSubtotal += (product.productPrice * quantity)
        }

        // maybe also create a stripe customer in the future?
        const order = new Order({
            orderNumber: orderCount+1,
            customerEmail: customerEmail,
            customerFirstName: customerFirstName,
            customerLastName: customerLastName,
            customerAddress: customerAddress,
            customerCity: customerCity,
            customerProvince: customerProvince,
            customerPostalCode: customerPostalCode,
            orderStatus: "unpaid",
            orderTotal: cartSubtotal,
            orderProducts: cart
        })
    
        await order.save()
        .then(function() {
            console.log(`[CloverShop]: New order created.`)
            return res.status(200).json(order)
        })
        .catch(function(err) {
            console.log(err)
            return res.status(400).json({err: "There was an issue with creating your order"})
        })
    }

    else if(!cart) {
        return res.status(404).json({err: "Cart doesn't exist"})
    }
}

async function createStripePaymentLinkFromOrder(req, res) {
    const { orderId } = req.body
    const order = await Order.findOne({_id: orderId})
    let products = []

    for (let i = 0; i < order.orderProducts.length; i++) {
        const product = await Product.findOne({ _id: order.orderProducts[i].productId })
        const quantity = order.orderProducts[i].quantity
        products.push({
                price: product.productStripePriceId,
                quantity: quantity
            }
        )
    }

    try {
        const paymentLink = await stripe.paymentLinks.create({
            line_items: products,
            after_completion: {
                type: 'redirect',
                redirect: {
                    url: `${config.CLIENT_PROTOCOL}://${config.CLIENT_DOMAIN}:${config.CLIENT_PORT}/order/${orderId}`
                }
            }
        })
        return res.status(200).json(paymentLink)
    }
    catch (e) {
        console.log(e)
        return res.status(400).json({err: "There was an issue with creating a Stripe payment link."})
    }
}

async function processOrderAfterStripePayment(req, res) {
    const { orderId } = req.body
    const order = await Order.findOneAndUpdate({ _id: orderId }, { orderStatus: "complete" }) // insecure?
    req.session.cart = []

    if(order)
        return res.status(200).json(order)
    else
        return res.status(404).json({err: "Order does not exist"})
}

async function displayAllOrders(req, res) {
    try {
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SERVER_SESSION_SECRET_KEY)
        const orders = await Order.find({}).sort({updatedAt: -1})
        
        if(!auth)
            return res.status(401).json({err: "Unauthorized"})

        return res.status(200).json(orders);
    }
    catch(e) {
        console.log(e);
        return res.status(401).json({err: "Unauthorized"})
    }
}

async function listOrderInformationById(req, res) {
    try {
        const { orderId } = req.body
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SERVER_SESSION_SECRET_KEY)
        const order = await Order.findOne({_id: orderId})

        if(!auth)
            return res.status(401).json({err: "Unauthorized"})

        if(!order)
            return res.status(404).json({err: "Not found"})

        return res.json(order)
    }
    catch (e) {
        console.log(e)
        return res.status(401).json({err: "Unauthorized"})
    }
}

async function displayOrderStatistics(req, res) {
    try {
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SERVER_SESSION_SECRET_KEY)
        const orders = await Order.find({})

        if(!auth)
            return res.status(401).json({err: "Unauthorized"})

        let totalOrdersSum = 0;
        let totalOrdersCompleted = 0;

        for(let i = 0; i < orders.length; i++) {            
            if(orders[i].orderStatus == "complete")
            {
                totalOrdersCompleted+=1
                totalOrdersSum+=orders[i].orderTotal
            }
        }

        const orderStatistics = {
            totalOrders: orders.length,
            totalOrdersSum: totalOrdersSum,
            totalOrdersCompleted: totalOrdersCompleted
        }

        return res.status(200).json(orderStatistics)
    }
    catch(e) {
        console.log(e)
        return res.status(401).json({err: "Unauthorized"})
    }
}

module.exports = {
    createOrder,
    createStripePaymentLinkFromOrder,
    processOrderAfterStripePayment,
    displayAllOrders,
    listOrderInformationById,
    displayOrderStatistics
}
const addr = require("../../addresses")
const jwt = require("jsonwebtoken");
const config = require("../devconfig")
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
            return res.json(order)
        })
        .catch(function(err) {
            console.log(err)
            return res.json({status: 400})
        })
    }

    else if(!cart) {
        return res.json({status: 404})
    }
}

async function createStripePaymentLinkFromOrder(req, res) {
    const { orderId } = req.body
    const order = await Order.findOne({_id: orderId})
    let products = []

    for (let i = 0; i < order.orderProducts.length; i++) {
        const product = await Product.findOne({ _id: order.orderProducts[i].productId })
        const quantity = order.orderProducts[i].quantity
        products.push(
            {
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
                    url: `${addr.CLIENT_ADDRESS}/order/${orderId}`
                }
            }
        })
        return res.json(paymentLink)
    }
    catch (e) {
        console.log(e)
        return res.json({status: 400, message: "There was an issue with creating a payment link."})
    }
}

async function displayCheckout(req, res) {
    const order = await Order.findOne({_id: req.params.id})
    let products = []

    for(let i = 0; i < order.orderProducts.length; i++) {
        const product = await Product.findOne({_id: order.orderProducts[i].productId})
        products.push(product)
    }

    res.render("checkout.ejs", {
        orderId: order._id,
        orderTotal: order.orderTotal,
        orderNumber: order.orderNumber,
        orderStatus: order.orderStatus,
        orderProducts: order.orderProducts,
        orderProductsInformation: products
    })
}

async function processCheckout(req, res) {
    const { stripeEmail, stripeToken } = req.body
    const order = await Order.findOne({_id: req.params.id})
    const findOrder = {_id: req.params.id}
    const markComplete = {orderStatus: "complete"}
    
    // add customer?

    try {
        await stripe.paymentIntents.create({
            amount: order.orderTotal,
            currency: "cad",
            payment_method_types: ["card"],
            receipt_email: "test@gmail.com"

        }, async function(err, paymentIntent) {
            if(err) {
                console.log(err)
                return res.send("There has been an issue.")
            }

            await stripe.paymentIntents.confirm(paymentIntent.id, {
                payment_method: "pm_card_visa"
            }, async function(err, paymentIntent) {
                if(err) {
                    console.log(err);
                    return res.send("There has been an issue.")
                }

                await Order.findOneAndUpdate(findOrder, markComplete)
                req.session.cart = []
                return res.redirect(`/order/checkout/${req.params.id}`)
            })
        })
    }

    catch(err) {
        console.log(err)
        return res.send("error")
    }
}

async function displayAllOrders(req, res) {
    try {
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SECRET_KEY)
        const orders = await Order.find({}).sort({updatedAt: -1})
        
        if(!auth) {
            return res.json({status: 401})
        }

        return res.json(orders);
    }
    catch(e) {
        console.log(e);
        return res.json({status: 401})
    }
}

async function listOrderInformationById(req, res) {
    const { orderId } = req.body
    // const cookie = req.cookies["jwt"]
    // const auth = jwt.verify(cookie, config.SECRET_KEY)
    const order = await Order.findOne({_id: orderId})

    if(!order)
        return res.json({status: 404})

    return res.json(order)
}

async function displayOrderStatistics(req, res) {
    try {
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SECRET_KEY)
        const orders = await Order.find({})

        if(!auth) {
            return res.json({status: 401})
        }

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

        return res.json(orderStatistics)
    }
    catch(e) {
        console.log(e)
        return res.json({status: 401})
    }
}

module.exports = {
    createOrder,
    createStripePaymentLinkFromOrder,
    displayCheckout,
    processCheckout,
    displayAllOrders,
    listOrderInformationById,
    displayOrderStatistics
}
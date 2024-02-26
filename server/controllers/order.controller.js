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

    // This could definitely be done in the client side
    // or maybe not, this is more secure
    if(cart) {
        for(let i = 0; i < cart.length; i++) {
            const product = await Product.findOne({_id: cart[i].productId})
            const quantity = cart[i].quantity
            cartSubtotal += (product.productPrice * quantity)
        }

        const order = new Order({
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

async function displayCheckout(req, res) {
    const order = await Order.findOne({_id: req.params.id})

    res.render("checkout.ejs", {
        orderId: order._id,
        amount: order.orderTotal,
        name: order._id
    })
}

async function processCheckout(req, res) {
    const { stripeEmail, stripeToken } = req.body
    const order = await Order.findOne({_id: req.params.id})
    const findOrder = {_id: req.params.id}
    const markComplete = {orderStatus: "complete"}
    
    // add customer 

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
                return res.send("Payment completed!")
            })
        })
    }

    catch(err) {
        console.log(err)
        return res.send("error")
    }

}

module.exports = {
    createOrder,
    displayCheckout,
    processCheckout
}
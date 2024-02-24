const config = require("../devconfig")
const stripe = require("stripe")(config.STRIPE_SECRET_KEY)
const Order = require("../models/order.model")

async function createOrder(req, res) {
    const { customerEmail } = req.body

    const order = new Order({
        orderStatus: "unpaid",
        orderTotal: 1000,
        orderProducts: req.session.cart,
        customerEmail: customerEmail
    })

    await order.save()
    .then(function() {
        console.log(`[CloverShop]: New order created.`)
        return res.json({status: 200})
    })
    .catch(function() {
        return res.json({status: 400})
    })
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
    const findOrder = {_id: req.params.id}
    const markComplete = {orderStatus: "complete"}
    
    try {
        await stripe.paymentIntents.create({
            amount: 1000,
            currency: "usd",
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
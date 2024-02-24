const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    orderStatus: String,
    orderTotal: Number,
    orderProducts: [Object],
    customerEmail: String,
})

const orderModel = mongoose.model("Order", orderSchema)
module.exports = orderModel
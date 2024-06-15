const mongoose = require("mongoose")

// in the future, maybe make the customer and the order separately?
// it'll be much better database management practice
const orderSchema = new mongoose.Schema({
    orderNumber: Number,
    customerEmail: String,
    customerFirstName: String,
    customerLastName: String,
    customerAddress: String,
    customerCity: String,
    customerProvince: String,
    customerPostalCode: String,
    orderStatus: String,
    orderTotal: Number,
    orderProducts: [Object]
}, { timestamps: true })

const orderModel = mongoose.model("Order", orderSchema)
module.exports = orderModel
const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

const adminModel = mongoose.model("Admin", adminSchema)
module.exports = adminModel
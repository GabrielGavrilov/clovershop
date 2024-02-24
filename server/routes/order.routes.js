const express = require("express")
const router = express.Router()
const controller = require("../controllers/order.controller")

router.get("/checkout/:id", controller.displayCheckout)
router.post("/checkout/:id", controller.processCheckout)
router.post("/create", controller.createOrder)

module.exports = router
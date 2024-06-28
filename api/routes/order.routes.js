const express = require("express")
const router = express.Router()
const controller = require("../controllers/order.controller")

/**
 * Order GET routes
 */
router.get("/", controller.displayAllOrders)
router.get("/statistics", controller.displayOrderStatistics)

/**
 * Order POST routes
 */
router.post("/id", controller.listOrderInformationById) // TODO: change this
router.post("/process", controller.processOrderAfterStripePayment)
router.post("/create", controller.createOrder)
router.post("/stripe", controller.createStripePaymentLinkFromOrder)

module.exports = router
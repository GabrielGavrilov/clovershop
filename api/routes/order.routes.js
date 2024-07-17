const express = require("express")
const router = express.Router()
const controller = require("../controllers/order.controller")

/**
 * Order GET routes
 */
router.get("/", controller.displayAllOrders)
router.get("/statistics", controller.displayOrderStatistics)
router.post("/:orderId", controller.listOrderInformationById)

/**
 * Order POST routes
 */
router.post("/", controller.createOrder)
router.post("/stripe", controller.createStripePaymentLinkFromOrder)

/**
 * Order PUT routes
 */
router.put("/", controller.processOrderAfterStripePayment)


module.exports = router
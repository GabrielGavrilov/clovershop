const express = require("express")
const router = express.Router()
const controller = require("../controllers/order.controller")

/**
 * Order GET routes
 */

router.get("/", controller.displayAllOrders)
router.get("/id", controller.listOrderInformationById)
router.get("/statistics", controller.displayOrderStatistics)
router.get("/checkout/:id", controller.displayCheckout)

/**
 * Order POST routes
 */

router.post("/checkout/:id", controller.processCheckout)
router.post("/create", controller.createOrder)

module.exports = router
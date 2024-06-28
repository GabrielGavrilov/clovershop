const express = require("express")
const router = express.Router()
const controller = require("../controllers/cart.controller")

/**
 * Cart GET routes
 */
router.get("/", controller.displayCart)

/**
 * Cart POST routes
 */
router.put("/", controller.addProductToCart)

/**
 * Cart DELETE routes
 */
router.delete("/", controller.resetCart)

module.exports = router;
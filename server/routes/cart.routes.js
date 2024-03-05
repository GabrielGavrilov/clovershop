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

router.post("/add", controller.addProductToCart)
router.post("/reset", controller.resetCart)

module.exports = router;
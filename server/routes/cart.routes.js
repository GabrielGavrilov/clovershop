const express = require("express")
const router = express.Router()
const controller = require("../controllers/cart.controller")

router.get("/", controller.displayCart)
// router.post("/product", controller.displayProductInformation)
router.post("/add", controller.addProductToCart)
router.post("/reset", controller.resetCart)

module.exports = router;
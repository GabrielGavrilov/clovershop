const express = require("express")
const router = express.Router()
const controller = require("../controllers/session.controller")

router.post("/add", controller.addProductToCart)
router.post("/reset", controller.resetCart)

module.exports = router;
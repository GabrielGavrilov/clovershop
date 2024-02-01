const express = require("express")
const router = express.Router()
const controller = require("../controllers/admin.controller")

router.post("/category/new", controller.createNewCategory)
router.post("/subcategory/new", controller.createNewSubcategory)
router.post("/product/new", controller.createNewProduct)

module.exports = router
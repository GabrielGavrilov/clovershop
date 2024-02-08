const express = require("express")
const router = express.Router()
const controller = require("../controllers/category.controller")

router.get("/", controller.listAllCategories);

router.post("/subcategories", controller.listAllSubcategoriesInCategory)
router.post("/products", controller.listAllProductsInCategory)
router.post("/subcategory/products", controller.listAllProductsInSubcategory)

module.exports = router
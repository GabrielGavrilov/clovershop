const express = require("express")
const router = express.Router()
const controller = require("../controllers/category.controller")

router.get("/", controller.listAllCategories);
router.get("/subcategories", controller.listAllSubcategoriesInCategory)
router.get("/products", controller.listAllProductsInCategory)
router.get("/subcategory/products", controller.listAllProductsInSubcategory)

module.exports = router
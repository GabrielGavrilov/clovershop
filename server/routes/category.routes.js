const express = require("express")
const router = express.Router()
const controller = require("../controllers/category.controller")

router.get("/", controller.listAllCategories);

router.post("/", controller.listCategoryInformation)
router.post("/subcategories", controller.listAllSubcategoriesInCategory)
router.post("/products", controller.listAllProductsInCategory)
router.post("/subcategory/products", controller.listAllProductsInSubcategory)
router.post("/product", controller.listProductInformation)

module.exports = router
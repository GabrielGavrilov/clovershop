const express = require("express")
const router = express.Router()
const controller = require("../controllers/api.controller")

router.get("/categories", controller.listAllCategories);
router.get("/subcategories", controller.listAllSubcategories)
router.get("/products", controller.listAllProducts);
router.get("/product/:productId", controller.listProductById)

router.post("/product", controller.listProductInformation)
router.post("/category", controller.listCategoryInformation)
router.post("/category/subcategories", controller.listAllSubcategoriesInCategory)
router.post("/category/products", controller.listAllProductsInCategory)
router.post("/category/subcategory/products", controller.listAllProductsInSubcategory)

module.exports = router
const express = require("express")
const router = express.Router()
const controller = require("../controllers/api.controller")

/**
 * API GET routes
 */

router.get("/categories", controller.listAllCategories);
router.get("/category/:categoryId", controller.listCategoryInformationById)
router.get("/subcategories", controller.listAllSubcategories)
router.get("/subcategory/:subcategoryId", controller.listSubcategoryInformationById)
router.get("/products", controller.listAllProducts);
router.get("/product/:productId", controller.listProductInformationById)

/**
 * API POST routes
 */

router.post("/product", controller.listProductInformationByName)
router.post("/category", controller.listCategoryInformation)
router.post("/category/subcategories", controller.listAllSubcategoriesInCategory)
router.post("/category/products", controller.listAllProductsInCategory)
router.post("/category/subcategory/products", controller.listAllProductsInSubcategory)

module.exports = router
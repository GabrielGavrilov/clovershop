const express = require("express")
const router = express.Router()
const controller = require("../controllers/admin.controller")
const multer = require("multer")
const path = require("path")

const uploadStorage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "../client/src/assets/images/uploads/")
    },
    filename: (req, file, cb)=> {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: uploadStorage})

/**
 * Admin POST routes
 */
router.post("/category/", controller.createNewCategory)
router.post("/subcategory/", controller.createNewSubcategory)
router.post("/product/", upload.single("file"), controller.createNewProduct)

/**
 * Admin PUT routes
 */
router.put("/category/", controller.updateCategory)
router.put("/subcategory/", controller.updateSubcategory)
router.put("/product/", controller.updateProduct)

module.exports = router
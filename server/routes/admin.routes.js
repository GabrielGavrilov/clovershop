const express = require("express")
const router = express.Router()
const controller = require("../controllers/admin.controller")
const multer = require("multer")
const path = require("path")

const uploadStorage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "../client/src/assets/")
    },
    filename: (req, file, cb)=> {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: uploadStorage})

router.post("/category/new", controller.createNewCategory)
router.post("/subcategory/new", controller.createNewSubcategory)
router.post("/product/new", upload.single("file"), controller.createNewProduct)

module.exports = router
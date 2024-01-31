const express = require("express")
const router = express.Router()
const controller = require("../controllers/session.controller")

router.get("/get", controller.getSession)
router.post("/save", controller.saveSession)

module.exports = router;
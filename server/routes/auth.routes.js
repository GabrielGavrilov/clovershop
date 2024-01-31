const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth.controller")

router.get("/account", controller.getAdministratorInformation)

router.post("/signup", controller.registerAdministrator)
router.post("/login", controller.authorizeAdministrator)

module.exports = router
const express = require("express")
const router = express.Router()
const controller = require("../controllers/auth.controller")

/**
 * Auth GET routes
 */

router.get("/account", controller.getAdministratorInformation)
router.get("/logout", controller.deauthorizeAdministrator)

/**
 * Auth POST routes
 */

router.post("/signup", controller.registerAdministrator)
router.post("/login", controller.authorizeAdministrator)

module.exports = router
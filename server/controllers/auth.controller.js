const Admin = require("../models/admin.model")
const config = require("../config")
const jwt = require("jsonwebtoken")

async function registerAdministrator(req, res) {
    const { firstName, lastName, email, password } = req.body
    const admin = new Admin({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })

    await admin.save()
    .then(function() {
        console.log(`[CloverShop]: Administrator with the email ${email} has been created.`)
        return res.json({status: `Administrator with the email ${email} has been created.`})
    })
    .catch(function() {
        return res.json({status: "There has been an issue creating the administrator."})
    })
}

async function authorizeAdministrator(req, res) {
    const { email, password } = req.body
    const admin = await Admin.findOne({email: email, password: password})

    if(!admin) {
        return res.json({status: "Incorrect email or password."})
    }

    else {
        const token = jwt.sign({_id: admin._id}, config.SECRET_KEY)
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.json({status: `Successfully logged in as ${admin.email} with token ${token}`})
    }
}

async function getAdministratorInformation(req, res) {
    try {
        const cookie = req.cookies["jwt"]
        const auth = jwt.verify(cookie, config.SECRET_KEY)

        if(!auth) {
            return res.json({status: "Access denied."})
        }

        const admin = await Admin.findOne({_id: auth._id})
        return res.json({
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email
        })
    } 
    catch(e) {
        console.log(e)
        return res.json({status: "Access denied."})
    }
}

module.exports = {
    registerAdministrator,
    authorizeAdministrator,
    getAdministratorInformation
}